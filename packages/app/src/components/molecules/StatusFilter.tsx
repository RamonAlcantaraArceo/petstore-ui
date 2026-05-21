import type { FC } from 'react';
import { Select } from '../atoms/Select';
import { Button } from '../atoms/Button';
import { useTranslation } from '../../i18n';
import type { PetStatus } from '../../services/types';

export interface StatusFilterProps {
  statuses: PetStatus[];
  selectedStatus: PetStatus;
  onChange: (status: PetStatus) => void;
  onRefresh: () => void;
  isLoading?: boolean;
  className?: string;
}

export const StatusFilter: FC<StatusFilterProps> = ({
  statuses,
  selectedStatus,
  onChange,
  onRefresh,
  isLoading = false,
  className,
}) => {
  const { t } = useTranslation();

  const options = statuses.map((s) => ({
    value: s,
    labelTranslationKey: `petstore.common.status.${s}`,
  }));

  return (
    <div
      className={`status-filter ${className || ''}`.trim()}
      aria-label={t('petstore.pets.filter.ariaLabel')}
      style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}
    >
      <Select
        options={options}
        value={selectedStatus}
        onChange={(val) => onChange(val as PetStatus)}
        labelTranslationKey="petstore.pets.filter.label"
      />
      <Button
        type="button"
        variant="secondary"
        size="medium"
        onClick={onRefresh}
        disabled={isLoading}
        loading={isLoading}
        announceOnAction={t('petstore.pets.filter.announceRefresh')}
      >
        {t('petstore.pets.filter.refresh')}
      </Button>
    </div>
  );
};
