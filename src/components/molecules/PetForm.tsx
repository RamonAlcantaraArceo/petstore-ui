import React from 'react';
import type { FC, FormEvent } from 'react';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Button } from '../atoms/Button';
import { useTranslation } from '../../i18n';
import { useAccessibility } from '../../accessibility';
import type { Pet, PetStatus } from '../../services/types';

export interface PetFormFields {
  name: string;
  photoUrl: string;
  categoryName: string;
  status: PetStatus;
}

export interface PetFormProps {
  /** Pre-fill for edit mode */
  pet?: Pet;
  onSubmit: (fields: PetFormFields) => void;
  onCancel: () => void;
  isLoading?: boolean;
  className?: string;
}

const STATUS_OPTIONS = [
  { value: 'available', labelTranslationKey: 'petstore.common.status.available' },
  { value: 'pending',   labelTranslationKey: 'petstore.common.status.pending' },
  { value: 'sold',      labelTranslationKey: 'petstore.common.status.sold' },
];

export const PetForm: FC<PetFormProps> = ({ pet, onSubmit, onCancel, isLoading = false, className }) => {
  const { t } = useTranslation();
  const [fields, setFields] = React.useState<PetFormFields>({
    name: pet?.name || '',
    photoUrl: pet?.photoUrls?.[0] || '',
    categoryName: pet?.category?.name || '',
    status: pet?.status || 'available',
  });

  const { ariaAttributes } = useAccessibility({
    announceOnAction: t('petstore.pets.form.announceSubmit'),
  });

  const set = (key: keyof PetFormFields) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(fields);
  };

  return (
    <form
      className={`pet-form ${className || ''}`.trim()}
      onSubmit={handleSubmit}
      aria-label={t(pet ? 'petstore.pets.form.editTitle' : 'petstore.pets.form.createTitle')}
      {...ariaAttributes}
    >
      <Input
        name="name"
        labelTranslationKey="petstore.pets.form.name"
        value={fields.name}
        onChange={set('name')}
        required
        autoFocus
      />
      <Input
        name="categoryName"
        labelTranslationKey="petstore.pets.form.category"
        value={fields.categoryName}
        onChange={set('categoryName')}
      />
      <Input
        name="photoUrl"
        labelTranslationKey="petstore.pets.form.photoUrl"
        value={fields.photoUrl}
        onChange={set('photoUrl')}
        type="url"
      />
      <Select
        options={STATUS_OPTIONS}
        value={fields.status}
        onChange={(val) => setFields((prev) => ({ ...prev, status: val as PetStatus }))}
        labelTranslationKey="petstore.pets.form.status"
        fullWidth
      />
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
        <Button type="submit" variant="primary" disabled={isLoading} loading={isLoading}>
          {t('petstore.pets.form.save')}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t('petstore.pets.form.cancel')}
        </Button>
      </div>
    </form>
  );
};
