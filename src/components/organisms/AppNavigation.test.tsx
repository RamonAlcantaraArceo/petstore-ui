import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { LocaleProvider } from '../../i18n';
import { AppNavigation } from './AppNavigation';

function renderWithLocale(ui: React.ReactElement) {
  return render(<LocaleProvider locale="en">{ui}</LocaleProvider>);
}

describe('AppNavigation', () => {
  afterEach(() => {
    delete (window as Window & { __RUNTIME_CONFIG__?: Record<string, string> }).__RUNTIME_CONFIG__;
  });

  it('shows local fallback build metadata when runtime config is missing', () => {
    const { container } = renderWithLocale(
      <AppNavigation
        activeApp="pets"
        onNavigate={() => {}}
        isLoggedIn={false}
        onLogin={() => {}}
        onLogout={() => {}}
      />,
    );

    const infoIcon = Array.from(container.querySelectorAll('span')).find(
      (node) => node.textContent?.trim() === 'i',
    );

    expect(infoIcon).toBeDefined();
    expect(infoIcon?.getAttribute('title')).toBe('VERSION: local\nGIT_SHA: N/A\nBUILD_DATE: N/A');
  });

  it('shows build metadata from runtime config', () => {
    (window as Window & { __RUNTIME_CONFIG__?: Record<string, string> }).__RUNTIME_CONFIG__ = {
      VERSION: '1.2.3',
      GIT_SHA: 'abc1234',
      BUILD_DATE: '2026-05-12T18:00:00Z',
    };

    const { container } = renderWithLocale(
      <AppNavigation
        activeApp="pets"
        onNavigate={() => {}}
        isLoggedIn={false}
        onLogin={() => {}}
        onLogout={() => {}}
      />,
    );

    const infoIcon = Array.from(container.querySelectorAll('span')).find(
      (node) => node.textContent?.trim() === 'i',
    );

    expect(infoIcon).toBeDefined();
    expect(infoIcon?.getAttribute('title')).toBe(
      'VERSION: 1.2.3\nGIT_SHA: abc1234\nBUILD_DATE: 2026-05-12T18:00:00Z',
    );
  });

  it('calls onLogout when sign out button is clicked for authenticated users', () => {
    const onLogout = vi.fn(() => {});

    const { container } = renderWithLocale(
      <AppNavigation
        activeApp="pets"
        onNavigate={() => {}}
        isLoggedIn
        username="ramon"
        onLogin={() => {}}
        onLogout={onLogout}
      />,
    );

    const signOutButton = Array.from(container.querySelectorAll('button')).find((button) =>
      button.textContent?.toLowerCase().includes('sign out'),
    );

    expect(signOutButton).toBeDefined();
    signOutButton?.click();
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
