import React from 'react';
import type { FC } from 'react';
import { AuthProvider, useAuthContext } from '../../context/AuthContext';
import { LocaleProvider, useTranslation } from '../../i18n';
import { Modal } from '../atoms/Modal';
import { LoginForm } from '../molecules/LoginForm';
import { AppNavigation } from './AppNavigation';
import type { AppId } from './AppNavigation';
import { PetManagementView } from './PetManagementView';
import { StoreOrdersView } from './StoreOrdersView';
import { UserManagementView } from './UserManagementView';
import { theme } from '../../tokens/theme';

/** Map hash fragments to AppId values */
function hashToApp(hash: string): AppId {
  const cleaned = hash.replace('#/', '').replace('#', '');
  if (cleaned === 'orders') return 'orders';
  if (cleaned === 'users') return 'users';
  return 'pets';
}

function appToHash(app: AppId): string {
  return `#/${app}`;
}

export interface PetstoreAppProps {
  /** Force a specific locale (for stories) */
  locale?: 'en' | 'chef';
  /** When true, skip live API calls (story mode) */
  mockMode?: boolean;
}

/**
 * Inner shell — requires AuthProvider + LocaleProvider to be above it in the tree.
 */
const PetstoreShell: FC<{ mockMode: boolean }> = ({ mockMode }) => {
  const { t } = useTranslation();
  const { isLoggedIn, username, login, logout } = useAuthContext();

  // Current app from hash
  const [activeApp, setActiveApp] = React.useState<AppId>(() =>
    hashToApp(typeof window !== 'undefined' ? window.location.hash : ''),
  );

  // Login modal state
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | undefined>(undefined);

  // Listen for hash changes
  React.useEffect(() => {
    const onHashChange = () => {
      setActiveApp(hashToApp(window.location.hash));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Navigate
  const handleNavigate = React.useCallback((app: AppId) => {
    window.location.hash = appToHash(app);
    setActiveApp(app);
  }, []);

  // Login flow
  const handleLoginRequest = () => {
    setLoginError(undefined);
    setLoginOpen(true);
  };

  const handleLogin = async (user: string, pass: string) => {
    if (mockMode) {
      setLoginOpen(false);
      return;
    }
    setLoginLoading(true);
    const result = await login(user, pass);
    setLoginLoading(false);
    if (result.success) {
      setLoginOpen(false);
      setLoginError(undefined);
    } else {
      setLoginError(result.error ?? t('petstore.app.shell.loginFailed'));
    }
  };

  const handleLogout = async () => {
    if (mockMode) return;
    await logout();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: theme.typography.fontFamily.sans.join(', '),
        backgroundColor: theme.colors.background.secondary,
        color: theme.colors.text.primary,
      }}
    >
      <AppNavigation
        activeApp={activeApp}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        {...(username !== null ? { username } : {})}
        onLogin={handleLoginRequest}
        onLogout={handleLogout}
      />

      <main>
        {activeApp === 'pets' && (
          <PetManagementView isLoggedIn={isLoggedIn} mockMode={mockMode} />
        )}
        {activeApp === 'orders' && (
          <StoreOrdersView isLoggedIn={isLoggedIn} mockMode={mockMode} />
        )}
        {activeApp === 'users' && (
          <UserManagementView isLoggedIn={isLoggedIn} mockMode={mockMode} />
        )}
      </main>

      {/* Login Modal */}
      <Modal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        titleTranslationKey="petstore.app.shell.loginTitle"
        size="small"
      >
        <LoginForm
          onLogin={handleLogin}
          isLoading={loginLoading}
          {...(loginError !== undefined ? { error: loginError } : {})}
        />
      </Modal>
    </div>
  );
};

/**
 * PetstoreApp — Top-level application shell.
 *
 * Wraps the entire app in AuthProvider → LocaleProvider → PetstoreShell.
 * Handles hash-based routing (#/pets, #/orders, #/users) and
 * opens a login modal when the user clicks Sign In.
 *
 * @example
 * <PetstoreApp />
 */
export const PetstoreApp: FC<PetstoreAppProps> = ({
  locale,
  mockMode = false,
}) => {
  return (
    <AuthProvider>
      <LocaleProvider {...(locale !== undefined ? { locale } : {})}>
        <PetstoreShell mockMode={mockMode} />
      </LocaleProvider>
    </AuthProvider>
  );
};
