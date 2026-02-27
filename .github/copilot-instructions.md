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
│   ├── i18n/               # Internationalization infrastructure
│   │   ├── locales/        # Translation files (en.ts, chef.ts)
│   │   ├── context.tsx     # Locale provider and useTranslation hook
│   │   ├── registry.ts     # Type-safe translation registry
│   │   └── types.ts        # i18n TypeScript definitions
│   ├── accessibility/      # Accessibility utilities and compliance
│   │   ├── hooks.ts        # useAccessibility hook for a11y features
│   │   ├── types.ts        # WCAG 2.1 AA compliance interfaces
│   │   └── utils.ts        # Accessibility utility functions
│   ├── testing/            # Testing utilities for i18n and a11y
│   │   ├── a11y-utils.ts   # Accessibility testing helpers
│   │   ├── i18n-utils.tsx  # Internationalization testing helpers
│   │   └── test-patterns.tsx # Comprehensive testing patterns
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
import { useTranslation } from '../../i18n';
import { useAccessibility } from '../../accessibility';

/**
 * ComponentName description with i18n and a11y support
 * 
 * @example
 * <ComponentName 
 *   variant="primary" 
 *   size="large"
 *   labelTranslationKey="components.componentName.label"
 *   announceOnAction="Component activated"
 * >
 *   Content
 * </ComponentName>
 */
interface ComponentNameProps {
  /** Visual variant */
  variant?: 'primary' | 'secondary';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Additional CSS class names */
  className?: string;
  /** Child elements */
  children?: React.ReactNode;
  /** Translation key for accessible label */
  labelTranslationKey?: string;
  /** Static label (fallback if no translation key) */
  label?: string;
  /** Translation parameters for dynamic content */
  translationParams?: Record<string, string | number>;
  /** Announcement text for screen readers */
  announceOnAction?: string;
  /** Enable keyboard activation with Enter key */
  enterActivation?: boolean;
  /** Enable keyboard activation with Space key */
  spaceActivation?: boolean;
}

export const ComponentName: FC<ComponentNameProps> = ({
  variant = 'primary',
  size = 'medium',
  className,
  children,
  labelTranslationKey,
  label,
  translationParams,
  announceOnAction,
  enterActivation = true,
  spaceActivation = true,
  ...props
}) => {
  const { t } = useTranslation();
  const {
    ariaAttributes,
    handleKeyDown,
    announceAction
  } = useAccessibility({
    enterActivation,
    spaceActivation,
    announceOnAction: announceOnAction || ''
  });

  // Get translated content
  const displayLabel = labelTranslationKey 
    ? t(labelTranslationKey, translationParams) 
    : label;

  const handleClick = (event: React.MouseEvent) => {
    announceAction();
    props.onClick?.(event);
  };

  return (
    <div 
      className={`component-name component-name--${variant} component-name--${size} ${className || ''}`}
      {...ariaAttributes}
      {...props}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      aria-label={displayLabel}
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
- **i18n Integration**: Include translation key props (`labelTranslationKey`, `translationParams`)
- **Accessibility**: Include a11y props (`announceOnAction`, `enterActivation`, `spaceActivation`)
- **Fallbacks**: Provide static content fallbacks for translation keys
- **Type Safety**: Use translation key types from i18n system

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
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import { renderWithLocale } from '../../testing/i18n-utils';
import { testKeyboardNavigation, auditAccessibility } from '../../testing/a11y-utils';

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

  it('renders translated content', () => {
    const { container } = renderWithLocale(
      <Button labelTranslationKey="components.button.primary" />,
      { locale: 'en' }
    );
    expect(screen.getByRole('button')).toHaveTextContent('Primary');
  });

  it('handles keyboard navigation', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button');
    
    await userEvent.tab();
    expect(button).toHaveFocus();
    
    await userEvent.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('meets accessibility requirements', async () => {
    render(<Button>Accessible Button</Button>);
    const button = screen.getByRole('button');
    const audit = await auditAccessibility(button);
    
    expect(audit.isCompliant).toBe(true);
    expect(audit.violations).toHaveLength(0);
  });

  it('works across all supported locales', () => {
    const locales = ['en', 'chef'];
    locales.forEach(locale => {
      const { container } = renderWithLocale(
        <Button labelTranslationKey="components.button.primary" />,
        { locale }
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
```

### Test Coverage Expectations
- **Unit Tests**: All components, utilities, and hooks
- **Integration Tests**: API integration functions
- **Accessibility Tests**: Screen reader and keyboard navigation using a11y-utils
- **Internationalization Tests**: Multi-locale rendering and text expansion using i18n-utils
- **Visual Regression**: Storybook visual tests (future)
- **Cross-Locale Validation**: Components function correctly in all supported locales
- **WCAG Compliance**: Automated accessibility auditing with comprehensive a11y testing
- **Coverage Target**: 80%+ line coverage including i18n and a11y paths

## Storybook Guidelines

### Story Structure Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { useTranslation } from '../../i18n';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component with i18n and accessibility support. Test locale switching using the toolbar control.'
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
    },
    labelTranslationKey: {
      control: 'text',
      description: 'Translation key for button text'
    },
    announceOnAction: {
      control: 'text',
      description: 'Screen reader announcement on activation'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    labelTranslationKey: 'components.button.primary'
  }
};

export const WithTranslations: Story = {
  name: 'All Variants (Translated)',
  render: () => {
    const { t } = useTranslation();
    return (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary" labelTranslationKey="components.button.primary" />
        <Button variant="secondary" labelTranslationKey="components.button.secondary" />
        <Button variant="danger" labelTranslationKey="components.button.danger" />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch locales using the toolbar to see text changes. Chef locale shows text expansion handling.'
      }
    }
  }
};

export const AccessibilityShowcase: Story = {
  name: 'Accessibility Features',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Button 
        variant="primary"
        announceOnAction="Primary action activated"
        labelTranslationKey="components.button.accessibility.primary"
      />
      <Button 
        variant="secondary"
        enterActivation={true}
        spaceActivation={true}
        announceOnAction="Secondary action with keyboard support"
        labelTranslationKey="components.button.accessibility.keyboard"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Test keyboard navigation (Tab, Enter, Space) and screen reader announcements.'
      }
    }
  }
};
```

### Story Best Practices
- Use descriptive story names
- Include comprehensive controls
- Add documentation descriptions
- Create variant showcases
- Include interactive examples
- Document accessibility features
- **i18n Testing**: Include stories that demonstrate locale switching
- **Accessibility Showcases**: Create stories that highlight keyboard navigation and screen reader features
- **Translation Keys**: Use translation keys instead of hardcoded strings
- **Pseudo-Localization**: Test layout with longer text using Chef locale
- **Keyboard Testing**: Document Tab, Enter, and Space key interactions

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
- Include comprehensive i18n integration with useTranslation hook
- Include accessibility features with useAccessibility hook
- Add TypeScript interfaces with JSDoc comments for all props including i18n and a11y
- Implement error boundaries for complex components
- Follow atomic design principles for component organization
- Include translation keys and accessibility announcements
- Support keyboard navigation (Enter/Space activation)
- Provide fallback content for missing translations

**Context Preferences**:
- Always reference design tokens from `theme.ts`
- Follow existing naming conventions
- Include Storybook stories for new components with locale switching examples
- Add unit tests for component functionality including i18n and a11y testing
- Maintain consistency with existing component patterns
- Use translation keys from the established i18n system
- Include accessibility testing with keyboard navigation and screen reader validation
- Test components across multiple locales (en, chef)
- Document accessibility features in Storybook stories

### Code Review Guidelines

**Auto-Generated Code Should**:
- ✅ Pass TypeScript strict mode compilation
- ✅ Follow ESLint rules without warnings  
- ✅ Include proper prop types and defaults
- ✅ Use design system tokens
- ✅ Include comprehensive i18n integration with useTranslation
- ✅ Include accessibility features with useAccessibility hook
- ✅ Support keyboard navigation and screen reader announcements
- ✅ Have corresponding Storybook story with locale switching examples
- ✅ Include unit test coverage with i18n and a11y testing
- ✅ Use translation keys instead of hardcoded strings
- ✅ Meet WCAG 2.1 AA accessibility guidelines

**Review Checklist for AI Code**:
1. **Type Safety**: All props properly typed with interfaces including i18n and a11y props
2. **Internationalization**: Uses useTranslation hook, translation keys, and parameter support
3. **Accessibility**: ARIA attributes, semantic HTML, keyboard navigation, and screen reader support
4. **Performance**: No unnecessary re-renders or computations
5. **Design System**: Uses theme tokens consistently
6. **Testing**: Includes comprehensive test coverage with i18n and a11y validation
7. **Documentation**: JSDoc comments and usage examples including i18n and a11y features
8. **Storybook**: Interactive stories with locale switching and accessibility showcases
9. **WCAG Compliance**: Meets accessibility guidelines with proper contrast, focus management
10. **Cross-Locale Support**: Works correctly across all supported locales (en, chef)

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
- TypeScript interface with JSDoc comments for all props including i18n and a11y
- i18n integration with useTranslation hook and translation keys
- Accessibility integration with useAccessibility hook
- Default props and prop spreading  
- CSS classes following BEM methodology
- Comprehensive accessibility attributes (ARIA labels, roles, keyboard navigation)
- Storybook story with controls, variants, and locale switching examples
- Unit tests with Testing Library including i18n and a11y validation
- Usage of design tokens from theme.ts
- Error handling for edge cases
- Support for keyboard activation (Enter/Space keys)
- Screen reader announcements for actions
- Cross-locale testing and layout validation"
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
- **New Component**: "Create [ComponentName] following the component template with props [PropList], include i18n and a11y integration"
- **Add Story**: "Create a Storybook story for [ComponentName] with [StoryVariants], locale switching, and accessibility showcases"
- **Add Tests**: "Write unit tests for [ComponentName] covering [TestScenarios], including i18n and a11y validation" 
- **Update Theme**: "Add [TokenType] tokens to theme.ts for [Purpose]"
- **API Integration**: "Create [FunctionName] to fetch data from [Endpoint] with error handling"
- **Add Translation**: "Add translation keys for [ComponentName] to both en.ts and chef.ts locales"
- **Accessibility Audit**: "Review [ComponentName] for WCAG 2.1 AA compliance and add missing a11y features"
- **Cross-Locale Testing**: "Create tests to validate [ComponentName] works correctly across all supported locales"

### File Templates Available
- `/src/components/atoms/ComponentTemplate.tsx` (with i18n and a11y integration)
- `/src/stories/ComponentTemplate.stories.tsx` (with locale switching examples)
- `/src/components/__tests__/ComponentTemplate.test.tsx` (with i18n and a11y testing)
- `/src/i18n/locales/[locale].ts` (translation files)
- `/src/testing/a11y-utils.ts` (accessibility testing utilities)
- `/src/testing/i18n-utils.tsx` (internationalization testing helpers)
- `.vscode/snippets/component.json`

### Validation Commands
```bash
bun run type-check    # TypeScript validation (includes i18n and a11y types)
bun run lint         # ESLint validation  
bun run test         # Unit test validation (includes i18n and a11y tests)
bun run storybook    # Interactive component testing with locale switching
bun run build-storybook  # Static build validation with i18n integration
```

### i18n and Accessibility Quick Reference

**Translation Usage**:
```typescript
const { t } = useTranslation();
const label = t('components.button.primary', { count: 5 });
```

**Accessibility Integration**:
```typescript
const { ariaAttributes, handleKeyDown, announceAction } = useAccessibility({
  enterActivation: true,
  spaceActivation: true,
  announceOnAction: 'Action completed'
});
```

**Supported Locales**:
- `en` - English (production locale)
- `chef` - Swedish Chef pseudo-localization (testing layout with longer text)

**WCAG 2.1 AA Features**:
- Keyboard navigation (Tab, Enter, Space)
- Screen reader support (ARIA labels, announcements)
- Color contrast validation
- Focus management
- Semantic HTML structure

This document should be updated as patterns evolve and new conventions are established. For questions about specific implementation details, refer to existing components in the `/src/components/` directory.