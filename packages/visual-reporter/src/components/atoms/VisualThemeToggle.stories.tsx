import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisualThemeToggle } from './VisualThemeToggle';

const meta: Meta<typeof VisualThemeToggle> = {
  title: 'Visual Reporter/Atoms/Theme Toggle',
  component: VisualThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Theme toggle button for switching between light and dark modes. Persists preference to localStorage.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        background: 'var(--color-toggle-bg)',
        borderRadius: '0.5rem',
      }}
    >
      <span>Current Theme:</span>
      <VisualThemeToggle />
    </div>
  ),
};

export const InToolbar: Story = {
  name: 'In Toolbar Context',
  render: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.75rem 1rem',
        background: 'var(--color-header)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
          }}
        >
          All
        </button>
        <button
          style={{
            padding: '0.5rem 1rem',
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: '0.25rem',
          }}
        >
          Passed
        </button>
      </div>
      <VisualThemeToggle />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Theme toggle positioned in toolbar next to filter buttons, as it appears in the actual visual report.',
      },
    },
  },
};

export const Interactive: Story = {
  name: 'Interactive',
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h3>Click the button to toggle theme</h3>
      <VisualThemeToggle />
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
        Theme preference is saved to localStorage and will persist across page reloads.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example - click to test theme switching. Watch the page colors change as you toggle.',
      },
    },
  },
};
