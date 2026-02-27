import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/atoms/Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Basic button component with multiple variants, sizes, and accessibility features. Supports primary, secondary, and danger color schemes.'
      }
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
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button'
  }
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    children: 'Small Button'
  }
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Medium Button'
  }
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Large Button'
  }
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button'
  }
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Loading Button'
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

export const AllVariants: Story = {
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