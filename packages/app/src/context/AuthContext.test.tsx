import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getYApiToken } from '../services/apiClient';
import { loginUser, logoutUser } from '../services/userApi';
import { AuthProvider, useAuthContext } from './AuthContext';

vi.mock('../services/userApi', () => ({
  loginUser: vi.fn(),
  logoutUser: vi.fn(),
}));

function AuthProbe() {
  const { isLoggedIn, username, login, logout } = useAuthContext();
  return (
    <>
      <span>{isLoggedIn ? `signed-in:${username}` : 'signed-out'}</span>
      <button type="button" onClick={() => void login('person@example.com', 'authpass')}>
        Login
      </button>
      <button type="button" onClick={() => void logout()}>
        Logout
      </button>
    </>
  );
}

describe('AuthProvider', () => {
  afterEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it('establishes and clears a session from the POST login access token response', async () => {
    vi.mocked(loginUser).mockResolvedValue({
      data: {
        access_token: 'access-token',
        token_type: 'bearer',
        user: {
          id: 'user-id',
          email: 'person@example.com',
          username: 'person@example.com',
        },
      },
      error: null,
    });
    vi.mocked(logoutUser).mockResolvedValue({
      data: { code: 200, type: 'success', message: 'logged out' },
      error: null,
    });
    render(
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await screen.findByText('signed-in:person@example.com');
    expect(loginUser).toHaveBeenCalledWith('person@example.com', 'authpass');
    expect(getYApiToken()).toBe('access-token');
    expect(JSON.parse(sessionStorage.getItem('petstore-ui-auth') ?? '{}')).toMatchObject({
      isLoggedIn: true,
      username: 'person@example.com',
      token: 'access-token',
    });

    fireEvent.click(screen.getByRole('button', { name: 'Logout' }));
    await waitFor(() => expect(screen.getByText('signed-out')).toBeDefined());
    expect(logoutUser).toHaveBeenCalledTimes(1);
    expect(getYApiToken()).toBeNull();
    expect(sessionStorage.getItem('petstore-ui-auth')).toBeNull();
  });
});
