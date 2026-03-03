/**
 * User API Service
 *
 * Typed functions for the Petstore `/user` endpoints.
 * @see https://petstore.swagger.io/#/user
 */

import type { User, ApiResponse, ApiResult } from './types';
import { get, post, put, del } from './apiClient';

/**
 * Log in a user. On success the API returns a session token embedded in the
 * `message` field of the response (format: `"logged in user session:<token>"`).
 *
 * @param username — Registered username
 * @param password — User password
 * @returns ApiResult containing the raw ApiResponse (caller extracts token)
 */
export function loginUser(
  username: string,
  password: string,
): Promise<ApiResult<ApiResponse>> {
  return get<ApiResponse>('/user/login', { username, password });
}

/**
 * Log out the current user session.
 */
export function logoutUser(): Promise<ApiResult<ApiResponse>> {
  return get<ApiResponse>('/user/logout');
}

/**
 * Create a new user (requires auth).
 * @param user — User payload (id is assigned by the server)
 */
export function createUser(user: Omit<User, 'id'>): Promise<ApiResult<ApiResponse>> {
  return post<ApiResponse>('/user', user);
}

/**
 * Get a user by username.
 * @param username — The username to look up
 */
export function getUserByName(username: string): Promise<ApiResult<User>> {
  return get<User>(`/user/${encodeURIComponent(username)}`);
}

/**
 * Update a user by username (requires auth).
 * @param username — The username of the user to update
 * @param user     — Updated user payload
 */
export function updateUser(username: string, user: User): Promise<ApiResult<ApiResponse>> {
  return put<ApiResponse>(`/user/${encodeURIComponent(username)}`, user);
}

/**
 * Delete a user by username (requires auth).
 * @param username — The username to delete
 */
export function deleteUser(username: string): Promise<ApiResult<ApiResponse>> {
  return del<ApiResponse>(`/user/${encodeURIComponent(username)}`);
}
