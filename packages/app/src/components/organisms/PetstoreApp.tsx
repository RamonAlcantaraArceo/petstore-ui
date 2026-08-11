import React from 'react';
import type { FC } from 'react';
import { AuthProvider, useAuthContext } from '../../context/AuthContext';
import { LocaleProvider, useTranslation } from '@petstore-ui/atoms';
import { Modal } from '@petstore-ui/atoms';
import { Button } from '@petstore-ui/atoms';
import { Tabs } from '@petstore-ui/atoms';
import { LoginForm } from '../molecules/LoginForm';
import { ConfirmDialog } from '../molecules/ConfirmDialog';
import { AppNavigation } from './AppNavigation';
import type { AppId } from './AppNavigation';
import { PetManagementView } from './PetManagementView';
import { StoreOrdersView } from './StoreOrdersView';
import { UserManagementView } from './UserManagementView';
import { deleteUser } from '../../services/userApi';
import {
  getApiErrorHistory,
  parseApiError,
  subscribeToApiErrors,
  type ApiErrorRecord,
} from '../../services/apiClient';
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

function shellEscape(value: string): string {
  return `'${value.replace(/'/g, `'"'"'`)}'`;
}

function buildCurlCommand(error: ApiErrorRecord): string {
  const headerArgs = Object.entries(error.request.headers)
    .map(([key, value]) => `-H ${shellEscape(`${key}: ${value}`)}`)
    .join(' ');
  const bodyArg = error.request.body ? ` --data-raw ${shellEscape(error.request.body)}` : '';
  return `curl -X ${error.method} ${shellEscape(error.url)} ${headerArgs}${bodyArg}`.trim();
}

function buildErrorMarkdown(error: ApiErrorRecord): string {
  return [
    `### Request Error Report`,
    ``,
    `- **Timestamp:** ${error.timestamp}`,
    `- **Correlation ID:** ${error.correlationId ?? 'Not provided'}`,
    `- **Method:** ${error.method}`,
    `- **Path:** ${error.path}`,
    `- **URL:** ${error.url}`,
    `- **Status:** ${error.status ?? 'NETWORK'}${error.statusText ? ` ${error.statusText}` : ''}`,
    ``,
    `#### Request`,
    '```json',
    JSON.stringify(
      {
        method: error.method,
        url: error.url,
        headers: error.request.headers,
        body: error.request.body,
      },
      null,
      2,
    ),
    '```',
    ``,
    `#### Response`,
    '```json',
    JSON.stringify(error.fullResponse, null, 2),
    '```',
  ].join('\n');
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
  const [errorInspectorOpen, setErrorInspectorOpen] = React.useState(false);
  const [apiErrors, setApiErrors] = React.useState<ApiErrorRecord[]>(() => getApiErrorHistory());
  const [selectedErrorIndex, setSelectedErrorIndex] = React.useState(0);
  const [errorInspectorTab, setErrorInspectorTab] = React.useState<'request' | 'response'>(
    'response',
  );
  const [copiedFeedback, setCopiedFeedback] = React.useState<string | null>(null);

  // Listen for hash changes
  React.useEffect(() => {
    const onHashChange = () => {
      setActiveApp(hashToApp(window.location.hash));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  React.useEffect(() => {
    return subscribeToApiErrors((errors) => {
      setApiErrors(errors);
      setSelectedErrorIndex((prev) => Math.min(prev, Math.max(errors.length - 1, 0)));
    });
  }, []);

  React.useEffect(() => {
    const isMac =
      typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isMac) {
        return;
      }
      if (!(event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'i')) {
        return;
      }
      if (apiErrors.length === 0) {
        return;
      }
      event.preventDefault();
      setErrorInspectorOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [apiErrors.length]);

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

  const selectedError = apiErrors[selectedErrorIndex] ?? null;
  const requestResponseTabs = [
    { id: 'request', labelTranslationKey: 'petstore.app.shell.errorInspectorRequestTab' },
    { id: 'response', labelTranslationKey: 'petstore.app.shell.errorInspectorResponseTab' },
  ];

  const copyToClipboard = React.useCallback(
    async (content: string, feedbackKey: string) => {
      await navigator.clipboard.writeText(content);
      setCopiedFeedback(t(feedbackKey));
      setTimeout(() => setCopiedFeedback(null), 1500);
    },
    [t],
  );

  const handleCopyCurl = React.useCallback(() => {
    if (!selectedError) return;
    void copyToClipboard(
      buildCurlCommand(selectedError),
      'petstore.app.shell.errorInspectorCopiedCurl',
    );
  }, [copyToClipboard, selectedError]);

  const handleCopyErrorMarkdown = React.useCallback(() => {
    if (!selectedError) return;
    void copyToClipboard(
      buildErrorMarkdown(selectedError),
      'petstore.app.shell.errorInspectorCopiedDetails',
    );
  }, [copyToClipboard, selectedError]);

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

      <Modal
        isOpen={errorInspectorOpen}
        onClose={() => setErrorInspectorOpen(false)}
        titleTranslationKey="petstore.app.shell.errorInspectorTitle"
        size="large"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(14rem, 18rem) 1fr',
            gap: theme.spacing[4],
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
            <p
              style={{
                margin: 0,
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
              }}
            >
              {t('petstore.app.shell.errorInspectorShortcutHint')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
              {apiErrors.map((err, index) => (
                <button
                  key={err.id}
                  type="button"
                  onClick={() => setSelectedErrorIndex(index)}
                  style={{
                    textAlign: 'left',
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${
                      selectedErrorIndex === index
                        ? theme.colors.primary[500]
                        : theme.colors.secondary[300]
                    }`,
                    backgroundColor:
                      selectedErrorIndex === index
                        ? theme.colors.primary[50]
                        : theme.colors.background.primary,
                    padding: theme.spacing[2],
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.semibold,
                    }}
                  >
                    {err.status ?? 'NETWORK'} · {err.method} {err.path}
                  </div>
                  <div
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      color: theme.colors.text.secondary,
                      marginTop: theme.spacing[1],
                    }}
                  >
                    {err.timestamp}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            {selectedError ? (
              <>
                <div style={{ marginBottom: theme.spacing[4] }}>
                  <p style={{ margin: 0, fontWeight: theme.typography.fontWeight.semibold }}>
                    {t('petstore.app.shell.errorInspectorCorrelationId')}
                  </p>
                  <p style={{ margin: 0, color: theme.colors.text.secondary }}>
                    {selectedError.correlationId ??
                      t('petstore.app.shell.errorInspectorNotProvided')}
                  </p>
                </div>
                <div style={{ marginBottom: theme.spacing[4] }}>
                  <p style={{ margin: 0, fontWeight: theme.typography.fontWeight.semibold }}>
                    {t('petstore.app.shell.errorInspectorTimestamp')}
                  </p>
                  <p style={{ margin: 0, color: theme.colors.text.secondary }}>
                    {selectedError.timestamp}
                  </p>
                </div>
                <div style={{ marginBottom: theme.spacing[4] }}>
                  <p style={{ margin: 0, fontWeight: theme.typography.fontWeight.semibold }}>
                    {t('petstore.app.shell.errorInspectorRawError')}
                  </p>
                  <p style={{ margin: 0, color: theme.colors.text.secondary }}>
                    {selectedError.rawError}
                  </p>
                </div>
                <Tabs
                  tabs={requestResponseTabs}
                  activeTab={errorInspectorTab}
                  onChange={(id) => setErrorInspectorTab(id as 'request' | 'response')}
                />
                <pre
                  style={{
                    margin: `${theme.spacing[3]} 0 0`,
                    padding: theme.spacing[3],
                    backgroundColor: theme.colors.background.secondary,
                    borderRadius: theme.borderRadius.md,
                    maxHeight: '18rem',
                    overflow: 'auto',
                    fontSize: theme.typography.fontSize.xs,
                  }}
                >
                  {errorInspectorTab === 'request'
                    ? JSON.stringify(
                        {
                          method: selectedError.method,
                          path: selectedError.path,
                          url: selectedError.url,
                          timestamp: selectedError.timestamp,
                          headers: selectedError.request.headers,
                          body: selectedError.request.body,
                        },
                        null,
                        2,
                      )
                    : JSON.stringify(selectedError.fullResponse, null, 2)}
                </pre>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing[2],
                    marginTop: theme.spacing[3],
                    flexWrap: 'wrap',
                  }}
                >
                  <Button type="button" variant="secondary" size="small" onClick={handleCopyCurl}>
                    {t('petstore.app.shell.errorInspectorCopyCurl')}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    onClick={handleCopyErrorMarkdown}
                  >
                    {t('petstore.app.shell.errorInspectorCopyDetails')}
                  </Button>
                  {copiedFeedback && (
                    <span
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      {copiedFeedback}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <p style={{ margin: 0, color: theme.colors.text.secondary }}>
                {t('petstore.app.shell.errorInspectorEmpty')}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: theme.spacing[5] }}>
          <Button type="button" variant="primary" onClick={() => setErrorInspectorOpen(false)}>
            {t('petstore.app.shell.errorInspectorClose')}
          </Button>
        </div>
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
export const PetstoreApp: FC<PetstoreAppProps> = ({ locale, mockMode = false }) => {
  return (
    <AuthProvider>
      <LocaleProvider {...(locale !== undefined ? { locale } : {})}>
        <PetstoreShell mockMode={mockMode} />
      </LocaleProvider>
    </AuthProvider>
  );
};
