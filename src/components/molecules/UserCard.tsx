import type { FC } from 'react';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { useTranslation } from '../../i18n';
import type { User } from '../../services/types';

export interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  readonly?: boolean;
  className?: string;
}

export const UserCard: FC<UserCardProps> = ({ user, onEdit, onDelete, readonly = false, className }) => {
  const { t } = useTranslation();

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username;

  return (
    <Card
      elevation="base"
      padding="md"
      border
      fullWidth
      {...(className !== undefined && { className })}
      aria-label={t('petstore.users.card.ariaLabel', { username: user.username })}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {/* Header */}
        <div style={{ fontWeight: 600, fontSize: '1rem' }}>{fullName}</div>
        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>@{user.username}</div>

        {/* Details */}
        <div style={{ fontSize: '0.875rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
          {user.email && (
            <div>
              <span style={{ fontWeight: 500 }}>{t('petstore.users.card.emailLabel')}: </span>
              {user.email}
            </div>
          )}
          {user.phone && (
            <div>
              <span style={{ fontWeight: 500 }}>{t('petstore.users.card.phoneLabel')}: </span>
              {user.phone}
            </div>
          )}
        </div>

        {/* Actions */}
        {!readonly && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {onEdit && (
              <Button
                size="small"
                variant="secondary"
                onClick={() => onEdit(user)}
                announceOnAction={t('petstore.users.card.announceEdit', { username: user.username })}
              >
                {t('petstore.users.card.edit')}
              </Button>
            )}
            {onDelete && (
              <Button
                size="small"
                variant="danger"
                onClick={() => onDelete(user)}
                announceOnAction={t('petstore.users.card.announceDelete', { username: user.username })}
              >
                {t('petstore.users.card.delete')}
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
