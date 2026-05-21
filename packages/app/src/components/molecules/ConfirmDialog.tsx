import type { FC } from 'react';
import { Modal } from '../atoms/Modal';
import { Button } from '../atoms/Button';
import { useTranslation } from '../../i18n';

export interface ConfirmDialogProps {
  isOpen: boolean;
  /** Override title (translated by caller). Falls back to translation key. */
  title?: string;
  titleTranslationKey?: string;
  /** Body message (translated by caller). Falls back to translation key. */
  message?: string;
  messageTranslationKey?: string;
  messageTranslationParams?: Record<string, string | number>;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'default' | 'danger';
  className?: string;
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  titleTranslationKey = 'petstore.common.confirm.defaultTitle',
  message,
  messageTranslationKey,
  messageTranslationParams,
  onConfirm,
  onCancel,
  variant = 'default',
}) => {
  const { t } = useTranslation();

  const displayMessage = messageTranslationKey
    ? t(messageTranslationKey, messageTranslationParams)
    : message;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      {...(title !== undefined ? { title } : { titleTranslationKey })}
      size="small"
    >
      {displayMessage && (
        <p
          style={{ margin: '0 0 1.5rem', color: '#374151', fontSize: '0.9375rem', lineHeight: 1.6 }}
        >
          {displayMessage}
        </p>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          announceOnAction={t('petstore.common.confirm.announceCancelled')}
        >
          {t('petstore.common.confirm.cancel')}
        </Button>
        <Button
          type="button"
          variant={variant === 'danger' ? 'danger' : 'primary'}
          onClick={onConfirm}
          announceOnAction={t('petstore.common.confirm.announceConfirmed')}
        >
          {t('petstore.common.confirm.confirm')}
        </Button>
      </div>
    </Modal>
  );
};
