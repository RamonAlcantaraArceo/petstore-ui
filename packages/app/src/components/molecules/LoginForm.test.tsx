import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { LocaleProvider } from '@petstore-ui/atoms';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '../../services/testSetup';
import { LoginForm } from './LoginForm';

function renderLoginForm(onLogin: (username: string, password: string) => void) {
  return render(
    <LocaleProvider locale="en">
      <LoginForm onLogin={onLogin} />
    </LocaleProvider>,
  );
}

describe('LoginForm', () => {
  afterEach(() => {
    if (window.__RUNTIME_CONFIG__) {
      window.__RUNTIME_CONFIG__.USE_POST_LOGIN_ENDPOINT = false;
    }
  });

  it('renders invalid email errors in the modal alert element for the POST flow', () => {
    window.__RUNTIME_CONFIG__ = {
      ...window.__RUNTIME_CONFIG__,
      USE_POST_LOGIN_ENDPOINT: true,
    };
    const onLogin = vi.fn();
    renderLoginForm(onLogin);

    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'dd' } });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/ }));

    expect(screen.getByRole('alert').textContent).toBe('Enter a valid email address.');
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('submits a valid email and password through the POST flow', () => {
    window.__RUNTIME_CONFIG__ = {
      ...window.__RUNTIME_CONFIG__,
      USE_POST_LOGIN_ENDPOINT: true,
    };
    const onLogin = vi.fn();
    renderLoginForm(onLogin);

    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: 'person@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: 'authpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/ }));

    expect(onLogin).toHaveBeenCalledWith('person@example.com', 'authpass');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('preserves the legacy username flow when the flag is disabled', () => {
    const onLogin = vi.fn();
    renderLoginForm(onLogin);

    fireEvent.change(screen.getByLabelText(/Username/), { target: { value: 'legacy-user' } });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: 'legacy-pass' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/ }));

    expect(screen.queryByLabelText(/Email/)).toBeNull();
    expect(onLogin).toHaveBeenCalledWith('legacy-user', 'legacy-pass');
  });

  it('renders server errors in the same modal alert element', () => {
    renderLoginForm(vi.fn());

    render(
      <LocaleProvider locale="en">
        <LoginForm onLogin={vi.fn()} error="Invalid username or password. Please try again." />
      </LocaleProvider>,
    );

    expect(screen.getByRole('alert').textContent).toBe(
      'Invalid username or password. Please try again.',
    );
  });
});
