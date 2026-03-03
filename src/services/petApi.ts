/**
 * Pet API Service
 *
 * Typed functions for the Petstore `/pet` endpoints.
 * @see https://petstore.swagger.io/#/pet
 */

import type { Pet, PetStatus, ApiResponse, ApiResult } from './types';
import { get, post, put, del } from './apiClient';

/**
 * Find pets by one or more statuses.
 * @param statuses — Array of pet statuses to filter by
 */
export function findPetsByStatus(statuses: PetStatus[]): Promise<ApiResult<Pet[]>> {
  return get<Pet[]>('/pet/findByStatus', {
    status: statuses.join(','),
  });
}

/**
 * Get a single pet by its ID.
 * @param id — Pet identifier
 */
export function getPetById(id: number): Promise<ApiResult<Pet>> {
  return get<Pet>(`/pet/${id}`);
}

/**
 * Add a new pet to the store (requires auth).
 * @param pet — Pet object to create
 */
export function addPet(pet: Omit<Pet, 'id'>): Promise<ApiResult<Pet>> {
  return post<Pet>('/pet', pet);
}

/**
 * Update an existing pet (requires auth).
 * @param pet — Pet object with updated fields (must include `id`)
 */
export function updatePet(pet: Pet): Promise<ApiResult<Pet>> {
  return put<Pet>('/pet', pet);
}

/**
 * Delete a pet by ID (requires auth).
 * @param id — Pet identifier
 */
export function deletePet(id: number): Promise<ApiResult<ApiResponse>> {
  return del<ApiResponse>(`/pet/${id}`);
}
