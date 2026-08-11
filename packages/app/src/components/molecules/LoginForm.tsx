import React from 'react';
import type { FC, FormEvent } from 'react';
import { Input } from '@petstore-ui/atoms';
import { Button } from '@petstore-ui/atoms';
import { useTranslation } from '@petstore-ui/atoms';
import { useAccessibility } from '@petstore-ui/atoms';
import { isPostLoginEndpointEnabled } from '../../services/apiClient';

export interface LoginFormProps {
  /** Called with (username, password) on submit */
  onLogin: (username: string, password: string) => void;
  /** True while the login request is in-flight */
  isLoading?: boolean;
  /** Error message to display (translated by caller) */
  error?: string;
  /** Additional CSS class */
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = ({ onLogin, isLoading = false, error, className }) => {
  const { t } = useTranslation();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [validationError, setValidationError] = React.useState<string | null>(null);
  const requiresEmail = isPostLoginEndpointEnabled();

  const { ariaAttributes } = useAccessibility({
    announceOnAction: t('petstore.auth.form.announceSubmit'),
  });

  const isSubmitDisabled = isLoading || !username.trim() || !password.trim();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (requiresEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username.trim())) {
      setValidationError(t('petstore.auth.errors.invalidEmail'));
      return;
    }

    onLogin(username, password);
  };
  const displayError = validationError ?? error;

  return (
    <form
      data-component="LoginForm"
      className={`login-form ${className || ''}`.trim()}
      onSubmit={handleSubmit}
      aria-label={t('petstore.auth.form.ariaLabel')}
      {...ariaAttributes}
      autoComplete="on"
    >
      {displayError && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            color: '#dc2626',
            fontSize: '0.875rem',
            marginBottom: '0.75rem',
            padding: '0.5rem 0.75rem',
            background: '#fef2f2',
            borderRadius: '0.375rem',
            border: '1px solid #fca5a5',
          }}
        >
          {displayError}
        </div>
      )}
      <Input
        name={requiresEmail ? 'email' : 'username'}
        type="text"
        labelTranslationKey={
          requiresEmail ? 'petstore.auth.form.email' : 'petstore.auth.form.username'
        }
        placeholderTranslationKey={
          requiresEmail
            ? 'petstore.auth.form.emailPlaceholder'
            : 'petstore.auth.form.usernamePlaceholder'
        }
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setValidationError(null);
        }}
        required
        autoFocus
        autoComplete={requiresEmail ? 'email' : 'username'}
      />
      <Input
        name="password"
        type="password"
        labelTranslationKey="petstore.auth.form.password"
        placeholderTranslationKey="petstore.auth.form.passwordPlaceholder"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      <div style={{ marginTop: '1.5rem' }}>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isSubmitDisabled}
          loading={isLoading}
          announceOnAction={t('petstore.auth.form.announceSubmit')}
        >
          {t('petstore.auth.form.submit')}
        </Button>
      </div>
    </form>
  );
};
