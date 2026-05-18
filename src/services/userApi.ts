/**
 * User API Service
 *
 * Typed functions for the Petstore `/user` endpoints.
 * @see https://petstore.swagger.io/#/user
 */

import type { User, ApiResponse, ApiResult } from './types';
import { get, post, put, del } from './apiClient';

type ApiUser = {
  id?: number;
  username?: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string;
  password?: string;
  phone?: string;
  user_status?: number | null;
  firstName?: string;
  lastName?: string;
  userStatus?: number;
};

/**
 * Convert User object from camelCase (TypeScript interface) to snake_case (API format)
 * Maps: firstName → first_name, lastName → last_name, userStatus → user_status
 *
 * @param user — User object in camelCase format
 * @returns User object in snake_case format for API transmission
 */
function convertUserToApiFormat(user: User | Omit<User, 'id'>): Record<string, unknown> {
  const hasId = 'id' in user && user.id;
  const payload: Record<string, unknown> = {
    id: hasId ? user.id : undefined,
    username: user.username,
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    password: user.password,
    phone: user.phone,
    user_status: user.userStatus,
  };

  if (!hasId) {
    delete payload.id;
  }

  return payload;
}

/**
 * Convert API user payload from snake_case to frontend camelCase.
 * Also tolerates already-camelCase fields to keep behavior resilient.
 */
function convertApiUserToFrontendFormat(user: ApiUser): User {
  return {
    id: user.id ?? 0,
    username: user.username ?? '',
    firstName: user.first_name ?? user.firstName ?? '',
    lastName: user.last_name ?? user.lastName ?? '',
    email: user.email ?? '',
    password: user.password ?? '',
    phone: user.phone ?? '',
    userStatus: user.user_status ?? user.userStatus ?? 0,
  };
}

/**
 * Log in a user. On success the API returns a session token embedded in the
 * `message` field of the response (format: `"logged in user session:<token>"`).
 *
 * @param username — Registered username
 * @param password — User password
 * @returns ApiResult containing the raw ApiResponse (caller extracts token)
 */
export function loginUser(username: string, password: string): Promise<ApiResult<ApiResponse>> {
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
  const apiPayload = convertUserToApiFormat(user);
  return post<ApiResponse>('/user', apiPayload);
}

/**
 * Get a user by username.
 * @param username — The username to look up
 */
export function getUserByName(username: string): Promise<ApiResult<User>> {
  return get<ApiUser>(`/user/${encodeURIComponent(username)}`).then((result) => {
    if (!result.data) {
      return result;
    }

    return {
      data: convertApiUserToFrontendFormat(result.data),
      error: null,
    };
  });
}

/**
 * Update a user by username (requires auth).
 * @param username — The username of the user to update
 * @param user     — Updated user payload
 */
export function updateUser(username: string, user: User): Promise<ApiResult<ApiResponse>> {
  const apiPayload = convertUserToApiFormat(user);
  return put<ApiResponse>(`/user/${encodeURIComponent(username)}`, apiPayload);
}

/**
 * Delete a user by username (requires auth).
 * @param username — The username to delete
 */
export function deleteUser(username: string): Promise<ApiResult<ApiResponse>> {
  return del<ApiResponse>(`/user/${encodeURIComponent(username)}`);
}
