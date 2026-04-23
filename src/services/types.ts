/**
 * Petstore API Model Interfaces
 *
 * Shared TypeScript types matching the Petstore Swagger API v2 schema.
 * @see https://petstore.swagger.io/v2/swagger.json
 */

/** Pet category (e.g. "Dogs", "Cats") */
export interface Category {
  id: number;
  name: string;
}

/** Descriptive tag for a pet */
export interface Tag {
  id: number;
  name: string;
}

/** Pet status in the store */
export type PetStatus = 'available' | 'pending' | 'sold';

/** A pet available in the store */
export interface Pet {
  id: number;
  category: Category;
  name: string;
  photoUrls: string[];
  tags: Tag[];
  status: PetStatus;
}

/** Order status */
export type OrderStatus = 'placed' | 'approved' | 'delivered';

/** A store order for a pet */
export interface Order {
  id: number;
  petId: number;
  quantity: number;
  shipDate: string;
  status: OrderStatus;
  complete: boolean;
}

/** Inventory count keyed by pet status */
export type Inventory = Record<string, number>;

/** A registered user */
export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
}

/** Generic API response returned by some endpoints */
export interface ApiResponse {
  code: number;
  type: string;
  message: string;
}

/**
 * Result tuple for all API calls.
 * Exactly one of `data` or `error` will be present.
 */
export type ApiResult<T> = { data: T; error: null } | { data: null; error: string };
