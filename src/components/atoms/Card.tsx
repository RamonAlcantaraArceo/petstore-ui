import React from 'react';
import type { FC, HTMLAttributes } from 'react';
import { theme } from '../../tokens/theme';
import { useTranslation } from '../../i18n';
import { useAccessibility } from '../../accessibility';

/**
 * Card component with elevation system, comprehensive accessibility, and internationalization.
 * Provides visual hierarchy through shadow levels and supports interactive states with full a11y.
 *
 * @example
 * ```tsx
 * <Card
 *   elevation="md"
 *   padding="lg"
 *   ariaLabel={t('components.card.ariaLabel', { title: 'Product' })}
 * >
 *   <h3>{t('stories.card.examples.title')}</h3>
 *   <p>{t('stories.card.examples.content')}</p>
 * </Card>
 *
 * <Card
 *   elevation="lg"
 *   interactive
 *   onClick={handleClick}
 *   translationKey="components.card.defaultTitle"
 * >
 *   <div>Clickable card content</div>
 * </Card>
 * ```
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Shadow elevation level for visual hierarchy */
  elevation?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
  /** Internal padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Border radius size */
  rounded?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Whether the card is interactive (clickable/hoverable) */
  interactive?: boolean;
  /** Whether the card is currently selected/active */
  selected?: boolean;
  /** Background color variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /** Border style */
  border?: boolean;
  /** Whether the card should take full width */
  fullWidth?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Card content */
  children: React.ReactNode;
  /** Use default translation for aria-label if none provided */
  useDefaultAriaLabel?: boolean;
  /** Translation key for card title/label */
  translationKey?: string;
  /** Parameters for translation interpolation */
  translationParams?: Record<string, string | number>;
  /** Keyboard navigation settings */
  enterActivation?: boolean;
  spaceActivation?: boolean;
  /** Announcement on action completion */
  announceOnAction?: string;
}

export const Card: FC<CardProps> = ({
  elevation = 'base',
  padding = 'md',
  rounded = 'lg',
  interactive = false,
  selected = false,
  variant = 'default',
  border = false,
  fullWidth = false,
  className = '',
  children,
  onClick,
  onKeyDown,
  useDefaultAriaLabel = true,
  translationKey,
  translationParams,
  enterActivation = true,
  spaceActivation = true,
  announceOnAction,
  ...props
}) => {
  const { t } = useTranslation();

  // Use accessibility hook for comprehensive a11y features
  const {
    ariaAttributes,
    handleKeyDown: accessibilityKeyDown,
    announceAction,
  } = useAccessibility({
    enterActivation: interactive && enterActivation,
    spaceActivation: interactive && spaceActivation,
    announceOnAction: announceOnAction || '',
  });

  // Get translated content if translation key provided
  const displayTitle = translationKey ? t(translationKey, translationParams) : undefined;

  // Generate accessible aria-label
  const getAriaLabel = () => {
    if (ariaAttributes['aria-label']) {
      return ariaAttributes['aria-label'];
    }

    if (!useDefaultAriaLabel) {
      return undefined;
    }

    if (displayTitle) {
      return t('components.card.ariaLabel', { title: displayTitle });
    }

    return t('components.card.defaultTitle');
  };
  const baseClasses = 'card';
  const elevationClasses = `card--elevation-${elevation}`;
  const paddingClasses = `card--padding-${padding}`;
  const roundedClasses = `card--rounded-${rounded}`;
  const variantClasses = `card--${variant}`;
  const interactiveClass = interactive ? 'card--interactive' : '';
  const selectedClass = selected ? 'card--selected' : '';
  const fullWidthClass = fullWidth ? 'card--full-width' : '';

  const cardClasses = [
    baseClasses,
    elevationClasses,
    paddingClasses,
    roundedClasses,
    variantClasses,
    interactiveClass,
    selectedClass,
    fullWidthClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary[50];
      case 'secondary':
        return theme.colors.secondary[50];
      case 'success':
        return theme.colors.semantic.successLight;
      case 'warning':
        return theme.colors.semantic.warningLight;
      case 'error':
        return theme.colors.semantic.errorLight;
      default:
        return theme.colors.neutral.white;
    }
  };

  const getBorderColor = () => {
    if (!border && !selected) return 'transparent';

    if (selected) {
      return theme.colors.primary[500];
    }

    switch (variant) {
      case 'primary':
        return theme.colors.primary[200];
      case 'secondary':
        return theme.colors.secondary[200];
      case 'success':
        return theme.colors.semantic.success;
      case 'warning':
        return theme.colors.semantic.warning;
      case 'error':
        return theme.colors.semantic.error;
      default:
        return theme.colors.secondary[200];
    }
  };

  const getPaddingValue = () => {
    switch (padding) {
      case 'none':
        return '0';
      case 'sm':
        return theme.spacing[3];
      case 'md':
        return theme.spacing[4];
      case 'lg':
        return theme.spacing[6];
      case 'xl':
        return theme.spacing[8];
      default:
        return theme.spacing[4];
    }
  };

  const getBorderRadius = () => {
    switch (rounded) {
      case 'none':
        return theme.borderRadius.none;
      case 'sm':
        return theme.borderRadius.sm;
      case 'base':
        return theme.borderRadius.base;
      case 'md':
        return theme.borderRadius.md;
      case 'lg':
        return theme.borderRadius.lg;
      case 'xl':
        return theme.borderRadius.xl;
      case '2xl':
        return theme.borderRadius['2xl'];
      case 'full':
        return theme.borderRadius.full;
      default:
        return theme.borderRadius.lg;
    }
  };

  const getShadow = () => {
    switch (elevation) {
      case 'none':
        return theme.boxShadow.none;
      case 'sm':
        return theme.boxShadow.sm;
      case 'base':
        return theme.boxShadow.base;
      case 'md':
        return theme.boxShadow.md;
      case 'lg':
        return theme.boxShadow.lg;
      case 'xl':
        return theme.boxShadow.xl;
      case '2xl':
        return theme.boxShadow['2xl'];
      default:
        return theme.boxShadow.base;
    }
  };

  const cardStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: getBackgroundColor(),
    border: `1px solid ${getBorderColor()}`,
    borderRadius: getBorderRadius(),
    padding: getPaddingValue(),
    boxShadow: getShadow(),
    transition: `all ${theme.animation.duration[200]} ${theme.animation.easing.inOut}`,
    position: 'relative',
    width: fullWidth ? '100%' : 'auto',
    cursor: interactive ? 'pointer' : 'default',

    // Selected state
    ...(selected && {
      borderWidth: '2px',
      borderColor: theme.colors.primary[500],
    }),

    // Focus styles for interactive cards
    ...(interactive && {
      '&:focus': {
        outline: `2px solid ${theme.colors.primary[500]}`,
        outlineOffset: '2px',
      },
    }),
  };

  const hoverStyles: React.CSSProperties = interactive
    ? {
        transform: 'translateY(-1px)',
        boxShadow:
          elevation === 'none'
            ? theme.boxShadow.md
            : elevation === 'sm'
              ? theme.boxShadow.md
              : elevation === 'base'
                ? theme.boxShadow.lg
                : elevation === 'md'
                  ? theme.boxShadow.xl
                  : elevation === 'lg'
                    ? theme.boxShadow['2xl']
                    : theme.boxShadow['2xl'],
      }
    : {};

  // Enhanced click handler with accessibility announcements
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && onClick) {
      // Announce action to screen readers
      if (announceOnAction) {
        announceAction();
      }

      onClick(event);
    }
  };

  // Combined keyboard handler
  const handleKeyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle accessibility keyboard events
    accessibilityKeyDown(event as any);

    // Handle card-specific keyboard events
    if (interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      if (onClick) {
        // Announce action to screen readers
        if (announceOnAction) {
          announceAction();
        }
        onClick(event as any);
      }
    }

    onKeyDown?.(event);
  };

  const shouldBeInteractive = interactive && (onClick || props.tabIndex !== undefined);

  return (
    <div
      className={cardClasses}
      style={cardStyles}
      onClick={handleClick}
      onKeyDown={handleKeyDownEvent}
      role={shouldBeInteractive ? 'button' : 'region'}
      tabIndex={shouldBeInteractive ? 0 : undefined}
      aria-pressed={shouldBeInteractive && selected ? 'true' : undefined}
      aria-label={getAriaLabel()}
      aria-selected={selected}
      {...ariaAttributes}
      onMouseEnter={(e) => {
        if (interactive) {
          Object.assign(e.currentTarget.style, { ...cardStyles, ...hoverStyles });
        }
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (interactive) {
          Object.assign(e.currentTarget.style, cardStyles);
        }
        props.onMouseLeave?.(e);
      }}
      onFocus={(e) => {
        if (interactive) {
          e.currentTarget.style.outline = `2px solid ${theme.colors.primary[500]}`;
          e.currentTarget.style.outlineOffset = '2px';
        }
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        if (interactive) {
          e.currentTarget.style.outline = 'none';
          e.currentTarget.style.outlineOffset = '0';
        }
        props.onBlur?.(e);
      }}
      {...(props as any)} // Spread remaining props, excluding ones we've handled
    >
      {displayTitle && (
        <div
          style={{
            position: 'absolute',
            left: '-10000px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          {displayTitle}
        </div>
      )}
      {children}
    </div>
  );
};

export type { CardProps };
export default Card;
