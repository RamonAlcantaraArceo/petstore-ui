import React from 'react';
import type { FC, FormEvent } from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { useTranslation } from '../../i18n';
import { useAccessibility } from '../../accessibility';

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

  const { ariaAttributes } = useAccessibility({
    announceOnAction: t('petstore.auth.form.announceSubmit'),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form
      className={`login-form ${className || ''}`.trim()}
      onSubmit={handleSubmit}
      aria-label={t('petstore.auth.form.ariaLabel')}
      {...ariaAttributes}
      autoComplete="on"
    >
      {error && (
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
          {error}
        </div>
      )}
      <Input
        name="username"
        labelTranslationKey="petstore.auth.form.username"
        placeholderTranslationKey="petstore.auth.form.usernamePlaceholder"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoFocus
        autoComplete="username"
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
          disabled={isLoading}
          loading={isLoading}
          announceOnAction={t('petstore.auth.form.announceSubmit')}
        >
          {t('petstore.auth.form.submit')}
        </Button>
      </div>
    </form>
  );
};
