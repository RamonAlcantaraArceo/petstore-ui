User: Help me create a prompt to indicate that this project should be compliant with localization and accessibility so it should be integrated from the core. for instance when using storybook and the button has some text, the text should be based on something localized, and storybook should allow me to change the locale. because I don't want to spend too much time in creating every translation we can stick to english and cheff, you know like the one from the muppets that allows for some pseudo localization with an extensive character set and expanded size. Generate the output as markdown that I can copy and paste later.

---

# Localization & Accessibility Integration Requirements

## Project Overview

Integrate **localization (i18n) and accessibility (a11y) capabilities from the core** of the petstore-ui component library. All components and Storybook stories must support multiple locales and comprehensive accessibility features as first-class citizens, not afterthoughts.

## Localization Requirements

### Supported Locales

- **English (en)** - Primary locale
- **Chef (chef)** - Swedish Chef pseudo-localization for testing text expansion and international characters (e.g., "Bork bork bork! Ze button is zee clickable ting, ja!")

### Core Integration Points

#### 1. Translation Infrastructure

```typescript
// src/i18n/locales/en.ts
export const en = {
  components: {
    button: {
      loading: 'Loading: {content}',
      submit: 'Submit',
      cancel: 'Cancel',
      ariaLabel: 'Button: {content}',
    },
    input: {
      required: 'Required field',
      invalid: 'Invalid input',
      placeholder: 'Enter text...',
    },
  },
  stories: {
    button: {
      title: 'Button Component',
      description: 'Basic button component with multiple variants and sizes',
      variants: {
        primary: 'Primary Button',
        secondary: 'Secondary Button',
        danger: 'Danger Button',
      },
    },
  },
} as const;

// src/i18n/locales/chef.ts - Pseudo-localization with character expansion
export const chef = {
  components: {
    button: {
      loading: 'Lüødíñg: {content} - bork bork!',
      submit: 'Süßmït zee förm, ja!',
      cancel: 'Çäñçél zee tíñg!',
      ariaLabel: 'Büttön: {content} - bork bork zee clickable!',
    },
    // ... expanded Chef translations with ~30% character increase
  },
} as const;
```

#### 2. Translation Hook with TypeScript Safety

```typescript
// src/hooks/useTranslation.ts
export const useTranslation = () => {
  const { locale, setLocale } = useLocaleContext();

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string>) => {
      // Type-safe translation lookup with parameter interpolation
      // Returns translated string with Chef-style character expansion
    },
    [locale],
  );

  return { t, locale, setLocale, isRTL: locale === 'ar' }; // Future RTL support
};

// Type-safe translation keys
type TranslationKey =
  | 'components.button.loading'
  | 'components.button.submit'
  | 'stories.button.title';
// ... auto-generated from locale files
```

#### 3. Storybook Locale Integration

**Global Locale Control**: Add locale switcher to Storybook toolbar

```typescript
// .storybook/preview.tsx
export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English', right: '🇺🇸' },
        { value: 'chef', title: 'Chef (Pseudo)', right: '👨‍🍳' }
      ],
      showName: true
    }
  }
};

// Locale context provider decorator
const withLocale = (Story, context) => (
  <LocaleProvider locale={context.globals.locale}>
    <Story />
  </LocaleProvider>
);
```

**Story Integration**: All stories use translations instead of hardcoded text

```typescript
// Button.stories.tsx
export const Primary: Story = {
  render: (args) => {
    const { t } = useTranslation();
    return <Button {...args}>{t('components.button.submit')}</Button>;
  }
};

// Story metadata uses translations
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button', // Category remains English for consistency
  component: Button,
  parameters: {
    docs: {
      description: {
        component: () => {
          const { t } = useTranslation();
          return t('stories.button.description');
        }
      }
    }
  }
};
```

## Accessibility Requirements

### Core A11Y Integration

#### 1. Enhanced Component Accessibility

Extend existing partial a11y implementation:

```typescript
// All components must include
interface AccessibilityProps {
  /** Screen reader specific description */
  ariaLabel?: string;
  /** Associates with help text or error messages */
  ariaDescribedBy?: string;
  /** Indicates current state */
  ariaPressed?: boolean;
  /** Custom ARIA attributes */
  'aria-*'?: any;
  /** Unique identifier for accessibility */
  id?: string;
}

// Button enhancement example
export const Button: FC<ButtonProps> = ({ children, disabled, ...props }) => {
  const { t } = useTranslation();
  const id = useMemo(() => props.id || `button-${generateId()}`, [props.id]);

  return (
    <button
      {...props}
      id={id}
      aria-label={props.ariaLabel || t('components.button.ariaLabel', { content: children })}
      aria-disabled={disabled}
      // Automatic focus management
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {disabled ? t('components.button.loading', { content: children }) : children}
    </button>
  );
};
```

#### 2. Accessibility Testing Integration

**Visual Focus Management**:

- High contrast focus rings that work with Chef character expansion
- Focus trap management for complex components
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)

**Screen Reader Support**:

- ARIA live regions for dynamic content
- Proper heading hierarchy
- Form field associations
- Status announcements in both English and Chef

#### 3. Storybook A11Y Integration

```typescript
// .storybook/main.ts addons
export default {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y', // Accessibility testing panel
    '@storybook/addon-controls',
    '@storybook/addon-docs'
  ]
};

// A11y testing in stories
export const AccessibilityShowcase: Story = {
  name: 'Accessibility Features',
  render: () => (
    <div>
      {/* Test focus management, screen reader support, keyboard nav */}
      <Button variant="primary">Standard Button</Button>
      <Button disabled>Disabled State</Button>
      <Button aria-describedby="help-text">With Help Text</Button>
      <div id="help-text">Additional context for screen readers</div>
    </div>
  ),
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'focus-order-semantics', enabled: true },
          { id: 'keyboard-navigation', enabled: true }
        ]
      }
    }
  }
};
```

## Implementation Patterns

### 1. Component Template with i18n/a11y

```typescript
/**
 * ComponentName with integrated localization and accessibility
 */
interface ComponentNameProps extends AccessibilityProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
}

export const ComponentName: FC<ComponentNameProps> = ({
  variant = 'primary',
  children,
  disabled = false,
  ariaLabel,
  ...accessibilityProps
}) => {
  const { t } = useTranslation();
  const id = useAccessibilityId(accessibilityProps.id);

  return (
    <element
      id={id}
      aria-label={ariaLabel || t('components.componentName.defaultLabel', { content: children })}
      aria-disabled={disabled}
      className={`component component--${variant}`}
      {...accessibilityProps}
    >
      {children}
    </element>
  );
};
```

### 2. Storybook Story Template

```typescript
export const StoryName: Story = {
  name: () => {
    const { t } = useTranslation();
    return t('stories.component.storyName');
  },
  render: (args) => {
    const { t } = useTranslation();
    return (
      <Component {...args}>
        {t('stories.component.exampleText')}
      </Component>
    );
  },
  parameters: {
    docs: {
      description: {
        story: () => {
          const { t } = useTranslation();
          return t('stories.component.storyDescription');
        }
      }
    },
    a11y: {
      // Accessibility testing configuration
    }
  }
};
```

## Testing Requirements

### 1. Localization Testing

- **Text Expansion**: Chef locale should expand text by ~30% to test layout flexibility
- **Character Set**: Include extended Unicode characters (ü, ß, ñ, ç) in Chef translations
- **Parameter Interpolation**: Test dynamic content injection
- **Storybook Integration**: All stories render correctly in both locales

### 2. Accessibility Testing

- **Automated A11Y**: Storybook addon-a11y passes all checks
- **Keyboard Navigation**: Tab order, Enter/Space activation, Escape handling
- **Screen Reader**: VoiceOver/NVDA testing with proper announcements
- **Focus Management**: Visible focus indicators, focus trapping
- **Color Contrast**: WCAG 2.1 AA compliance verified

### 3. Integration Testing

- **Locale Switching**: Storybook toolbar changes update all visible text
- **A11Y + i18n**: Accessibility attributes update with locale changes
- **Theme Integration**: Localized text respects design token spacing
- **Performance**: Translation lookups don't impact render performance

## Deliverables

1. **Translation Infrastructure**: Locale files, hooks, context providers
2. **Component Updates**: All atoms enhanced with i18n/a11y props
3. **Storybook Integration**: Locale toolbar, translated stories, a11y testing
4. **Documentation**: i18n/a11y usage guide in component JSDoc
5. **Testing Suite**: Automated tests for localization and accessibility
6. **Type Safety**: Translation keys and accessibility props fully typed

## Success Criteria

✅ **Storybook Experience**: Users can switch between English and Chef locales via toolbar and see all text update dynamically

✅ **Developer Experience**: TypeScript provides autocomplete for translation keys and catches missing translations at compile time

✅ **Accessibility Compliance**: All components pass automated a11y testing and provide excellent screen reader experience

✅ **Text Expansion Handling**: Chef locale's expanded text doesn't break component layouts

✅ **Performance**: Locale switching is instant with no layout shifts

✅ **Maintainability**: Adding new components or locales follows clear, documented patterns

This integration ensures localization and accessibility are core features rather than bolt-on additions, providing a solid foundation for international and inclusive user experiences.
