/**
 * Store API Service
 *
 * Typed functions for the Petstore `/store` endpoints.
 * @see https://petstore.swagger.io/#/store
 */

import type { Order, Inventory, ApiResponse, ApiResult } from './types';
import { get, post, del } from './apiClient';

/**
 * Get pet inventory counts keyed by status.
 * Returns a map of status → count.
 */
export function getInventory(): Promise<ApiResult<Inventory>> {
  return get<Inventory>('/store/inventory');
}

/**
 * Place a new order for a pet (requires auth).
 * @param order — Order payload (id is assigned by the server)
 */
export function placeOrder(order: Omit<Order, 'id'>): Promise<ApiResult<Order>> {
  return post<Order>('/store/order', order);
}

/**
 * Find an order by its ID.
 * @param id — Order identifier (valid range 1–10 per API docs)
 */
export function getOrderById(id: number): Promise<ApiResult<Order>> {
  return get<Order>(`/store/order/${id}`);
}

/**
 * Delete an order by ID (requires auth).
 * @param id — Order identifier
 */
export function deleteOrder(id: number): Promise<ApiResult<ApiResponse>> {
  return del<ApiResponse>(`/store/order/${id}`);
}
