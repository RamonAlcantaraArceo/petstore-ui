import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components/atoms/Button';

const getHomeUrl = (): string => {
  if (typeof window === 'undefined') {
    return '/';
  }

  const marker = '/storybook/';
  const { origin, pathname } = window.location;

  if (pathname.includes(marker)) {
    const [basePath] = pathname.split(marker);
    return `${origin}${basePath}/`;
  }

  return '/';
};

const HomeNavigation: React.FC = () => {
  const handleGoHome = () => {
    const target = getHomeUrl();
    window.top?.location.assign(target);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        maxWidth: '36rem',
        textAlign: 'center',
      }}
    >
      <h2 style={{ margin: 0 }}>Back to Petstore UI Home</h2>
      <p style={{ margin: 0 }}>
        Use this shortcut to leave Storybook and return to the landing page.
      </p>
      <Button variant="primary" onClick={handleGoHome}>
        Go Back Home
      </Button>
    </div>
  );
};

const meta: Meta<typeof HomeNavigation> = {
  title: 'Navigation/Go Back Home',
  component: HomeNavigation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Quick navigation helper to return from Storybook to the project landing page.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
