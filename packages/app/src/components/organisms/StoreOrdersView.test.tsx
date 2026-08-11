import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { LocaleProvider } from '@petstore-ui/atoms';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getInventory } from '../../services/storeApi';
import { StoreOrdersView } from './StoreOrdersView';

vi.mock('../../services/storeApi', () => ({
  getInventory: vi.fn(),
  placeOrder: vi.fn(),
  getOrderById: vi.fn(),
  deleteOrder: vi.fn(),
}));

function renderView(isLoggedIn: boolean) {
  return render(
    <LocaleProvider locale="en">
      <StoreOrdersView isLoggedIn={isLoggedIn} />
    </LocaleProvider>,
  );
}

describe('StoreOrdersView authentication gating', () => {
  beforeEach(() => {
    vi.mocked(getInventory).mockReset();
  });

  it('shows an authentication message without making order API calls', () => {
    renderView(false);

    expect(screen.getByRole('status').textContent).toContain('Authentication required');
    expect(screen.queryByText('Inventory')).toBeNull();
    expect(getInventory).not.toHaveBeenCalled();
  });

  it('loads inventory only after the user is authenticated', async () => {
    vi.mocked(getInventory).mockResolvedValue({
      data: [
        {
          id: 7,
          petId: 42,
          quantity: 1,
          shipDate: '',
          status: 'placed',
          complete: false,
        },
      ],
      error: null,
    });

    renderView(true);

    await waitFor(() => expect(getInventory).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Inventory')).toBeDefined();
    expect(await screen.findByText('42')).toBeDefined();
  });
});
