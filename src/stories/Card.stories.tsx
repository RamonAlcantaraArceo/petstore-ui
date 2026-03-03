import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '../components/atoms/Card';
import { useTranslation } from '../i18n';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flexible card component with elevation system, comprehensive accessibility features, and full internationalization support. Provides visual hierarchy through shadow levels and supports interactive states with keyboard navigation.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'region', enabled: true },
          { id: 'aria-allowed-attr', enabled: true }
        ]
      },
      manual: false
    }
  },
  argTypes: {
    elevation: {
      control: 'select',
      options: ['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl'],
      description: 'Shadow elevation level for visual hierarchy'
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Internal padding size'
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Border radius size'
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error'],
      description: 'Background color variant'
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is interactive (clickable/hoverable)'
    },
    selected: {
      control: 'boolean',
      description: 'Whether the card is currently selected/active'
    },
    border: {
      control: 'boolean',
      description: 'Whether to show a border'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the card should take full width'
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler for interactive cards'
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
      <Card {...args}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>
          {t('stories.card.examples.title')}
        </h3>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
          {t('stories.card.examples.content')}
        </p>
      </Card>
    );
  },
  args: {
    elevation: 'base',
    padding: 'md',
    rounded: 'lg',
    variant: 'default'
  }
};

export const BasicCard: Story = {
  name: 'Basic Card',
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Card {...args}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>
          {t('stories.card.variants.basic')}
        </h3>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
          A simple card with basic styling and default settings.
        </p>
      </Card>
    );
  },
  args: {
    elevation: 'sm',
    padding: 'md',
    rounded: 'lg'
  }
};

export const PrimaryCard: Story = {
  name: 'Primary Variant',
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Card {...args}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: '#1e40af' }}>
          Primary Card
        </h3>
        <p style={{ margin: 0, color: '#3b82f6', fontSize: '0.875rem' }}>
          {t('stories.card.examples.content')}
        </p>
      </Card>
    );
  },
  args: {
    variant: 'primary',
    elevation: 'md',
    padding: 'lg',
    rounded: 'lg'
  }
};

export const SecondaryCard: Story = {
  name: 'Secondary Variant',
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Card {...args}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: '#374151' }}>
          Secondary Card
        </h3>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
          {t('stories.card.examples.content')}
        </p>
      </Card>
    );
  },
  args: {
    variant: 'secondary',
    elevation: 'md',
    padding: 'lg',
    rounded: 'lg'
  }
};

export const SuccessCard: Story = {
  name: 'Success Variant',
  render: () => (
    <Card variant="success" elevation="md" padding="lg" rounded="lg">
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: '#065f46' }}>
        Success!
      </h3>
      <p style={{ margin: 0, color: '#047857', fontSize: '0.875rem' }}>
        Your action was completed successfully.
      </p>
    </Card>
  ),
  args: {
    variant: 'success'
  }
};

export const WarningCard: Story = {
  name: 'Warning Variant',
  render: () => (
    <Card variant="warning" elevation="md" padding="lg" rounded="lg">
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: '#92400e' }}>
        Warning
      </h3>
      <p style={{ margin: 0, color: '#b45309', fontSize: '0.875rem' }}>
        Please review before proceeding.
      </p>
    </Card>
  ),
  args: {
    variant: 'warning'
  }
};

export const ErrorCard: Story = {
  name: 'Error Variant',
  render: () => (
    <Card variant="error" elevation="md" padding="lg" rounded="lg">
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: '#991b1b' }}>
        Error
      </h3>
      <p style={{ margin: 0, color: '#dc2626', fontSize: '0.875rem' }}>
        Something went wrong. Please try again.
      </p>
    </Card>
  ),
  args: {
    variant: 'error'
  }
};

// =============================================================================
// ELEVATION VARIANTS
// =============================================================================

export const NoElevation: Story = {
  name: 'No Elevation',
  render: (args) => (
    <Card {...args}>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>No Elevation</h3>
      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
        A flat card with no shadow.
      </p>
    </Card>
  ),
  args: {
    elevation: 'none',
    border: true,
    padding: 'md',
    rounded: 'lg'
  }
};

export const SmallElevation: Story = {
  name: 'Small Elevation',
  render: (args) => (
    <Card {...args}>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>Small Shadow</h3>
      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
        Subtle shadow for minimal depth.
      </p>
    </Card>
  ),
  args: {
    elevation: 'sm',
    padding: 'md',
    rounded: 'lg'
  }
};

export const LargeElevation: Story = {
  name: 'Large Elevation',
  render: (args) => (
    <Card {...args}>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>Large Shadow</h3>
      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
        Prominent shadow for elevated content.
      </p>
    </Card>
  ),
  args: {
    elevation: 'lg',
    padding: 'md',
    rounded: 'lg'
  }
};

export const ExtraLargeElevation: Story = {
  name: 'Extra Large Elevation',
  render: (args) => (
    <Card {...args}>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>XL Shadow</h3>
      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
        Maximum shadow for modal-like appearance.
      </p>
    </Card>
  ),
  args: {
    elevation: 'xl',
    padding: 'lg',
    rounded: 'xl'
  }
};

// =============================================================================
// INTERACTIVE STATES
// =============================================================================

export const Interactive: Story = {
  name: 'Interactive Card',
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Card {...args}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>
          {t('stories.card.variants.interactive')}
        </h3>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
          Click or press Enter/Space to interact with this card.
        </p>
      </Card>
    );
  },
  args: {
    interactive: true,
    elevation: 'md',
    padding: 'lg',
    rounded: 'lg',
    announceOnAction: 'Card selected'
  }
};

export const Selected: Story = {
  name: 'Selected State',
  render: (args) => (
    <Card {...args}>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: '#1e40af' }}>
        Selected Card
      </h3>
      <p style={{ margin: 0, color: '#3b82f6', fontSize: '0.875rem' }}>
        This card is currently selected.
      </p>
    </Card>
  ),
  args: {
    interactive: true,
    selected: true,
    elevation: 'md',
    padding: 'lg',
    rounded: 'lg',
    variant: 'primary'
  }
};

export const WithBorder: Story = {
  name: 'With Border',
  render: (args) => (
    <Card {...args}>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>Bordered Card</h3>
      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
        A card with a visible border for definition.
      </p>
    </Card>
  ),
  args: {
    border: true,
    elevation: 'none',
    padding: 'md',
    rounded: 'lg'
  }
};

// =============================================================================
// PADDING VARIANTS
// =============================================================================

export const NoPadding: Story = {
  name: 'No Padding',
  render: () => (
    <Card padding="none" elevation="md" rounded="lg">
      <img
        src="https://picsum.photos/300/150"
        alt="Card image"
        style={{ width: '100%', display: 'block', borderRadius: '8px 8px 0 0' }}
      />
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>Image Card</h3>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
          Card with no padding, useful for media content.
        </p>
      </div>
    </Card>
  )
};

export const SmallPadding: Story = {
  name: 'Small Padding',
  render: () => (
    <Card padding="sm" elevation="md" rounded="lg">
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Compact Card</h3>
      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
        Small padding for compact layouts.
      </p>
    </Card>
  )
};

export const LargePadding: Story = {
  name: 'Large Padding',
  render: () => (
    <Card padding="lg" elevation="md" rounded="lg">
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>Spacious Card</h3>
      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
        Large padding for prominent content areas.
      </p>
    </Card>
  )
};

export const ExtraLargePadding: Story = {
  name: 'Extra Large Padding',
  render: () => (
    <Card padding="xl" elevation="lg" rounded="xl">
      <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.5rem' }}>Hero Card</h3>
      <p style={{ margin: 0, color: '#6b7280', fontSize: '1rem' }}>
        Extra large padding for hero sections and feature highlights.
      </p>
    </Card>
  )
};

// =============================================================================
// COMPARISON STORIES
// =============================================================================

export const AllElevations: Story = {
  name: 'All Elevations',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '800px' }}>
      <Card elevation="none" padding="md" rounded="lg" border>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>None</h4>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.75rem' }}>elevation="none"</p>
      </Card>
      <Card elevation="sm" padding="md" rounded="lg">
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Small</h4>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.75rem' }}>elevation="sm"</p>
      </Card>
      <Card elevation="base" padding="md" rounded="lg">
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Base</h4>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.75rem' }}>elevation="base"</p>
      </Card>
      <Card elevation="md" padding="md" rounded="lg">
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Medium</h4>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.75rem' }}>elevation="md"</p>
      </Card>
      <Card elevation="lg" padding="md" rounded="lg">
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Large</h4>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.75rem' }}>elevation="lg"</p>
      </Card>
      <Card elevation="xl" padding="md" rounded="lg">
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Extra Large</h4>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.75rem' }}>elevation="xl"</p>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Demonstrates all available elevation levels for visual hierarchy comparison.'
      }
    }
  }
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => {
    const { t } = useTranslation();
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '800px' }}>
        <Card variant="default" elevation="md" padding="md" rounded="lg">
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Default</h4>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.75rem' }}>{t('stories.card.examples.content')}</p>
        </Card>
        <Card variant="primary" elevation="md" padding="md" rounded="lg">
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#1e40af' }}>Primary</h4>
          <p style={{ margin: 0, color: '#3b82f6', fontSize: '0.75rem' }}>Primary variant</p>
        </Card>
        <Card variant="secondary" elevation="md" padding="md" rounded="lg">
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Secondary</h4>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.75rem' }}>Secondary variant</p>
        </Card>
        <Card variant="success" elevation="md" padding="md" rounded="lg">
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#065f46' }}>Success</h4>
          <p style={{ margin: 0, color: '#047857', fontSize: '0.75rem' }}>Success variant</p>
        </Card>
        <Card variant="warning" elevation="md" padding="md" rounded="lg">
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#92400e' }}>Warning</h4>
          <p style={{ margin: 0, color: '#b45309', fontSize: '0.75rem' }}>Warning variant</p>
        </Card>
        <Card variant="error" elevation="md" padding="md" rounded="lg">
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#991b1b' }}>Error</h4>
          <p style={{ margin: 0, color: '#dc2626', fontSize: '0.75rem' }}>Error variant</p>
        </Card>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Shows all card color variants for different contexts and states.'
      }
    }
  }
};

export const AllRoundedOptions: Story = {
  name: 'All Rounded Options',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', maxWidth: '900px' }}>
      {(['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl'] as const).map((rounded) => (
        <Card key={rounded} elevation="md" padding="md" rounded={rounded}>
          <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>{rounded}</h4>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.75rem' }}>rounded="{rounded}"</p>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Demonstrates all available border radius options.'
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>
            Accessible Card Components
          </h3>
          <p style={{ marginBottom: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
            Cards include proper ARIA roles, keyboard navigation for interactive cards, and screen reader support.
          </p>
        </div>
        
        <Card 
          elevation="md" 
          padding="lg" 
          rounded="lg"
          aria-label={t('components.card.ariaLabel', { title: 'Static Content' })}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>
            Static Card
          </h3>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
            Non-interactive card with proper ARIA labeling for screen readers.
          </p>
        </Card>
        
        <Card 
          elevation="md" 
          padding="lg" 
          rounded="lg"
          interactive
          announceOnAction="Interactive card selected"
          aria-label={t('components.card.ariaLabel', { title: 'Interactive Option' })}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>
            {t('stories.card.variants.interactive')}
          </h3>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
            Click or use keyboard (Enter/Space) to select this card.
          </p>
        </Card>
        
        <Card 
          elevation="md" 
          padding="lg" 
          rounded="lg"
          interactive
          selected
          variant="primary"
          announceOnAction="Card deselected"
          aria-label="Selected card option"
        >
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: '#1e40af' }}>
            Selected Card
          </h3>
          <p style={{ margin: 0, color: '#3b82f6', fontSize: '0.875rem' }}>
            Visual and programmatic indication of selection state.
          </p>
        </Card>
        
        <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Keyboard Navigation</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <li>Tab: Navigate between interactive cards</li>
            <li>Enter/Space: Activate interactive card</li>
            <li>All cards have proper ARIA labels</li>
            <li>Selection state is announced to screen readers</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Demonstrates comprehensive accessibility features including ARIA labels, keyboard navigation, and screen reader support.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-allowed-attr', enabled: true }
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>
            Current Locale: {locale === 'chef' ? 'Swedish Chef (Pseudo)' : 'English'}
          </h3>
          <p style={{ marginBottom: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
            Switch the locale using the toolbar above to see text expansion and character set testing.
          </p>
        </div>
        
        <Card elevation="md" padding="lg" rounded="lg">
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>
            {t('stories.card.title')}
          </h3>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
            {t('stories.card.description')}
          </p>
        </Card>
        
        <Card elevation="md" padding="lg" rounded="lg" variant="primary">
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: '#1e40af' }}>
            {t('stories.card.variants.basic')}
          </h3>
          <p style={{ margin: 0, color: '#3b82f6', fontSize: '0.875rem' }}>
            {t('stories.card.examples.content')}
          </p>
        </Card>
        
        <Card 
          elevation="md" 
          padding="lg" 
          rounded="lg" 
          interactive
          announceOnAction={locale === 'chef' ? 'Çärd sëlëçtëd - børk børk!' : 'Card selected'}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>
            {t('stories.card.variants.interactive')}
          </h3>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
            {locale === 'chef' ? 'Çlïçk ør prëss Éñtër/Späçë tø ïñtëräçt! Børk børk!' : 'Click or press Enter/Space to interact!'}
          </p>
        </Card>
        
        <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>
            {locale === 'chef' ? 'Børk Børk Testing!' : 'Localization Testing'}
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <li>{locale === 'chef' ? 'Çärd tïtlës äñd çøñtëñt trañslatëd' : 'Card titles and content translated'}</li>
            <li>{locale === 'chef' ? 'ÄRIA läbëls äütø-üpdätë før äççëssïbïlïty' : 'ARIA labels auto-update for accessibility'}</li>
            <li>{locale === 'chef' ? 'Äçtïøñ äññøüñçëmëñts løçälïzëd' : 'Action announcements localized'}</li>
            <li>{locale === 'chef' ? 'Tëxt ëxpäñsïøñ (~30%) tëstïñg' : 'Text expansion (~30%) testing'}</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Demonstrates internationalization features with automatic text expansion testing and character set validation for card content.'
      }
    }
  }
};

// =============================================================================
// LAYOUT EXAMPLES
// =============================================================================

export const CardGrid: Story = {
  name: 'Card Grid Layout',
  render: () => {
    const { t } = useTranslation();
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '900px' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} elevation="md" padding="md" rounded="lg" interactive>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>
              {t('stories.card.examples.title')} {i}
            </h4>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
              Interactive card in a grid layout.
            </p>
          </Card>
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Demonstrates cards in a responsive grid layout for dashboard-like interfaces.'
      }
    }
  }
};

export const FullWidthCard: Story = {
  name: 'Full Width',
  render: () => (
    <div style={{ width: '600px' }}>
      <Card elevation="lg" padding="xl" rounded="lg" fullWidth>
        <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.5rem' }}>
          Full Width Card
        </h3>
        <p style={{ margin: 0, color: '#6b7280' }}>
          This card expands to fill its container width, useful for feature sections and hero content.
        </p>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'A card that takes the full width of its container.'
      }
    }
  }
};

export const CardWithHeader: Story = {
  name: 'Card with Header',
  render: () => {
    const { t } = useTranslation();
    return (
      <Card elevation="md" padding="none" rounded="lg" style={{ width: '350px' }}>
        <div style={{ 
          padding: '1rem 1.5rem', 
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem' }}>
            {t('stories.card.examples.headerTitle')}
          </h3>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <p style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>
            {t('stories.card.examples.content')}
          </p>
          <button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            {t('components.button.submit')}
          </button>
        </div>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with a distinct header section for titles and actions.'
      }
    }
  }
};

export const CardWithFooter: Story = {
  name: 'Card with Footer',
  render: () => {
    const { t } = useTranslation();
    return (
      <Card elevation="md" padding="none" rounded="lg" style={{ width: '350px' }}>
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>
            {t('stories.card.variants.withFooter')}
          </h3>
          <p style={{ margin: 0, color: '#6b7280' }}>
            {t('stories.card.examples.content')}
          </p>
        </div>
        <div style={{ 
          padding: '1rem 1.5rem', 
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {t('stories.card.examples.footerText')}
          </span>
          <button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'transparent',
              color: '#3b82f6',
              border: '1px solid #3b82f6',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            {t('components.card.moreActions')}
          </button>
        </div>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with a footer section for actions and metadata.'
      }
    }
  }
};
