import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { LocaleProvider } from '../../i18n';
import { PetCard } from './PetCard';
import type { Pet } from '../../services/types';

function renderWithLocale(ui: React.ReactElement) {
  return render(<LocaleProvider locale="en">{ui}</LocaleProvider>);
}

const mockPet: Pet = {
  id: 1,
  name: 'Buddy',
  category: { id: 1, name: 'Dogs' },
  photoUrls: [],
  tags: [{ id: 1, name: 'friendly' }],
  status: 'available',
};

describe('PetCard', () => {
  describe('rendering', () => {
    it('displays the pet name', () => {
      const { getByText } = renderWithLocale(<PetCard pet={mockPet} />);
      expect(getByText('Buddy')).toBeDefined();
    });

    it('displays the pet category', () => {
      const { getByText } = renderWithLocale(<PetCard pet={mockPet} />);
      expect(getByText('Dogs')).toBeDefined();
    });

    it('displays pet tags', () => {
      const { container } = renderWithLocale(<PetCard pet={mockPet} />);
      expect(container.textContent).toContain('friendly');
    });

    it('shows a dash when category is missing', () => {
      const pet: Pet = { ...mockPet, category: { id: 0, name: '' } };
      const { getByText } = renderWithLocale(<PetCard pet={pet} />);
      expect(getByText('—')).toBeDefined();
    });

    it('renders the status badge', () => {
      const { container } = renderWithLocale(<PetCard pet={mockPet} />);
      expect(container.querySelector('span')).toBeDefined();
    });
  });

  describe('actions', () => {
    it('shows edit button when onEdit is provided', () => {
      const { container } = renderWithLocale(<PetCard pet={mockPet} onEdit={() => {}} />);
      const buttons = Array.from(container.querySelectorAll('button'));
      expect(buttons.some((b) => b.textContent?.toLowerCase().includes('edit'))).toBe(true);
    });

    it('shows delete button when onDelete is provided', () => {
      const { container } = renderWithLocale(<PetCard pet={mockPet} onDelete={() => {}} />);
      const buttons = Array.from(container.querySelectorAll('button'));
      expect(buttons.some((b) => b.textContent?.toLowerCase().includes('delete'))).toBe(true);
    });

    it('calls onEdit with the pet when edit button is clicked', () => {
      const handleEdit = vi.fn((p: Pet) => p);
      const { container } = renderWithLocale(<PetCard pet={mockPet} onEdit={handleEdit} />);
      const editBtn = Array.from(container.querySelectorAll('button')).find((b) =>
        b.textContent?.toLowerCase().includes('edit'),
      )!;
      editBtn.click();
      expect(handleEdit).toHaveBeenCalledTimes(1);
      expect(handleEdit).toHaveBeenCalledWith(mockPet);
    });

    it('calls onDelete with the pet when delete button is clicked', () => {
      const handleDelete = vi.fn((p: Pet) => p);
      const { container } = renderWithLocale(<PetCard pet={mockPet} onDelete={handleDelete} />);
      const deleteBtn = Array.from(container.querySelectorAll('button')).find((b) =>
        b.textContent?.toLowerCase().includes('delete'),
      )!;
      deleteBtn.click();
      expect(handleDelete).toHaveBeenCalledTimes(1);
      expect(handleDelete).toHaveBeenCalledWith(mockPet);
    });

    it('hides action buttons in readonly mode', () => {
      const { container } = renderWithLocale(
        <PetCard pet={mockPet} onEdit={() => {}} onDelete={() => {}} readonly />,
      );
      expect(container.querySelectorAll('button')).toHaveLength(0);
    });
  });

  describe('accessibility', () => {
    it('has an aria-label on the card', () => {
      const { container } = renderWithLocale(<PetCard pet={mockPet} />);
      const card = container.querySelector('[aria-label]');
      expect(card).toBeDefined();
      expect(card?.getAttribute('aria-label')).toContain('Buddy');
    });
  });
});
