
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
	onSubmit: (user: UserFormFields) => void;
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
	const [fields, setFields] = React.useState<UserFormFields>({
		username: user?.username || '',
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		email: user?.email || '',
		password: '',
		phone: user?.phone || '',
	});

	const {
		ariaAttributes,
		handleKeyDown,
		announceAction,
	} = useAccessibility({
		announceOnAction: announceOnSubmit || t('petstore.users.form.announceSubmit'),
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFields((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		announceAction();
		onSubmit(fields);
	};

	return (
		<form
			className={`user-form ${className || ''}`}
			onSubmit={handleSubmit}
			{...ariaAttributes}
			onKeyDown={handleKeyDown}
			aria-label={t('petstore.users.form.ariaLabel')}
			autoComplete="off"
		>
			<Input
				name="username"
				labelTranslationKey="petstore.users.form.username"
				value={fields.username}
				onChange={handleChange}
				required
				disabled={!!user?.username}
				autoFocus
			/>
			<Input
				name="firstName"
				labelTranslationKey="petstore.users.form.firstName"
				value={fields.firstName}
				onChange={handleChange}
				required
			/>
			<Input
				name="lastName"
				labelTranslationKey="petstore.users.form.lastName"
				value={fields.lastName}
				onChange={handleChange}
				required
			/>
			<Input
				name="email"
				labelTranslationKey="petstore.users.form.email"
				value={fields.email}
				onChange={handleChange}
				type="email"
				required
			/>
			<Input
				name="password"
				labelTranslationKey="petstore.users.form.password"
				value={fields.password}
				onChange={handleChange}
				type="password"
				required={!user}
				autoComplete="new-password"
			/>
			<Input
				name="phone"
				labelTranslationKey="petstore.users.form.phone"
				value={fields.phone}
				onChange={handleChange}
			/>
			<div className="user-form__actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
				<Button
					type="submit"
					variant="primary"
					disabled={isLoading}
					loading={isLoading}
					announceOnAction={t('petstore.users.form.announceSubmit')}
				>
					{t('petstore.users.form.save')}
				</Button>
				<Button
					type="button"
					variant="secondary"
					onClick={onCancel}
				>
					{t('petstore.users.form.cancel')}
				</Button>
			</div>
		</form>
	);
};
