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
});
