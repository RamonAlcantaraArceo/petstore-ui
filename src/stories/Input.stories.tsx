import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../components/atoms/Input';
import { useTranslation } from '../i18n';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Form input component with validation states, comprehensive accessibility features, and full internationalization support. Supports text, email, password, and search input types with validation feedback.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'label', enabled: true },
          { id: 'form-field-multiple-labels', enabled: true },
          { id: 'aria-input-field-name', enabled: true }
        ]
      },
      manual: false
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'number', 'tel', 'url'],
      description: 'HTML input type'
    },
    validationState: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Visual validation state of the input'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the input'
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the input'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when input is empty'
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input'
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed when validationState is error'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled'
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input should take full width'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// BASIC VARIANTS
// =============================================================================

export const Default: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Input
        {...args}
        label={t('stories.input.variants.text')}
        placeholder={t('components.input.placeholder')}
      />
    );
  },
  args: {
    type: 'text',
    validationState: 'default'
  }
};

export const TextInput: Story = {
  name: 'Text Input',
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Input
        {...args}
        label={t('stories.input.examples.firstName')}
        placeholder="Enter your first name..."
      />
    );
  },
  args: {
    type: 'text',
    validationState: 'default'
  }
};

export const EmailInput: Story = {
  name: 'Email Input',
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Input
        {...args}
        label={t('stories.input.examples.email')}
        placeholder={t('components.input.emailPlaceholder')}
      />
    );
  },
  args: {
    type: 'email',
    validationState: 'default'
  }
};

export const PasswordInput: Story = {
  name: 'Password Input',
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Input
        {...args}
        label={t('stories.input.examples.password')}
        placeholder={t('components.input.passwordPlaceholder')}
      />
    );
  },
  args: {
    type: 'password',
    validationState: 'default'
  }
};

export const SearchInput: Story = {
  name: 'Search Input',
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Input
        {...args}
        label={t('stories.input.variants.search')}
        placeholder={t('components.input.searchPlaceholder')}
      />
    );
  },
  args: {
    type: 'search',
    validationState: 'default'
  }
};

// =============================================================================
// SIZE VARIANTS
// =============================================================================

export const Small: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Input
        {...args}
        label="Small Input"
        placeholder={t('components.input.placeholder')}
      />
    );
  },
  args: {
    size: 'small',
    validationState: 'default'
  }
};

export const Medium: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Input
        {...args}
        label="Medium Input"
        placeholder={t('components.input.placeholder')}
      />
    );
  },
  args: {
    size: 'medium',
    validationState: 'default'
  }
};

export const Large: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Input
        {...args}
        label="Large Input"
        placeholder={t('components.input.placeholder')}
      />
    );
  },
  args: {
    size: 'large',
    validationState: 'default'
  }
};

// =============================================================================
// VALIDATION STATES
// =============================================================================

export const SuccessState: Story = {
  name: 'Success State',
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Input
        {...args}
        label={t('stories.input.examples.email')}
        placeholder={t('components.input.emailPlaceholder')}
        helperText="Email address is valid"
        defaultValue="user@example.com"
      />
    );
  },
  args: {
    type: 'email',
    validationState: 'success'
  }
};

export const WarningState: Story = {
  name: 'Warning State',
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Input
        {...args}
        label={t('stories.input.examples.password')}
        placeholder={t('components.input.passwordPlaceholder')}
        helperText="Password is weak. Consider adding numbers and symbols."
        defaultValue="password123"
      />
    );
  },
  args: {
    type: 'password',
    validationState: 'warning'
  }
};

export const ErrorState: Story = {
  name: 'Error State',
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Input
        {...args}
        label={t('stories.input.examples.email')}
        placeholder={t('components.input.emailPlaceholder')}
        errorMessage={t('components.input.invalid')}
        defaultValue="invalid-email"
      />
    );
  },
  args: {
    type: 'email',
    validationState: 'error'
  }
};

// =============================================================================
// COMPONENT STATES
// =============================================================================

export const Required: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Input
        {...args}
        label={t('stories.input.states.required')}
        placeholder={t('components.input.placeholder')}
        helperText={t('components.input.required')}
      />
    );
  },
  args: {
    required: true,
    validationState: 'default'
  }
};

export const Disabled: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Input
        {...args}
        label={t('stories.input.states.disabled')}
        placeholder={t('components.input.placeholder')}
        defaultValue="Disabled content"
      />
    );
  },
  args: {
    disabled: true,
    validationState: 'default'
  }
};

export const WithHelperText: Story = {
  name: 'With Helper Text',
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Input
        {...args}
        label={t('stories.input.examples.password')}
        placeholder={t('components.input.passwordPlaceholder')}
        helperText="Password must be at least 8 characters with one uppercase letter"
      />
    );
  },
  args: {
    type: 'password',
    validationState: 'default'
  }
};

export const FullWidth: Story = {
  name: 'Full Width',
  render: (args) => {
    const { t } = useTranslation();
    return (
      <div style={{ width: '400px' }}>
        <Input
          {...args}
          label={t('stories.input.examples.email')}
          placeholder={t('components.input.emailPlaceholder')}
        />
      </div>
    );
  },
  args: {
    type: 'email',
    fullWidth: true,
    validationState: 'default'
  },
  parameters: {
    layout: 'padded'
  }
};

// =============================================================================
// COMPARISON STORIES
// =============================================================================

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => {
    const { t } = useTranslation();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
        <Input
          size="small"
          label="Small Input"
          placeholder={t('components.input.placeholder')}
        />
        <Input
          size="medium"
          label="Medium Input"
          placeholder={t('components.input.placeholder')}
        />
        <Input
          size="large"
          label="Large Input"
          placeholder={t('components.input.placeholder')}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all available input sizes for easy comparison.'
      }
    }
  }
};

export const AllValidationStates: Story = {
  name: 'All Validation States',
  render: () => {
    const { t } = useTranslation();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
        <Input
          validationState="default"
          label="Default State"
          placeholder={t('components.input.placeholder')}
        />
        <Input
          validationState="success"
          label="Success State"
          placeholder={t('components.input.placeholder')}
          helperText="Input is valid"
          defaultValue="Valid input"
        />
        <Input
          validationState="warning"
          label="Warning State"
          placeholder={t('components.input.placeholder')}
          helperText="Consider improving this value"
          defaultValue="Could be better"
        />
        <Input
          validationState="error"
          label="Error State"
          placeholder={t('components.input.placeholder')}
          errorMessage={t('components.input.invalid')}
          defaultValue="Invalid"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows all validation states with appropriate feedback messages.'
      }
    }
  }
};

export const AllInputTypes: Story = {
  name: 'All Input Types',
  render: () => {
    const { t } = useTranslation();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
        <Input
          type="text"
          label={t('stories.input.variants.text')}
          placeholder="Enter text..."
        />
        <Input
          type="email"
          label={t('stories.input.variants.email')}
          placeholder={t('components.input.emailPlaceholder')}
        />
        <Input
          type="password"
          label={t('stories.input.variants.password')}
          placeholder={t('components.input.passwordPlaceholder')}
        />
        <Input
          type="search"
          label={t('stories.input.variants.search')}
          placeholder={t('components.input.searchPlaceholder')}
        />
        <Input
          type="number"
          label="Number Input"
          placeholder="Enter a number..."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all supported input types.'
      }
    }
  }
};

// =============================================================================
// ACCESSIBILITY SHOWCASE
// =============================================================================

export const AccessibilityShowcase: Story = {
  name: 'Accessibility Features',
  render: () => {
    const { t } = useTranslation();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '400px' }}>
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>
            Accessible Form Inputs
          </h3>
          <p style={{ marginBottom: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
            All inputs include proper ARIA labels, error announcements, and keyboard navigation support.
          </p>
        </div>
        
        <Input
          label={t('stories.input.examples.firstName')}
          placeholder="Enter your first name"
          helperText="Your given name as it appears on official documents"
          required
        />
        
        <Input
          type="email"
          label={t('stories.input.examples.email')}
          placeholder={t('components.input.emailPlaceholder')}
          validationState="error"
          errorMessage={t('components.input.invalid')}
          defaultValue="not-an-email"
          aria-describedby="email-error"
        />
        
        <Input
          type="password"
          label={t('stories.input.examples.password')}
          placeholder={t('components.input.passwordPlaceholder')}
          validationState="warning"
          helperText="Password should contain at least 8 characters"
          required
        />
        
        <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Keyboard Navigation</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <li>Tab: Navigate between input fields</li>
            <li>All inputs have associated labels for screen readers</li>
            <li>Error states are announced for assistive technology</li>
            <li>Required fields are programmatically indicated</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates comprehensive accessibility features including ARIA labels, error announcements, and proper form field associations.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'label', enabled: true },
          { id: 'aria-input-field-name', enabled: true }
        ]
      }
    }
  }
};

// =============================================================================
// INTERNATIONALIZATION DEMO
// =============================================================================

export const InternationalizationDemo: Story = {
  name: 'Internationalization Demo',
  render: () => {
    const { t, locale } = useTranslation();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '400px' }}>
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>
            Current Locale: {locale === 'chef' ? 'Swedish Chef (Pseudo)' : 'English'}
          </h3>
          <p style={{ marginBottom: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
            Switch the locale using the toolbar above to see text expansion and character set testing.
          </p>
        </div>
        
        <Input
          label={t('stories.input.variants.text')}
          placeholder={t('components.input.placeholder')}
        />
        
        <Input
          type="email"
          label={t('stories.input.variants.email')}
          placeholder={t('components.input.emailPlaceholder')}
          helperText={t('components.form.fieldRequired')}
          required
        />
        
        <Input
          type="password"
          label={t('stories.input.variants.password')}
          placeholder={t('components.input.passwordPlaceholder')}
          validationState="error"
          errorMessage={t('components.input.invalid')}
        />
        
        <Input
          type="search"
          label={t('stories.input.variants.search')}
          placeholder={t('components.input.searchPlaceholder')}
        />
        
        <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>
            {locale === 'chef' ? 'Børk Børk Testing!' : 'Localization Testing'}
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <li>{locale === 'chef' ? 'Läbëls äñd pläçëhøldërs trañslatëd' : 'Labels and placeholders translated'}</li>
            <li>{locale === 'chef' ? 'Érrør mëssägës løçälïzëd' : 'Error messages localized'}</li>
            <li>{locale === 'chef' ? 'Hëlpër tëxt süppørt' : 'Helper text support'}</li>
            <li>{locale === 'chef' ? 'ÄRIA läbëls äütø-üpdätë' : 'ARIA labels auto-update'}</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates internationalization features with automatic text expansion testing and character set validation for form inputs.'
      }
    }
  }
};

// =============================================================================
// FORM EXAMPLE
// =============================================================================

export const FormExample: Story = {
  name: 'Form Example',
  render: () => {
    const { t } = useTranslation();
    return (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '350px' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Contact Form</h3>
        
        <Input
          label={t('stories.input.examples.firstName')}
          placeholder="Enter your first name"
          required
        />
        
        <Input
          label={t('stories.input.examples.lastName')}
          placeholder="Enter your last name"
          required
        />
        
        <Input
          type="email"
          label={t('stories.input.examples.email')}
          placeholder={t('components.input.emailPlaceholder')}
          required
        />
        
        <Input
          type="tel"
          label="Phone Number"
          placeholder="(555) 123-4567"
        />
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            {t('components.button.submit')}
          </button>
          <button
            type="button"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            {t('components.button.cancel')}
          </button>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A complete form example demonstrating how Input components work together in a real-world scenario.'
      }
    },
    layout: 'padded'
  }
};
