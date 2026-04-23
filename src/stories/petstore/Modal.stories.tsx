import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Modal } from '../../components/atoms/Modal';
import { Button } from '../../components/atoms/Button';
import { useTranslation } from '../../i18n';

const meta: Meta<typeof Modal> = {
  title: 'Petstore/Atoms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

function ModalTemplate(args: React.ComponentProps<typeof Modal>) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(args.isOpen);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{t('petstore.modal.openButton')}</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>{t('petstore.modal.content')}</p>
        <div style={{ marginTop: '1rem' }}>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            {t('petstore.common.close')}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export const OpenClosed: Story = {
  render: (args) => <ModalTemplate {...args} />,
  args: {
    isOpen: false,
    titleTranslationKey: 'petstore.modal.editPetTitle',
    size: 'medium',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <ModalTemplate
        isOpen={false}
        titleTranslationKey="petstore.modal.smallTitle"
        size="small"
        onClose={() => {}}
      >
        small
      </ModalTemplate>
      <ModalTemplate
        isOpen={false}
        titleTranslationKey="petstore.modal.mediumTitle"
        size="medium"
        onClose={() => {}}
      >
        medium
      </ModalTemplate>
      <ModalTemplate
        isOpen={false}
        titleTranslationKey="petstore.modal.largeTitle"
        size="large"
        onClose={() => {}}
      >
        large
      </ModalTemplate>
    </div>
  ),
};

export const FocusTrap: Story = {
  render: () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(true);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>{t('petstore.modal.reopenButton')}</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          titleTranslationKey="petstore.modal.focusTrapTitle"
          size="medium"
        >
          <input
            placeholder={t('petstore.modal.firstInputPlaceholder')}
            style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
          />
          <input
            placeholder={t('petstore.modal.secondInputPlaceholder')}
            style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
          />
          <Button onClick={() => setIsOpen(false)}>{t('petstore.modal.doneButton')}</Button>
        </Modal>
      </>
    );
  },
};
