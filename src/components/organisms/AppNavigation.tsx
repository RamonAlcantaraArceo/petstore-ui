import type { FC } from 'react';
import { Tabs } from '../atoms/Tabs';
import { Button } from '../atoms/Button';
import { useTranslation } from '../../i18n';
import { useAccessibility } from '../../accessibility';
import { theme } from '../../tokens/theme';

export type AppId = 'pets' | 'orders' | 'users';

export interface AppNavigationProps {
  /** Currently active app tab */
  activeApp: AppId;
  /** Called when user selects a tab */
  onNavigate: (app: AppId) => void;
  /** Whether the user is currently authenticated */
  isLoggedIn: boolean;
  /** Display name for the logged-in user */
  username?: string;
  /** Called when Sign In button is clicked */
  onLogin: () => void;
  /** Called when Sign Out button is clicked */
  onLogout: () => void;
}

const TAB_IDS: AppId[] = ['pets', 'orders', 'users'];

export const AppNavigation: FC<AppNavigationProps> = ({
  activeApp,
  onNavigate,
  isLoggedIn,
  username,
  onLogin,
  onLogout,
}) => {
  const { t } = useTranslation();
  const { ariaAttributes } = useAccessibility({
    'aria-label': t('petstore.app.navigation.ariaLabel'),
  });

  const tabs = TAB_IDS.map((id) => ({
    id,
    labelTranslationKey: `petstore.navigation.${id}`,
  }));

  return (
    <nav
      {...ariaAttributes}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
        borderBottom: `1px solid ${theme.colors.secondary[200]}`,
        backgroundColor: theme.colors.background.primary,
        flexWrap: 'wrap',
        gap: theme.spacing[3],
      }}
    >
      <Tabs tabs={tabs} activeTab={activeApp} onChange={(id) => onNavigate(id as AppId)} />

      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[3] }}>
        {isLoggedIn ? (
          <>
            <span
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                fontWeight: theme.typography.fontWeight.medium,
              }}
              aria-label={t('petstore.app.navigation.loggedInAs', { username: username || '' })}
            >
              {username}
            </span>
            <Button
              size="small"
              variant="secondary"
              onClick={onLogout}
              announceOnAction={t('petstore.app.navigation.announceSignOut')}
            >
              {t('petstore.app.navigation.signOut')}
            </Button>
          </>
        ) : (
          <Button
            size="small"
            variant="primary"
            onClick={onLogin}
            announceOnAction={t('petstore.app.navigation.announceSignIn')}
          >
            {t('petstore.app.navigation.signIn')}
          </Button>
        )}
      </div>
    </nav>
  );
};
