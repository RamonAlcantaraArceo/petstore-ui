import React from 'react';
import type { FC } from 'react';
import { Button } from '@petstore-ui/atoms';
import { Modal } from '@petstore-ui/atoms';
import { StatusFilter } from '../molecules/StatusFilter';
import type { PetStatusFilter } from '../molecules/StatusFilter';
import { PetCard } from '../molecules/PetCard';
import { PetForm } from '../molecules/PetForm';
import type { PetFormFields } from '../molecules/PetForm';
import { ConfirmDialog } from '../molecules/ConfirmDialog';
import { useTranslation } from '@petstore-ui/atoms';
import { useAccessibility } from '@petstore-ui/atoms';
import type { Pet, PetStatus } from '../../services/types';
import { findPetsByStatus, addPet, updatePet, deletePet } from '../../services/petApi';
import { theme } from '@petstore-ui/atoms';

const ALL_STATUSES: PetStatus[] = ['available', 'pending', 'sold'];

export interface PetManagementViewProps {
  /** Whether user is authenticated (shows CRUD buttons) */
  isLoggedIn?: boolean;
  /** Override fetching — provide pets directly (for stories / testing) */
  initialPets?: Pet[];
  /** When true, skip API calls (story mode) */
  mockMode?: boolean;
  /** Number of pets shown per page / load-more step */
  pageSize?: number;
}

export const PetManagementView: FC<PetManagementViewProps> = ({
  isLoggedIn = false,
  initialPets,
  mockMode = false,
  pageSize = 4,
}) => {
  const { t } = useTranslation();
  const { ariaAttributes } = useAccessibility({
    'aria-label': t('petstore.app.pets.ariaLabel'),
  });

  // State
  const [selectedStatus, setSelectedStatus] = React.useState<PetStatusFilter>('');
  const [allPets, setAllPets] = React.useState<Pet[]>(initialPets || []);
  const [visibleCount, setVisibleCount] = React.useState(pageSize);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Derived
  const visiblePets = allPets.slice(0, visibleCount);
  const hasMore = visibleCount < allPets.length;

  // Modal states
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingPet, setEditingPet] = React.useState<Pet | undefined>(undefined);
  const [deletingPet, setDeletingPet] = React.useState<Pet | undefined>(undefined);
  const [formLoading, setFormLoading] = React.useState(false);

  // Fetch pets — resets visible page
  const fetchPets = React.useCallback(async () => {
    if (mockMode) return;
    setIsLoading(true);
    setError(null);
    const statusesToFetch = selectedStatus ? [selectedStatus] : [];
    const result = await findPetsByStatus(statusesToFetch);
    if (result.data) {
      setAllPets(result.data);
      setVisibleCount(pageSize);
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  }, [selectedStatus, mockMode, pageSize]);

  React.useEffect(() => {
    if (!initialPets) {
      fetchPets();
    }
  }, [fetchPets, initialPets]);

  // Reset visible count when initialPets changes (story mode)
  React.useEffect(() => {
    if (initialPets) {
      setAllPets(initialPets);
      setVisibleCount(pageSize);
    }
  }, [initialPets, pageSize]);

  // CRUD handlers
  const handleAdd = () => {
    setEditingPet(undefined);
    setFormOpen(true);
  };

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet);
    setFormOpen(true);
  };

  const handleFormSubmit = async (fields: PetFormFields) => {
    if (mockMode) {
      setFormOpen(false);
      return;
    }
    setFormLoading(true);
    const randomCategoryId = Math.floor(Math.random() * 1000) + 1;
    if (editingPet) {
      await updatePet({
        ...editingPet,
        name: fields.name,
        category: { id: editingPet.category?.id || randomCategoryId, name: fields.categoryName },
        photoUrls: fields.photoUrl ? [fields.photoUrl] : editingPet.photoUrls,
        status: fields.status,
      });
    } else {
      await addPet({
        name: fields.name,
        category: { id: randomCategoryId, name: fields.categoryName },
        photoUrls: fields.photoUrl ? [fields.photoUrl] : [],
        tags: [],
        status: fields.status,
      });
    }
    setFormLoading(false);
    setFormOpen(false);
    fetchPets();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingPet || mockMode) {
      setDeletingPet(undefined);
      return;
    }
    await deletePet(deletingPet.id);
    setDeletingPet(undefined);
    fetchPets();
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + pageSize, allPets.length));
  };

  return (
    <section
      data-component="PetManagementView"
      {...ariaAttributes}
      style={{ padding: theme.spacing[4] }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: theme.spacing[3],
          marginBottom: theme.spacing[4],
        }}
      >
        <StatusFilter
          statuses={ALL_STATUSES}
          selectedStatus={selectedStatus}
          onChange={(s: PetStatusFilter) => setSelectedStatus(s)}
          onRefresh={fetchPets}
          isLoading={isLoading}
        />
        {isLoggedIn && (
          <Button
            variant="primary"
            onClick={handleAdd}
            announceOnAction={t('petstore.app.pets.announceAdd')}
          >
            {t('petstore.app.pets.addButton')}
          </Button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          style={{
            color: theme.colors.semantic.error,
            fontSize: theme.typography.fontSize.sm,
            marginBottom: theme.spacing[3],
            padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
            background: '#fef2f2',
            borderRadius: theme.borderRadius.md,
            border: '1px solid #fca5a5',
          }}
        >
          {error}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && allPets.length === 0 && !error && (
        <p style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.sm }}>
          {t('petstore.app.pets.emptyState')}
        </p>
      )}

      {/* Pet grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: theme.spacing[4],
        }}
      >
        {visiblePets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            readonly={!isLoggedIn}
            {...(isLoggedIn ? { onEdit: handleEdit } : {})}
            {...(isLoggedIn ? { onDelete: (p: Pet) => setDeletingPet(p) } : {})}
          />
        ))}
      </div>

      {/* Pagination footer */}
      {allPets.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme.spacing[2],
            marginTop: theme.spacing[6],
          }}
        >
          <span
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
            }}
          >
            {t('petstore.app.pets.showingCount', {
              shown: visiblePets.length,
              total: allPets.length,
            })}
          </span>
          {hasMore ? (
            <Button
              variant="secondary"
              onClick={handleLoadMore}
              disabled={isLoading}
              loading={isLoading}
            >
              {t('petstore.app.pets.loadMore')}
            </Button>
          ) : (
            <p
              role="status"
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              {t('petstore.app.pets.allDisplayed')}
            </p>
          )}
        </div>
      )}

      {/* Add / Edit modal */}
      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        titleTranslationKey={
          editingPet ? 'petstore.pets.form.editTitle' : 'petstore.pets.form.createTitle'
        }
        size="medium"
      >
        <PetForm
          {...(editingPet !== undefined ? { pet: editingPet } : {})}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormOpen(false)}
          isLoading={formLoading}
        />
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deletingPet}
        titleTranslationKey="petstore.app.pets.deleteTitle"
        message={
          deletingPet ? t('petstore.app.pets.deleteMessage', { name: deletingPet.name }) : ''
        }
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingPet(undefined)}
      />
    </section>
  );
};
