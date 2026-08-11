import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LocaleProvider } from '@petstore-ui/atoms';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Pet } from '../../services/types';
import { findPetsByStatus } from '../../services/petApi';
import { PetManagementView } from './PetManagementView';

vi.mock('../../services/petApi', () => ({
  findPetsByStatus: vi.fn(),
  addPet: vi.fn(),
  updatePet: vi.fn(),
  deletePet: vi.fn(),
}));

const pets: Pet[] = [
  {
    id: 1,
    name: 'Buddy',
    category: { id: 1, name: 'Dogs' },
    photoUrls: [],
    tags: [],
    status: 'available',
  },
  {
    id: 2,
    name: 'Milo',
    category: { id: 2, name: 'Cats' },
    photoUrls: [],
    tags: [],
    status: 'pending',
  },
  {
    id: 3,
    name: 'Luna',
    category: { id: 2, name: 'Cats' },
    photoUrls: [],
    tags: [],
    status: 'sold',
  },
];

function renderView() {
  return render(
    <LocaleProvider locale="en">
      <PetManagementView pageSize={2} />
    </LocaleProvider>,
  );
}

describe('PetManagementView pagination', () => {
  beforeEach(() => {
    vi.mocked(findPetsByStatus).mockReset();
  });

  it('loads subsequent pages and stops when the API returns a partial page', async () => {
    vi.mocked(findPetsByStatus)
      .mockResolvedValueOnce({ data: pets.slice(0, 2), error: null })
      .mockResolvedValueOnce({ data: pets.slice(2), error: null });

    renderView();

    await screen.findByText('Buddy');
    expect(findPetsByStatus).toHaveBeenNthCalledWith(1, [], 0, 2);
    fireEvent.click(screen.getByRole('button', { name: /Load More/ }));

    await screen.findByText('Luna');
    expect(findPetsByStatus).toHaveBeenNthCalledWith(2, [], 2, 2);
    expect(screen.getByRole('status').textContent).toBe('All results displayed');
    expect(screen.getByText('Showing 3 results')).toBeDefined();
  });

  it('resets pagination when the status filter changes', async () => {
    vi.mocked(findPetsByStatus)
      .mockResolvedValueOnce({ data: pets.slice(0, 2), error: null })
      .mockResolvedValueOnce({ data: [pets[2]!], error: null })
      .mockResolvedValueOnce({ data: pets.slice(0, 2), error: null });

    renderView();
    await screen.findByText('Buddy');

    fireEvent.change(screen.getByLabelText('Filter by status'), { target: { value: 'sold' } });
    await waitFor(() => {
      expect(findPetsByStatus).toHaveBeenLastCalledWith(['sold'], 0, 2);
    });
    expect(await screen.findByText('Luna')).toBeDefined();

    fireEvent.change(screen.getByLabelText('Filter by status'), { target: { value: '' } });
    await waitFor(() => {
      expect(findPetsByStatus).toHaveBeenLastCalledWith([], 0, 2);
    });
  });
});
