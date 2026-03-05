import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { findPetsByStatus, getPetById, addPet, updatePet, deletePet } from './petApi';
import { clearApiToken } from './apiClient';
import type { Pet } from './types';

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

function mockFetch(responseData: unknown, options: { status?: number; ok?: boolean } = {}) {
  const { status = 200, ok = true } = options;
  return vi.fn(async () => ({
    ok,
    status,
    headers: { get: () => 'application/json' },
    json: async () => responseData,
    text: async () => JSON.stringify(responseData),
  }));
}

const samplePet: Pet = {
  id: 1,
  name: 'Buddy',
  category: { id: 1, name: 'Dogs' },
  photoUrls: [],
  tags: [{ id: 1, name: 'friendly' }],
  status: 'available',
};

// -------------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------------

describe('petApi', () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    clearApiToken();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  // -----------------------------------------------------------------------
  // findPetsByStatus
  // -----------------------------------------------------------------------
  describe('findPetsByStatus()', () => {
    it('returns array of pets for a single status', async () => {
      globalThis.fetch = mockFetch([samplePet]) as any;
      const result = await findPetsByStatus(['available']);
      expect(result.error).toBeNull();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data?.[0]?.name).toBe('Buddy');
    });

    it('joins multiple statuses into comma-separated query param', async () => {
      let capturedUrl = '';
      globalThis.fetch = vi.fn(async (url: string) => {
        capturedUrl = url;
        return {
          ok: true,
          status: 200,
          headers: { get: () => 'application/json' },
          json: async () => [],
        };
      }) as any;
      await findPetsByStatus(['available', 'pending']);
      expect(capturedUrl).toContain('status=available%2Cpending');
    });

    it('returns empty array when no pets match', async () => {
      globalThis.fetch = mockFetch([]) as any;
      const result = await findPetsByStatus(['sold']);
      expect(result.data).toEqual([]);
    });

    it('returns error on API failure', async () => {
      globalThis.fetch = mockFetch('Internal Server Error', { ok: false, status: 500 }) as any;
      const result = await findPetsByStatus(['available']);
      expect(result.data).toBeNull();
      expect(result.error).toContain('500');
    });
  });

  // -----------------------------------------------------------------------
  // getPetById
  // -----------------------------------------------------------------------
  describe('getPetById()', () => {
    it('returns pet data for valid id', async () => {
      globalThis.fetch = mockFetch(samplePet) as any;
      const result = await getPetById(1);
      expect(result.error).toBeNull();
      expect(result.data?.id).toBe(1);
      expect(result.data?.name).toBe('Buddy');
    });

    it('returns error for non-existent id', async () => {
      globalThis.fetch = mockFetch('Pet not found', { ok: false, status: 404 }) as any;
      const result = await getPetById(9999);
      expect(result.data).toBeNull();
      expect(result.error).toContain('404');
    });
  });

  // -----------------------------------------------------------------------
  // addPet
  // -----------------------------------------------------------------------
  describe('addPet()', () => {
    it('creates a pet and returns it with assigned id', async () => {
      globalThis.fetch = mockFetch(samplePet) as any;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, ...petWithoutId } = { ...samplePet, id: 0 };
      const result = await addPet(petWithoutId);
      expect(result.error).toBeNull();
      expect(result.data?.name).toBe('Buddy');
    });

    it('returns error on validation failure', async () => {
      globalThis.fetch = mockFetch('Invalid input', { ok: false, status: 405 }) as any;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id2, ...petWithoutId } = samplePet;
      const result = await addPet(petWithoutId);
      expect(result.data).toBeNull();
      expect(result.error).toContain('405');
    });
  });

  // -----------------------------------------------------------------------
  // updatePet
  // -----------------------------------------------------------------------
  describe('updatePet()', () => {
    it('updates and returns the pet', async () => {
      const updated = { ...samplePet, name: 'Buddy Jr.' };
      globalThis.fetch = mockFetch(updated) as any;
      const result = await updatePet(updated);
      expect(result.error).toBeNull();
      expect(result.data?.name).toBe('Buddy Jr.');
    });

    it('returns error when pet not found', async () => {
      globalThis.fetch = mockFetch('Not Found', { ok: false, status: 404 }) as any;
      const result = await updatePet({ ...samplePet, id: 9999 });
      expect(result.data).toBeNull();
      expect(result.error).toContain('404');
    });
  });

  // -----------------------------------------------------------------------
  // deletePet
  // -----------------------------------------------------------------------
  describe('deletePet()', () => {
    it('returns success response', async () => {
      globalThis.fetch = mockFetch({ code: 200, type: 'unknown', message: '1' }) as any;
      const result = await deletePet(1);
      expect(result.error).toBeNull();
    });

    it('returns error when pet not found', async () => {
      globalThis.fetch = mockFetch('Not Found', { ok: false, status: 404 }) as any;
      const result = await deletePet(9999);
      expect(result.data).toBeNull();
      expect(result.error).toContain('404');
    });
  });
});
