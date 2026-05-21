import React from 'react';
import type { FC, FormEvent } from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { useTranslation } from '../../i18n';
import { useAccessibility } from '../../accessibility';

/**
 * Props for UserForm molecule
 * @property user - Optional user object for edit mode
 * @property onSubmit - Called with user data when form is submitted
 * @property onCancel - Called when cancel button is pressed
 * @property isLoading - Whether the form is submitting
 * @property className - Optional CSS class
 * @property announceOnSubmit - Screen reader announcement on submit
 */
export interface UserFormProps {
  user?: Partial<UserFormFields>;
  onSubmit: (user: UserFormFields) => void | Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  className?: string;
  announceOnSubmit?: string;
}

export interface UserFormFields {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export const UserForm: FC<UserFormProps> = ({
  user,
  onSubmit,
  onCancel,
  isLoading = false,
  className,
  announceOnSubmit,
}) => {
  const { t } = useTranslation();
  const isCreateMode = !user?.username;
  const [fields, setFields] = React.useState<UserFormFields>({
    username: user?.username || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    password: '',
    phone: user?.phone || '',
  });
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = React.useState<string | null>(null);

  const { ariaAttributes, handleKeyDown, announceAction } = useAccessibility({
    announceOnAction:
      announceOnSubmit ||
      t(
        isCreateMode
          ? 'components.userCreateForm.announceOnCreate'
          : 'petstore.users.form.announceSubmit',
      ),
  });

  const getFieldLabelKey = (field: keyof UserFormFields): string => {
    if (isCreateMode) {
      return `components.userCreateForm.fields.${field}`;
    }

    return `petstore.users.form.${field}`;
  };

  const validateFields = (): string | null => {
    if (!fields.username.trim()) {
      return t('components.userCreateForm.errors.usernameRequired');
    }

    if (isCreateMode && !fields.password.trim()) {
      return t('components.userCreateForm.errors.passwordRequired');
    }

    if (fields.email.trim()) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim());
      if (!isValidEmail) {
        return t('components.userCreateForm.errors.emailInvalid');
      }
    }

    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    const validationError = validateFields();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    announceAction();
    try {
      await onSubmit(fields);
      setSubmitSuccess(
        t(isCreateMode ? 'components.userCreateForm.success' : 'components.form.submitSuccess'),
      );
    } catch {
      setSubmitError(
        t(
          isCreateMode ? 'components.userCreateForm.errors.generic' : 'components.form.submitError',
        ),
      );
    }
  };

  return (
    <form
      className={`user-form ${className || ''}`}
      onSubmit={handleSubmit}
      {...ariaAttributes}
      onKeyDown={handleKeyDown}
      aria-label={t(
        isCreateMode ? 'components.userCreateForm.formLabel' : 'petstore.users.form.ariaLabel',
      )}
      autoComplete="off"
      noValidate
    >
      {submitError && (
        <div role="alert" className="user-form__message user-form__message--error">
          {submitError}
        </div>
      )}
      {submitSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="user-form__message user-form__message--success"
        >
          {submitSuccess}
        </div>
      )}
      <Input
        name="username"
        labelTranslationKey={getFieldLabelKey('username')}
        value={fields.username}
        onChange={handleChange}
        required
        disabled={!!user?.username}
        autoFocus
      />
      <Input
        name="firstName"
        labelTranslationKey={getFieldLabelKey('firstName')}
        value={fields.firstName}
        onChange={handleChange}
      />
      <Input
        name="lastName"
        labelTranslationKey={getFieldLabelKey('lastName')}
        value={fields.lastName}
        onChange={handleChange}
      />
      <Input
        name="email"
        labelTranslationKey={getFieldLabelKey('email')}
        value={fields.email}
        onChange={handleChange}
        type="email"
      />
      <Input
        name="password"
        labelTranslationKey={getFieldLabelKey('password')}
        value={fields.password}
        onChange={handleChange}
        type="password"
        required={isCreateMode}
        autoComplete="new-password"
      />
      <Input
        name="phone"
        labelTranslationKey={getFieldLabelKey('phone')}
        value={fields.phone}
        onChange={handleChange}
      />
      <div className="user-form__actions">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          loading={isLoading}
          announceOnAction={t(
            isCreateMode
              ? 'components.userCreateForm.announceOnCreate'
              : 'petstore.users.form.announceSubmit',
          )}
        >
          {t(isCreateMode ? 'components.userCreateForm.submit' : 'petstore.users.form.save')}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t('petstore.users.form.cancel')}
        </Button>
      </div>
    </form>
  );
};
