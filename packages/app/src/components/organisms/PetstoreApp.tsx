import React from 'react';
import type { FC } from 'react';
import { AuthProvider, useAuthContext } from '../../context/AuthContext';
import { LocaleProvider, useTranslation } from '@petstore-ui/atoms';
import { Modal } from '@petstore-ui/atoms';
import { LoginForm } from '../molecules/LoginForm';
import { ConfirmDialog } from '../molecules/ConfirmDialog';
import { AppNavigation } from './AppNavigation';
import type { AppId } from './AppNavigation';
import { PetManagementView } from './PetManagementView';
import { StoreOrdersView } from './StoreOrdersView';
import { UserManagementView } from './UserManagementView';
import { deleteUser } from '../../services/userApi';
import { parseApiError } from '../../services/apiClient';
import { theme } from '@petstore-ui/atoms';

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

/**
 * Map a raw API error string to a human-readable, translated message.
 * Handles the `"<status>: <body>"` format produced by apiClient.
 */
function translateApiError(raw: string | null | undefined, t: (key: string) => string): string {
  if (!raw) return t('petstore.auth.errors.generic');

  const { status, message } = parseApiError(raw);

  // Network / no status
  if (status === null) return t('petstore.auth.errors.networkError');

  // Map well-known HTTP statuses to friendly keys
  if (status === 401 || status === 403) {
    // If the message hints at credentials vs authorisation
    const lower = message.toLowerCase();
    if (lower.includes('credential') || lower.includes('password') || lower.includes('login')) {
      return t('petstore.auth.errors.invalidCredentials');
    }
    return t('petstore.auth.errors.unauthorized');
  }
  if (status === 404) return t('petstore.auth.errors.notFound');
  if (status >= 500) return t('petstore.auth.errors.serverError');

  // Fall back to the extracted message (already stripped of JSON wrapper)
  return message || t('petstore.auth.errors.generic');
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

  // Delete account confirmation state
  const [deleteAccountOpen, setDeleteAccountOpen] = React.useState(false);

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
      setLoginError(translateApiError(result.error, t));
    }
  };

  const handleLogout = async () => {
    if (mockMode) return;
    await logout();
  };

  const handleDeleteAccountRequest = () => {
    setDeleteAccountOpen(true);
  };

  const handleDeleteAccountConfirm = async () => {
    setDeleteAccountOpen(false);
    if (mockMode || !username) return;
    await deleteUser(username);
    await logout();
  };

  return (
    <div
      data-component="PetstoreApp"
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
        {...(isLoggedIn ? { onDeleteAccount: handleDeleteAccountRequest } : {})}
      />

      <main>
        {activeApp === 'pets' && <PetManagementView isLoggedIn={isLoggedIn} mockMode={mockMode} />}
        {activeApp === 'orders' && <StoreOrdersView isLoggedIn={isLoggedIn} mockMode={mockMode} />}
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

      {/* Delete Account Confirmation */}
      <ConfirmDialog
        isOpen={deleteAccountOpen}
        titleTranslationKey="petstore.app.navigation.deleteAccountTitle"
        message={username ? t('petstore.app.navigation.deleteAccountMessage', { username }) : ''}
        variant="danger"
        onConfirm={handleDeleteAccountConfirm}
        onCancel={() => setDeleteAccountOpen(false)}
      />
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
export const PetstoreApp: FC<PetstoreAppProps> = ({ locale, mockMode = false }) => {
  return (
    <AuthProvider>
      <LocaleProvider {...(locale !== undefined ? { locale } : {})}>
        <PetstoreShell mockMode={mockMode} />
      </LocaleProvider>
    </AuthProvider>
  );
};
