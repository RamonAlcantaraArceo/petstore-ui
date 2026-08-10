import { useEffect, useState, useCallback, type FC } from 'react';
import { Tabs } from '@petstore-ui/atoms';
import { Button } from '@petstore-ui/atoms';
import { Modal } from '@petstore-ui/atoms';
import { useTranslation } from '@petstore-ui/atoms';
import { useAccessibility } from '@petstore-ui/atoms';
import { theme } from '@petstore-ui/atoms';

export type AppId = 'pets' | 'orders' | 'users';

interface RuntimeBuildConfig {
  VERSION?: string;
  GIT_SHA?: string;
  BUILD_DATE?: string;
}

interface BuildDetails {
  version: string;
  build_date: string;
  git_commit_sha: string;
}

interface ApiHealthResponse {
  status: string;
  mode: string;
  details: BuildDetails;
}

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
  /** Called when Delete Account button is clicked */
  onDeleteAccount?: () => void;
}

const TAB_IDS: AppId[] = ['pets', 'orders', 'users'];

function getRuntimeBuildInfo(): BuildDetails {
  if (typeof window === 'undefined') {
    return {
      version: 'local',
      build_date: 'N/A',
      git_commit_sha: 'N/A',
    };
  }

  const runtimeConfig = (
    window as Window & {
      __RUNTIME_CONFIG__?: RuntimeBuildConfig;
    }
  ).__RUNTIME_CONFIG__;

  return {
    version: runtimeConfig?.VERSION || 'local',
    build_date: runtimeConfig?.BUILD_DATE || 'N/A',
    git_commit_sha: runtimeConfig?.GIT_SHA || 'N/A',
  };
}

function getFallbackApiHealth(): ApiHealthResponse {
  return {
    status: 'unavailable',
    mode: 'unknown',
    details: {
      version: 'N/A',
      build_date: 'N/A',
      git_commit_sha: 'N/A',
    },
  };
}

export const AppNavigation: FC<AppNavigationProps> = ({
  activeApp,
  onNavigate,
  isLoggedIn,
  username,
  onLogin,
  onLogout,
  onDeleteAccount,
}) => {
  const { t } = useTranslation();
  const { ariaAttributes } = useAccessibility({
    'aria-label': t('petstore.app.navigation.ariaLabel'),
  });
  const buildInfo = getRuntimeBuildInfo();
  const [apiHealth, setApiHealth] = useState<ApiHealthResponse>(getFallbackApiHealth());
  const [buildInfoOpen, setBuildInfoOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchApiHealth = async () => {
      try {
        const response = await fetch('/api/v1/health');

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as ApiHealthResponse;

        if (isMounted) {
          setApiHealth(data);
        }
      } catch {
        // Keep fallback health data when endpoint is unreachable.
      }
    };

    void fetchApiHealth();

    return () => {
      isMounted = false;
    };
  }, []);

  const buildInfoPayload = JSON.stringify({ ui: buildInfo, api: apiHealth }, null, 2);

  const handleCopyBuildInfo = useCallback(() => {
    void navigator.clipboard.writeText(buildInfoPayload).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [buildInfoPayload]);

  const tabs = TAB_IDS.map((id) => ({
    id,
    labelTranslationKey: `petstore.navigation.${id}`,
  }));

  return (
    <>
      <nav
        data-component="AppNavigation"
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
          <button
            type="button"
            onClick={() => setBuildInfoOpen(true)}
            aria-label={t('petstore.app.navigation.buildInfoButton')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1.25rem',
              height: '1.25rem',
              borderRadius: theme.borderRadius.full,
              border: `1px solid ${theme.colors.secondary[400]}`,
              color: theme.colors.secondary[700],
              fontSize: theme.typography.fontSize.xs,
              fontWeight: theme.typography.fontWeight.bold,
              cursor: 'pointer',
              userSelect: 'none',
              backgroundColor: theme.colors.background.secondary,
              padding: 0,
              flexShrink: 0,
            }}
          >
            i
          </button>
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
              {onDeleteAccount && (
                <Button
                  size="small"
                  variant="danger"
                  onClick={onDeleteAccount}
                  announceOnAction={t('petstore.app.navigation.announceDeleteAccount')}
                >
                  {t('petstore.app.navigation.deleteAccount')}
                </Button>
              )}
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

      <Modal
        isOpen={buildInfoOpen}
        onClose={() => setBuildInfoOpen(false)}
        title={t('petstore.app.navigation.buildInfoTitle')}
        size="medium"
      >
        <div data-component="BuildInfoModal">
          {/* UI section */}
          <h3
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.secondary,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: theme.spacing[2],
            }}
          >
            {t('petstore.app.navigation.buildInfoUiSection')}
          </h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: theme.spacing[4],
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            <tbody>
              {(
                [
                  [t('petstore.app.navigation.buildInfoVersion'), buildInfo.version],
                  [t('petstore.app.navigation.buildInfoBuildDate'), buildInfo.build_date],
                  [t('petstore.app.navigation.buildInfoGitSha'), buildInfo.git_commit_sha],
                ] as [string, string][]
              ).map(([label, value]) => (
                <tr
                  key={label}
                  style={{ borderBottom: `1px solid ${theme.colors.secondary[100]}` }}
                >
                  <td
                    style={{
                      padding: `${theme.spacing[2]} ${theme.spacing[3]} ${theme.spacing[2]} 0`,
                      color: theme.colors.text.secondary,
                      fontWeight: theme.typography.fontWeight.medium,
                      whiteSpace: 'nowrap',
                      width: '40%',
                    }}
                  >
                    {label}
                  </td>
                  <td
                    style={{
                      padding: `${theme.spacing[2]} 0`,
                      color: theme.colors.text.primary,
                      fontFamily: theme.typography.fontFamily.mono.join(', '),
                      wordBreak: 'break-all',
                    }}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* API section */}
          <h3
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.secondary,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: theme.spacing[2],
            }}
          >
            {t('petstore.app.navigation.buildInfoApiSection')}
          </h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: theme.spacing[5],
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            <tbody>
              {(
                [
                  [t('petstore.app.navigation.buildInfoApiStatus'), apiHealth.status],
                  [t('petstore.app.navigation.buildInfoApiMode'), apiHealth.mode],
                  [t('petstore.app.navigation.buildInfoVersion'), apiHealth.details.version],
                  [t('petstore.app.navigation.buildInfoBuildDate'), apiHealth.details.build_date],
                  [t('petstore.app.navigation.buildInfoGitSha'), apiHealth.details.git_commit_sha],
                ] as [string, string][]
              ).map(([label, value]) => (
                <tr
                  key={label}
                  style={{ borderBottom: `1px solid ${theme.colors.secondary[100]}` }}
                >
                  <td
                    style={{
                      padding: `${theme.spacing[2]} ${theme.spacing[3]} ${theme.spacing[2]} 0`,
                      color: theme.colors.text.secondary,
                      fontWeight: theme.typography.fontWeight.medium,
                      whiteSpace: 'nowrap',
                      width: '40%',
                    }}
                  >
                    {label}
                  </td>
                  <td
                    style={{
                      padding: `${theme.spacing[2]} 0`,
                      color: theme.colors.text.primary,
                      fontFamily: theme.typography.fontFamily.mono.join(', '),
                      wordBreak: 'break-all',
                    }}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: theme.spacing[3] }}>
            <Button type="button" variant="secondary" size="small" onClick={handleCopyBuildInfo}>
              {copied
                ? t('petstore.app.navigation.buildInfoCopied')
                : t('petstore.app.navigation.buildInfoCopy')}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="small"
              onClick={() => setBuildInfoOpen(false)}
            >
              {t('petstore.app.navigation.buildInfoClose')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
