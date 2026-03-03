import { describe, it, expect, beforeEach, afterEach, mock } from 'bun:test';
import { getInventory, placeOrder, getOrderById, deleteOrder } from './storeApi';
import { clearApiToken } from './apiClient';
import type { Order, Inventory } from './types';

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

function mockFetch(responseData: unknown, options: { status?: number; ok?: boolean } = {}) {
  const { status = 200, ok = true } = options;
  return mock(async () => ({
    ok,
    status,
    headers: { get: () => 'application/json' },
    json: async () => responseData,
    text: async () => JSON.stringify(responseData),
  }));
}

const sampleOrder: Order = {
  id: 1,
  petId: 42,
  quantity: 1,
  shipDate: '2024-01-15T00:00:00.000Z',
  status: 'placed',
  complete: false,
};

const sampleInventory: Inventory = {
  available: 10,
  pending: 3,
  sold: 7,
};

// -------------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------------

describe('storeApi', () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    clearApiToken();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  // -----------------------------------------------------------------------
  // getInventory
  // -----------------------------------------------------------------------
  describe('getInventory()', () => {
    it('returns inventory map on success', async () => {
      globalThis.fetch = mockFetch(sampleInventory) as any;
      const result = await getInventory();
      expect(result.error).toBeNull();
      expect(result.data?.available).toBe(10);
      expect(result.data?.pending).toBe(3);
      expect(result.data?.sold).toBe(7);
    });

    it('returns error on API failure', async () => {
      globalThis.fetch = mockFetch('Unauthorized', { ok: false, status: 401 }) as any;
      const result = await getInventory();
      expect(result.data).toBeNull();
      expect(result.error).toContain('401');
    });
  });

  // -----------------------------------------------------------------------
  // placeOrder
  // -----------------------------------------------------------------------
  describe('placeOrder()', () => {
    it('places order and returns it with assigned id', async () => {
      globalThis.fetch = mockFetch(sampleOrder) as any;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, ...orderWithoutId } = sampleOrder;
      const result = await placeOrder(orderWithoutId);
      expect(result.error).toBeNull();
      expect(result.data?.id).toBe(1);
      expect(result.data?.status).toBe('placed');
    });

    it('returns error on invalid order data', async () => {
      globalThis.fetch = mockFetch('Invalid Order', { ok: false, status: 400 }) as any;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id2, ...orderWithoutId } = sampleOrder;
      const result = await placeOrder(orderWithoutId);
      expect(result.data).toBeNull();
      expect(result.error).toContain('400');
    });
  });

  // -----------------------------------------------------------------------
  // getOrderById
  // -----------------------------------------------------------------------
  describe('getOrderById()', () => {
    it('returns order for valid id', async () => {
      globalThis.fetch = mockFetch(sampleOrder) as any;
      const result = await getOrderById(1);
      expect(result.error).toBeNull();
      expect(result.data?.petId).toBe(42);
      expect(result.data?.complete).toBe(false);
    });

    it('returns error for id out of range', async () => {
      globalThis.fetch = mockFetch('Not Found', { ok: false, status: 404 }) as any;
      const result = await getOrderById(999);
      expect(result.data).toBeNull();
      expect(result.error).toContain('404');
    });
  });

  // -----------------------------------------------------------------------
  // deleteOrder
  // -----------------------------------------------------------------------
  describe('deleteOrder()', () => {
    it('returns success for valid deletion', async () => {
      globalThis.fetch = mockFetch({ code: 200, type: 'unknown', message: '1' }) as any;
      const result = await deleteOrder(1);
      expect(result.error).toBeNull();
    });

    it('returns error when order not found', async () => {
      globalThis.fetch = mockFetch('Not Found', { ok: false, status: 404 }) as any;
      const result = await deleteOrder(9999);
      expect(result.data).toBeNull();
      expect(result.error).toContain('404');
    });
  });
});
