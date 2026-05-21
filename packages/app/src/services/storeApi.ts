/**
 * Store API Service
 *
 * Typed functions for the Petstore `/store` endpoints.
 * @see https://petstore.swagger.io/#/store
 */

import type { Order, ApiResponse, ApiResult } from './types';
import { get, post, del } from './apiClient';

interface OrderApiModel {
  id: number;
  pet_id?: number;
  petId?: number;
  quantity: number;
  ship_date?: string | null;
  shipDate?: string | null;
  status: Order['status'];
  complete: boolean;
}

function fromApiOrder(order: OrderApiModel): Order {
  return {
    id: order.id,
    petId: order.petId ?? order.pet_id ?? 0,
    quantity: order.quantity,
    shipDate: order.shipDate ?? order.ship_date ?? '',
    status: order.status,
    complete: order.complete,
  };
}

function toApiOrder(order: Omit<Order, 'id'>): Omit<OrderApiModel, 'id'> {
  return {
    pet_id: order.petId,
    quantity: order.quantity,
    ship_date: order.shipDate,
    status: order.status,
    complete: order.complete,
  };
}

/**
 * Get store orders from inventory endpoint.
 * Returns an array of orders.
 */
export function getInventory(): Promise<ApiResult<Order[]>> {
  return get<OrderApiModel[]>('/store/inventory').then((result) => {
    if (!result.data) {
      return result;
    }
    return {
      data: result.data.map(fromApiOrder),
      error: null,
    };
  });
}

/**
 * Place a new order for a pet (requires auth).
 * @param order — Order payload (id is assigned by the server)
 */
export function placeOrder(order: Omit<Order, 'id'>): Promise<ApiResult<Order>> {
  return post<OrderApiModel>('/store/order', toApiOrder(order)).then((result) => {
    if (!result.data) {
      return result;
    }
    return {
      data: fromApiOrder(result.data),
      error: null,
    };
  });
}

/**
 * Find an order by its ID.
 * @param id — Order identifier (valid range 1–10 per API docs)
 */
export function getOrderById(id: number): Promise<ApiResult<Order>> {
  return get<OrderApiModel>(`/store/order/${id}`).then((result) => {
    if (!result.data) {
      return result;
    }
    return {
      data: fromApiOrder(result.data),
      error: null,
    };
  });
}

/**
 * Delete an order by ID (requires auth).
 * @param id — Order identifier
 */
export function deleteOrder(id: number): Promise<ApiResult<ApiResponse>> {
  return del<ApiResponse>(`/store/order/${id}`);
}
