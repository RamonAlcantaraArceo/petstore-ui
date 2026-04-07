import React from 'react';
import type { FC } from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { Modal } from '../atoms/Modal';
import { UserCard } from '../molecules/UserCard';
import { UserForm } from '../molecules/UserForm';
import type { UserFormFields } from '../molecules/UserForm';
import { ConfirmDialog } from '../molecules/ConfirmDialog';
import { useTranslation } from '../../i18n';
import { useAccessibility } from '../../accessibility';
import type { User } from '../../services/types';
import { getUserByName, createUser, updateUser, deleteUser } from '../../services/userApi';
import { theme } from '../../tokens/theme';

export interface UserManagementViewProps {
  /** Whether user is authenticated */
  isLoggedIn?: boolean;
  /** Override looked-up user for stories */
  initialUser?: User;
  /** When true, skip API calls (story mode) */
  mockMode?: boolean;
}

export const UserManagementView: FC<UserManagementViewProps> = ({
  isLoggedIn = false,
  initialUser,
  mockMode = false,
}) => {
  const { t } = useTranslation();
  const { ariaAttributes } = useAccessibility({
    'aria-label': t('petstore.app.users.ariaLabel'),
    role: 'group',
  });

  // Lookup state
  const [lookupUsername, setLookupUsername] = React.useState('');
  const [lookedUpUser, setLookedUpUser] = React.useState<User | undefined>(initialUser);
  const [lookupError, setLookupError] = React.useState<string | null>(null);
  const [lookupLoading, setLookupLoading] = React.useState(false);

  // Form modal state (edit/create)
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<User | undefined>(undefined);
  const [formLoading, setFormLoading] = React.useState(false);

  // User creation modal (for unauthenticated users)
  const [createModalOpen, setCreateModalOpen] = React.useState(false);

  // Delete confirmation
  const [deletingUser, setDeletingUser] = React.useState<User | undefined>(undefined);

  const closeEditModal = () => {
    setFormOpen(false);
    setEditingUser(undefined);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
    setEditingUser(undefined);
  };

  // Lookup handler
  const handleLookup = async () => {
    if (!lookupUsername.trim()) return;
    setLookupError(null);
    setLookupLoading(true);
    if (mockMode) {
      setLookupLoading(false);
      return;
    }
    const result = await getUserByName(lookupUsername.trim());
    if (result.data) {
      setLookedUpUser(result.data);
      setLookupError(null);
    } else {
      setLookedUpUser(undefined);
      setLookupError(t('petstore.users.lookup.notFound'));
    }
    setLookupLoading(false);
  };

  // Edit user
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  // Form submit
  const handleFormSubmit = async (fields: UserFormFields) => {
    if (mockMode) {
      closeEditModal();
      closeCreateModal();
      return;
    }

    setFormLoading(true);

    if (editingUser) {
      const updateResult = await updateUser(editingUser.username, {
        ...editingUser,
        ...fields,
        id: editingUser.id,
        userStatus: editingUser.userStatus,
      });
      if (updateResult.error) {
        setFormLoading(false);
        throw new Error(updateResult.error);
      }
    } else {
      const createResult = await createUser({
        username: fields.username,
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        password: fields.password,
        phone: fields.phone,
        userStatus: 0,
      });
      if (createResult.error) {
        setFormLoading(false);
        throw new Error(createResult.error);
      }
    }

    setFormLoading(false);

    if (editingUser) {
      closeEditModal();
    } else {
      closeCreateModal();
    }

    // Re-lookup the user if we were editing the same one
    if (editingUser && editingUser.username === lookedUpUser?.username) {
      const result = await getUserByName(editingUser.username);
      if (result.data) setLookedUpUser(result.data);
    }
  };

  // Delete user
  const handleDeleteConfirm = async () => {
    if (!deletingUser || mockMode) {
      setDeletingUser(undefined);
      return;
    }
    await deleteUser(deletingUser.username);
    setDeletingUser(undefined);
    if (lookedUpUser?.username === deletingUser.username) {
      setLookedUpUser(undefined);
    }
  };

  return (
    <section {...ariaAttributes} style={{ padding: theme.spacing[4] }}>
      <h2
        style={{
          fontSize: theme.typography.fontSize.lg,
          marginBottom: theme.spacing[3],
          fontWeight: theme.typography.fontWeight.semibold,
        }}
      >
        {t('petstore.users.title')}
      </h2>

      {/* Show create user button/modal only if NOT logged in */}
      {!isLoggedIn && (
        <div style={{ marginBottom: theme.spacing[4] }}>
          <Button
            variant="primary"
            onClick={() => setCreateModalOpen(true)}
            announceOnAction={t('components.userCreateForm.announceOnCreate')}
          >
            {t('components.userCreateForm.title')}
          </Button>
        </div>
      )}

      {/* Lookup bar only if logged in */}
      {isLoggedIn && (
        <form
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: theme.spacing[3],
            flexWrap: 'wrap',
            marginBottom: theme.spacing[4],
          }}
          aria-label={t('petstore.users.lookup.ariaLabel')}
          onSubmit={(e) => {
            e.preventDefault();
            handleLookup();
          }}
        >
          <Input
            name="username"
            labelTranslationKey="petstore.users.lookup.label"
            placeholderTranslationKey="petstore.users.lookup.placeholder"
            value={lookupUsername}
            onChange={(e) => setLookupUsername(e.target.value)}
          />
          <Button
            variant="secondary"
            onClick={handleLookup}
            disabled={lookupLoading || !lookupUsername.trim()}
            loading={lookupLoading}
          >
            {t('petstore.users.lookup.button')}
          </Button>
        </form>
      )}

      {/* Lookup error */}
      {lookupError && (
        <div
          role="alert"
          style={{
            color: theme.colors.semantic.error,
            fontSize: theme.typography.fontSize.sm,
            marginBottom: theme.spacing[3],
          }}
        >
          {lookupError}
        </div>
      )}

      {/* User card result */}
      {lookedUpUser && (
        <div style={{ maxWidth: '24rem' }}>
          <UserCard
            user={lookedUpUser}
            readonly={!isLoggedIn}
            {...(isLoggedIn ? { onEdit: handleEdit } : {})}
            {...(isLoggedIn ? { onDelete: (u: User) => setDeletingUser(u) } : {})}
          />
        </div>
      )}

      {/* Create / Edit modal (only for editing, not for creation when not logged in) */}
      <Modal
        isOpen={formOpen}
        onClose={closeEditModal}
        titleTranslationKey={
          editingUser ? 'petstore.users.form.editTitle' : 'petstore.users.form.createTitle'
        }
        size="medium"
      >
        <UserForm
          {...(editingUser !== undefined
            ? {
                user: {
                  username: editingUser.username,
                  firstName: editingUser.firstName,
                  lastName: editingUser.lastName,
                  email: editingUser.email,
                  phone: editingUser.phone,
                },
              }
            : {})}
          onSubmit={handleFormSubmit}
          onCancel={closeEditModal}
          isLoading={formLoading}
        />
      </Modal>

      {/* User creation modal for unauthenticated users */}
      <Modal
        isOpen={createModalOpen}
        onClose={closeCreateModal}
        titleTranslationKey="petstore.users.form.createTitle"
        size="medium"
      >
        <UserForm onSubmit={handleFormSubmit} onCancel={closeCreateModal} isLoading={formLoading} />
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deletingUser}
        titleTranslationKey="petstore.app.users.deleteTitle"
        message={
          deletingUser
            ? t('petstore.app.users.deleteMessage', { username: deletingUser.username })
            : ''
        }
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingUser(undefined)}
      />
    </section>
  );
};
