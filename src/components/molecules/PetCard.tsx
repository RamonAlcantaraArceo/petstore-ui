import type { FC } from 'react';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { useTranslation } from '../../i18n';
import type { Pet } from '../../services/types';

export interface PetCardProps {
  pet: Pet;
  onEdit?: (pet: Pet) => void;
  onDelete?: (pet: Pet) => void;
  /** When true hides Edit/Delete buttons */
  readonly?: boolean;
  className?: string;
}

export const PetCard: FC<PetCardProps> = ({ pet, onEdit, onDelete, readonly = false, className }) => {
  const { t } = useTranslation();

  const labelText = t('petstore.pets.card.ariaLabel', { name: pet.name });

  return (
    <Card
      elevation="base"
      padding="md"
      border
      fullWidth
      {...(className !== undefined && { className })}
      aria-label={labelText}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, flex: 1 }}>{pet.name}</h3>
          <Badge variant={pet.status} />
        </div>

        {/* Category */}
        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
          <span style={{ fontWeight: 500 }}>{t('petstore.pets.card.categoryLabel')}: </span>
          {pet.category?.name || '—'}
        </div>

        {/* Tags */}
        {pet.tags?.length > 0 && (
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
            <span style={{ fontWeight: 500 }}>{t('petstore.pets.card.tagsLabel')}: </span>
            {pet.tags.map((tag) => tag.name).join(', ')}
          </div>
        )}

        {/* Actions */}
        {!readonly && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {onEdit && (
              <Button
                size="small"
                variant="secondary"
                onClick={() => onEdit(pet)}
                announceOnAction={t('petstore.pets.card.announceEdit', { name: pet.name })}
              >
                {t('petstore.pets.card.edit')}
              </Button>
            )}
            {onDelete && (
              <Button
                size="small"
                variant="danger"
                onClick={() => onDelete(pet)}
                announceOnAction={t('petstore.pets.card.announceDelete', { name: pet.name })}
              >
                {t('petstore.pets.card.delete')}
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
