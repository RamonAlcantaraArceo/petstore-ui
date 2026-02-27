# GitHub Copilot Instructions

## Project Overview

**petstore-ui** is a modern React + TypeScript component library with Storybook documentation and static website demonstration. This monorepo showcases design system components with a Petstore API integration demo.

### Tech Stack
- **Runtime**: Bun (primary) with Node.js fallback compatibility
- **Framework**: React 18 + TypeScript (strict mode)
- **Documentation**: Storybook with MDX stories
- **Build**: Bun bundler + Storybook static generation
- **Deployment**: GitHub Pages via GitHub Actions
- **Testing**: Jest + Testing Library (Bun compatible)
- **Code Quality**: ESLint + Prettier + lint-staged

### Key Dependencies
```json
{
  "react": "^18.x",
  "typescript": "^5.x",
  "@storybook/react": "^7.x",
  "@storybook/addon-essentials": "^7.x",
  "@storybook/addon-docs": "^7.x"
}
```

## Architecture & Folder Structure

```
petstore-ui/
├── src/
│   ├── components/          # React components (atomic design)
│   │   ├── atoms/          # Basic building blocks (Button, Input)
│   │   ├── molecules/      # Combined atoms (SearchBox, PetCard)
│   │   └── organisms/      # Complex components (PetGrid, Header)
│   ├── stories/            # Storybook stories (.stories.tsx)
│   └── tokens/             # Design system tokens (theme.ts)
├── public/                 # Static website assets
├── docs/                   # Additional documentation
├── .storybook/             # Storybook configuration
├── .github/                # GitHub templates & workflows
└── .vscode/                # VS Code settings & snippets
```

## Code Style & Patterns

### Naming Conventions

**Files & Directories**:
- Components: `PascalCase.tsx` (e.g., `Button.tsx`, `SearchBox.tsx`)
- Stories: `ComponentName.stories.tsx` 
- Tests: `ComponentName.test.tsx`
- Types: `types.ts` or embedded in component files
- Tokens: `camelCase.ts` (e.g., `theme.ts`, `colors.ts`)

**Functions & Variables**:
- Components: `PascalCase` (e.g., `Button`, `PetCard`)
- Functions: `camelCase` (e.g., `handleSubmit`, `fetchPetData`)
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `API_BASE_URL`)
- Props interfaces: `ComponentNameProps` (e.g., `ButtonProps`)

**TypeScript Patterns**:
```typescript
// ✅ Preferred component structure
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children,
  ...props
}) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export type { ButtonProps };
```

### Import/Export Patterns
```typescript
// ✅ Preferred import order
import React from 'react';
import type { FC, MouseEvent } from 'react';

// External libraries
import clsx from 'clsx';

// Internal utilities/tokens
import { theme } from '../tokens/theme';
import type { BaseComponentProps } from '../types/common';

// ✅ Preferred exports
export const Component: FC<Props> = () => { /* */ };
export type { ComponentProps };
export default Component; // Only for default exports
```

## Component Guidelines

### Atomic Design Principles

**Atoms** (`/src/components/atoms/`):
- Single responsibility components (Button, Input, Icon)
- No internal state beyond UI state
- Highly reusable and composable
- Accept design token-based props

**Molecules** (`/src/components/molecules/`):
- Combinations of atoms (SearchBox, PetCard)
- Limited business logic
- Reusable across multiple contexts

**Organisms** (`/src/components/organisms/`):
- Complex UI sections (PetGrid, Navigation)
- May contain business logic and API calls
- Context-specific components

### Component Structure Template

```typescript
import React from 'react';
import type { FC } from 'react';
import { theme } from '../../tokens/theme';

/**
 * ComponentName description
 * 
 * @example
 * <ComponentName variant="primary" size="large">
 *   Content
 * </ComponentName>
 */
interface ComponentNameProps {
  /** Description of prop */
  variant?: 'primary' | 'secondary';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Additional CSS class names */
  className?: string;
  /** Child elements */
  children?: React.ReactNode;
}

export const ComponentName: FC<ComponentNameProps> = ({
  variant = 'primary',
  size = 'medium',
  className,
  children,
  ...props
}) => {
  return (
    <div 
      className={`component-name component-name--${variant} component-name--${size} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export type { ComponentNameProps };
```

### Props Interface Guidelines
- Use `interface` for props definitions
- Include JSDoc comments for all props
- Provide sensible defaults
- Use union types for variants
- Include `className` prop for styling flexibility
- Spread remaining props with `...props`

## Design System & Tokens

### Theme Structure (`/src/tokens/theme.ts`)

```typescript
export const theme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      500: '#3b82f6', 
      900: '#1e3a8a'
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
} as const;

export type Theme = typeof theme;
```

### Design Token Usage
- Reference tokens instead of hardcoded values
- Use semantic color names for context
- Implement responsive design with breakpoint tokens
- Maintain consistency across components

## Testing Expectations

### Test File Organization
```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── Button.stories.tsx
```

### Testing Patterns

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct variant class', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn--primary');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Test Coverage Expectations
- **Unit Tests**: All components, utilities, and hooks
- **Integration Tests**: API integration functions
- **Accessibility Tests**: Screen reader and keyboard navigation
- **Visual Regression**: Storybook visual tests (future)
- **Coverage Target**: 80%+ line coverage

## Storybook Guidelines

### Story Structure Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Basic button component with multiple variants and sizes.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger']
    },
    size: {
      control: 'select', 
      options: ['small', 'medium', 'large']
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button'
  }
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  )
};
```

### Story Best Practices
- Use descriptive story names
- Include comprehensive controls
- Add documentation descriptions
- Create variant showcases
- Include interactive examples
- Document accessibility features

## Development Guidelines

### Error Handling Patterns

```typescript
// ✅ API Error Handling
export const fetchPetData = async (id: string): Promise<Pet | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pet/${id}`);
    
    if (!response.ok) {
      console.error(`Failed to fetch pet ${id}: ${response.status}`);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Network error fetching pet data:', error);
    return null;
  }
};

// ✅ Component Error Boundaries
const ErrorBoundary: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      {children}
    </React.Suspense>
  );
};
```

### Logging Strategy
- Use `console.error()` for errors
- Use `console.warn()` for warnings  
- Use `console.debug()` for development info
- Implement structured logging for production
- Avoid `console.log()` in production builds

### Anti-Patterns to Avoid

```typescript
// ❌ Avoid inline styles
<div style={{ color: 'red' }}>Content</div>

// ✅ Use CSS classes with design tokens
<div className="text-error">Content</div>

// ❌ Avoid magic numbers
<div style={{ marginTop: '16px' }}>Content</div>

// ✅ Use design token variables
<div className="mt-md">Content</div> // where mt-md = theme.spacing.md

// ❌ Avoid deeply nested props
interface BadProps {
  config: {
    theme: {
      colors: {
        primary: string;
      };
    };
  };
}

// ✅ Flatten props structure
interface GoodProps {
  primaryColor?: string;
  themeVariant?: 'light' | 'dark';
}
```

## Documentation Requirements

### JSDoc Standards
```typescript
/**
 * Button component for user interactions
 * 
 * @param variant - Visual style variant of the button
 * @param size - Size of the button
 * @param disabled - Whether the button is disabled
 * @param onClick - Handler for button click events
 * @param children - Button content
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="large" onClick={handleSubmit}>
 *   Submit Form
 * </Button>
 * ```
 */
```

### README Patterns
- Include usage examples for each component
- Document props with types and defaults
- Provide accessibility guidelines
- Add troubleshooting sections
- Include visual examples

## AI Assistant Guidelines

### Code Generation Preferences

**Verbosity Level**: **Balanced** - Include necessary comments and documentation, but avoid over-commenting obvious code.

**Preferred Patterns**:
- Generate complete component files with props, types, and exports
- Include basic accessibility attributes (ARIA labels, roles)
- Add TypeScript interfaces with JSDoc comments
- Implement error boundaries for complex components
- Follow atomic design principles for component organization

**Context Preferences**:
- Always reference design tokens from `theme.ts`
- Follow existing naming conventions
- Include Storybook stories for new components
- Add unit tests for component functionality
- Maintain consistency with existing component patterns

### Code Review Guidelines

**Auto-Generated Code Should**:
- ✅ Pass TypeScript strict mode compilation
- ✅ Follow ESLint rules without warnings  
- ✅ Include proper prop types and defaults
- ✅ Use design system tokens
- ✅ Include basic accessibility attributes
- ✅ Have corresponding Storybook story
- ✅ Include unit test coverage

**Review Checklist for AI Code**:
1. **Type Safety**: All props properly typed with interfaces
2. **Accessibility**: ARIA attributes and semantic HTML
3. **Performance**: No unnecessary re-renders or computations
4. **Design System**: Uses theme tokens consistently
5. **Testing**: Includes comprehensive test coverage
6. **Documentation**: JSDoc comments and usage examples
7. **Storybook**: Interactive stories with controls

### Prompt Engineering Guidelines

**Effective Prompts**:
```
// ✅ Good: Specific with context
"Create a SearchBox molecule component that combines an Input atom and a Button atom. It should accept a placeholder prop, onSearch callback, and disabled state. Include TypeScript interfaces, Storybook story, and unit tests. Use design tokens from theme.ts."

// ❌ Vague: Lacks context  
"Make a search component"
```

**Component Generation Template**:
```
"Create a [ComponentType] [ComponentName] component that [functionality]. 
Include:
- TypeScript interface with JSDoc comments
- Default props and prop spreading  
- CSS classes following BEM methodology
- Accessibility attributes (ARIA labels, roles)
- Storybook story with controls and variants
- Unit tests with Testing Library
- Usage of design tokens from theme.ts
- Error handling for edge cases"
```

### Integration with Existing Workflows

**CI/CD Integration**:
- AI-generated code must pass all existing lint and test checks
- Automated Storybook builds should include new stories
- GitHub Actions should validate TypeScript compilation
- Pattern consistency checks via custom ESLint rules

**Review Process**:
1. AI generates component code
2. Automated tests and linting run
3. Storybook story builds successfully  
4. Human review for business logic and design consistency
5. Integration testing with existing components
6. Documentation updates if needed

---

## Quick Reference

### Common AI Prompts
- **New Component**: "Create [ComponentName] following the component template with props [PropList]"
- **Add Story**: "Create a Storybook story for [ComponentName] with [StoryVariants]"
- **Add Tests**: "Write unit tests for [ComponentName] covering [TestScenarios]" 
- **Update Theme**: "Add [TokenType] tokens to theme.ts for [Purpose]"
- **API Integration**: "Create [FunctionName] to fetch data from [Endpoint] with error handling"

### File Templates Available
- `/src/components/atoms/ComponentTemplate.tsx`
- `/src/stories/ComponentTemplate.stories.tsx` 
- `/src/components/__tests__/ComponentTemplate.test.tsx`
- `.vscode/snippets/component.json`

### Validation Commands
```bash
bun run type-check    # TypeScript validation
bun run lint         # ESLint validation  
bun run test         # Unit test validation
bun run storybook    # Interactive component testing
```

This document should be updated as patterns evolve and new conventions are established. For questions about specific implementation details, refer to existing components in the `/src/components/` directory.