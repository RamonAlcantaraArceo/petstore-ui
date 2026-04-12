import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { loginUser, logoutUser } from '../services/userApi';
import { setApiToken, clearApiToken } from '../services/apiClient';

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  token: string | null;
}

interface LoginResult {
  success: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const STORAGE_KEY = 'petstore-ui-auth';

const AuthContext = createContext<AuthContextValue | null>(null);

function parseTokenFromLoginPayload(payload: unknown): string | null {
  if (typeof payload === 'string') {
    const index = payload.indexOf('logged in user session:');
    if (index >= 0) {
      return payload.slice(index + 'logged in user session:'.length).trim() || null;
    }
    return payload.trim() || null;
  }

  if (payload && typeof payload === 'object') {
    const directToken =
      (
        payload as {
          token?: unknown;
          accessToken?: unknown;
          sessionToken?: unknown;
          api_key?: unknown;
        }
      ).token ??
      (payload as { accessToken?: unknown }).accessToken ??
      (payload as { sessionToken?: unknown }).sessionToken ??
      (payload as { api_key?: unknown }).api_key;

    if (typeof directToken === 'string' && directToken.trim()) {
      return directToken.trim();
    }

    const maybeMessage = (payload as { message?: unknown }).message;
    if (typeof maybeMessage === 'string') {
      const index = maybeMessage.indexOf('logged in user session:');
      if (index >= 0) {
        return maybeMessage.slice(index + 'logged in user session:'.length).trim() || null;
      }
      return maybeMessage.trim() || null;
    }
  }

  return null;
}

function getStoredAuthState(): AuthState {
  if (typeof window === 'undefined') {
    return { isLoggedIn: false, username: null, token: null };
  }

  try {
    const rawValue = sessionStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return { isLoggedIn: false, username: null, token: null };
    }

    const parsed = JSON.parse(rawValue) as Partial<AuthState>;
    if (!parsed.isLoggedIn || !parsed.username || !parsed.token) {
      return { isLoggedIn: false, username: null, token: null };
    }

    return {
      isLoggedIn: true,
      username: parsed.username,
      token: parsed.token,
    };
  } catch {
    return { isLoggedIn: false, username: null, token: null };
  }
}

function persistAuthState(value: AuthState): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (!value.isLoggedIn || !value.username || !value.token) {
    sessionStorage.removeItem(STORAGE_KEY);
    return;
  }

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [authState, setAuthState] = useState<AuthState>(() => getStoredAuthState());

  useEffect(() => {
    if (authState.token) {
      setApiToken(authState.token);
    } else {
      clearApiToken();
    }
    persistAuthState(authState);
  }, [authState]);

  const login = useCallback(async (username: string, password: string): Promise<LoginResult> => {
    const result = await loginUser(username, password);
    if (result.error || !result.data) {
      return { success: false, error: result.error ?? 'Login failed' };
    }

    const token = parseTokenFromLoginPayload(result.data);
    if (!token) {
      return { success: false, error: 'Missing session token in login response' };
    }

    setAuthState({
      isLoggedIn: true,
      username,
      token,
    });

    return { success: true, error: null };
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    await logoutUser();
    setAuthState({ isLoggedIn: false, username: null, token: null });
  }, []);

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      ...authState,
      login,
      logout,
    }),
    [authState, login, logout],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
