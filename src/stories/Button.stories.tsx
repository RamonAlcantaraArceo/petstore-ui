import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components/atoms/Button';
import { useTranslation } from '../i18n';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Basic button component with multiple variants, sizes, and comprehensive accessibility features. Supports primary, secondary, and danger color schemes with full internationalization support.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'focus-order-semantics', enabled: true },
          { id: 'keyboard-navigation', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'aria-allowed-attr', enabled: true }
        ]
      },
      manual: false
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Visual style variant of the button'
    },
    size: {
      control: 'select', 
      options: ['small', 'medium', 'large'],
      description: 'Size of the button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width'
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Button {...args}>
        {t('stories.button.variants.primary')}
      </Button>
    );
  },
  args: {
    variant: 'primary'
  }
};

export const Secondary: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Button {...args}>
        {t('stories.button.variants.secondary')}
      </Button>
    );
  },
  args: {
    variant: 'secondary'
  }
};

export const Danger: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Button {...args}>
        {t('stories.button.variants.danger')}
      </Button>
    );
  },
  args: {
    variant: 'danger'
  }
};

export const Small: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Button {...args}>
        {t('stories.button.sizes.small')}
      </Button>
    );
  },
  args: {
    variant: 'primary',
    size: 'small'
  }
};

export const Medium: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Button {...args}>
        {t('stories.button.sizes.medium')}
      </Button>
    );
  },
  args: {
    variant: 'primary',
    size: 'medium'
  }
};

export const Large: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Button {...args}>
        {t('stories.button.sizes.large')}
      </Button>
    );
  },
  args: {
    variant: 'primary',
    size: 'large'
  }
};

export const Disabled: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Button {...args}>
        {t('stories.button.states.disabled')}
      </Button>
    );
  },
  args: {
    variant: 'primary',
    disabled: true
  }
};

export const Loading: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Button {...args}>
        {t('stories.button.states.loading')}
      </Button>
    );
  },
  args: {
    variant: 'primary',
    loading: true
  }
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => {
    const { t } = useTranslation();
    return (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary">
          {t('stories.button.variants.primary')}
        </Button>
        <Button variant="secondary">
          {t('stories.button.variants.secondary')}
        </Button>
        <Button variant="danger">
          {t('stories.button.variants.danger')}
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows all button variants in a single view for easy comparison.'
      }
    }
  }
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => {
    const { t } = useTranslation();
    return (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="primary" size="small">
          {t('stories.button.sizes.small')}
        </Button>
        <Button variant="primary" size="medium">
          {t('stories.button.sizes.medium')}
        </Button>
        <Button variant="primary" size="large">
          {t('stories.button.sizes.large')}
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all available button sizes.'
      }
    }
  }
};

export const AccessibilityShowcase: Story = {
  name: 'Accessibility Features',
  render: () => {
    const { t } = useTranslation();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>
            {t('stories.button.accessibility.title')}
          </h3>
          <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
            {t('stories.button.accessibility.description')}
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button 
            variant="primary"
            onClick={() => alert('Button clicked!')}
            announceOnAction="Button action completed successfully"
          >
            {t('stories.button.examples.clickMe')}
          </Button>
          
          <Button 
            variant="secondary"
            disabled
            aria-label={t('components.button.ariaLabel', { content: t('stories.button.states.disabled') })}
          >
            {t('stories.button.states.disabled')}
          </Button>
          
          <Button 
            variant="danger"
            loading
            aria-label={t('components.button.ariaLabelLoading', { content: t('stories.button.examples.deleteAccount') })}
          >
            {t('stories.button.examples.deleteAccount')}
          </Button>
        </div>
        
        <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Keyboard Navigation</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <li>Tab: Navigate between buttons</li>
            <li>Enter/Space: Activate button</li>
            <li>All buttons have focus indicators and screen reader support</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates comprehensive accessibility features including ARIA labels, keyboard navigation, and screen reader support.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'focus-order-semantics', enabled: true },
          { id: 'keyboard-navigation', enabled: true },
          { id: 'button-name', enabled: true }
        ]
      }
    }
  }
};

export const InternationalizationDemo: Story = {
  name: 'Internationalization Demo',
  render: () => {
    const { t, locale } = useTranslation();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>
            Current Locale: {locale === 'chef' ? 'Swedish Chef (Pseudo)' : 'English'}
          </h3>
          <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
            Switch the locale using the toolbar above to see text expansion and character set testing.
          </p>
        </div>
        
        <div style={{ display: 'grid', grid: 'auto / 1fr 1fr', gap: '1rem' }}>
          <Button variant="primary">
            {t('components.button.submit')}
          </Button>
          <Button variant="secondary">
            {t('components.button.cancel')}
          </Button>
          <Button variant="danger">
            {t('components.button.delete')}
          </Button>
          <Button variant="primary" loading>
            {t('components.button.save')}
          </Button>
        </div>
        
        <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>
            {locale === 'chef' ? 'Børk Børk Testing!' : 'Localization Testing'}
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <li>{locale === 'chef' ? 'Çhäräçtër ëxpäñsïøñ (~30%) tëstïñg' : 'Character expansion (~30%) testing'}</li>
            <li>{locale === 'chef' ? 'Ïñtërnätïøñäl çhäräçtërs (ü, ß, ñ, ç)' : 'International characters (ü, ß, ñ, ç)'}</li>
            <li>{locale === 'chef' ? 'Äüt ømätïç ÄRÏÄ läßël üpdätës' : 'Automatic ARIA label updates'}</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates internationalization features with automatic text expansion testing and character set validation.'
      }
    }
  }
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
    children: 'Full Width Button'
  },
  parameters: {
    layout: 'padded'
  }
};

export const AllVariantsComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all button variants side by side.'
      }
    }
  }
};