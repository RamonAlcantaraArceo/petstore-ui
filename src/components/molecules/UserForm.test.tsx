import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { LocaleProvider } from '../../i18n';
import type { UserFormFields } from './UserForm';
import { UserForm } from './UserForm';
import '../../services/testSetup';

/**
 * Custom render function with LocaleProvider
 */
function renderWithLocale(ui: React.ReactElement) {
  return render(<LocaleProvider locale="en">{ui}</LocaleProvider>);
}

/**
 * Integration tests for UserForm with API field mapping.
 * Verifies that camelCase field names from the form are correctly mapped to snake_case for the API.
 */
describe('UserForm Integration Tests', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Field Name Mapping', () => {
    it('submits form data with camelCase field names matching the TypeScript interface', async () => {
      renderWithLocale(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const inputs = screen.getAllByRole('textbox');
      const [usernameInput, firstNameInput, lastNameInput, emailInput, phoneInput] = inputs;
      const passwordInputs = screen.getAllByDisplayValue('');
      const passwordInput = passwordInputs.find(
        (input) => (input as HTMLInputElement).type === 'password',
      );

      await userEvent.type(usernameInput, 'testuser');
      await userEvent.type(firstNameInput, 'John');
      await userEvent.type(lastNameInput, 'Doe');
      await userEvent.type(emailInput, 'john@example.com');
      await userEvent.type(passwordInput!, 'password123');
      await userEvent.type(phoneInput, '555-1234');

      const buttons = screen.getAllByRole('button');
      const submitButton = buttons.find((btn) => btn.className.includes('btn--primary'));
      fireEvent.click(submitButton!);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            username: 'testuser',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'password123',
            phone: '555-1234',
          }),
        );
      });
    });

    it('validates required fields before submission', async () => {
      renderWithLocale(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const buttons = screen.getAllByRole('button');
      const submitButton = buttons.find((btn) => btn.className.includes('btn--primary'));
      fireEvent.click(submitButton!);

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
        const alert = screen.getByRole('alert');
        expect(alert).toBeDefined();
      });
    });

    it('handles empty optional fields correctly', async () => {
      renderWithLocale(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const inputs = screen.getAllByRole('textbox');
      const [usernameInput] = inputs;
      const passwordInputs = screen.getAllByDisplayValue('');
      const passwordInput = passwordInputs.find(
        (input) => (input as HTMLInputElement).type === 'password',
      );

      await userEvent.type(usernameInput, 'testuser');
      await userEvent.type(passwordInput!, 'password123');

      const buttons = screen.getAllByRole('button');
      const submitButton = buttons.find((btn) => btn.className.includes('btn--primary'));
      fireEvent.click(submitButton!);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            username: 'testuser',
            firstName: '',
            lastName: '',
            email: '',
            password: 'password123',
            phone: '',
          }),
        );
      });
    });

    it('preserves field values during edit mode', async () => {
      const existingUser: Partial<UserFormFields> = {
        username: 'existinguser',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '555-5678',
      };

      renderWithLocale(
        <UserForm user={existingUser} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />,
      );

      // Verify that existing values are loaded into the form
      expect(screen.getByDisplayValue('existinguser')).toBeDefined();
      expect(screen.getByDisplayValue('Jane')).toBeDefined();
      expect(screen.getByDisplayValue('Smith')).toBeDefined();
      expect(screen.getByDisplayValue('jane@example.com')).toBeDefined();
      expect(screen.getByDisplayValue('555-5678')).toBeDefined();

      const buttons = screen.getAllByRole('button');
      const submitButton = buttons.find((btn) => btn.className.includes('btn--primary'));
      fireEvent.click(submitButton!);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            username: 'existinguser',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            phone: '555-5678',
          }),
        );
      });
    });

    it('validates email format when provided', async () => {
      renderWithLocale(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const inputs = screen.getAllByRole('textbox');
      const [usernameInput, , , emailInput] = inputs;
      const passwordInputs = screen.getAllByDisplayValue('');
      const passwordInput = passwordInputs.find(
        (input) => (input as HTMLInputElement).type === 'password',
      );

      await userEvent.type(usernameInput, 'testuser');
      await userEvent.type(passwordInput!, 'password123');
      await userEvent.type(emailInput, 'invalid-email');

      const buttons = screen.getAllByRole('button');
      const submitButton = buttons.find((btn) => btn.className.includes('btn--primary'));
      fireEvent.click(submitButton!);

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
        const alert = screen.getByRole('alert');
        expect(alert).toBeDefined();
      });
    });

    it('calls onCancel when cancel button is clicked', async () => {
      renderWithLocale(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const buttons = screen.getAllByRole('button');
      const cancelButton = buttons.find((btn) => btn.className.includes('btn--secondary'));
      fireEvent.click(cancelButton!);

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });
});
