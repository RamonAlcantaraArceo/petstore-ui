import React from 'react';
import type { FC, ButtonHTMLAttributes } from 'react';
import { theme } from '../../tokens/theme';

/**
 * Button component for user interactions with multiple variants and sizes.
 * Supports primary, secondary, and danger color schemes with accessible design.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="large" onClick={handleSubmit}>
 *   Submit Form
 * </Button>
 * 
 * <Button variant="danger" disabled>
 *   Delete Account
 * </Button>
 * ```
 */
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Size of the button */
  size?: 'small' | 'medium' | 'large';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** Loading state with spinner */
  loading?: boolean;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Additional CSS class names */
  className?: string;
  /** Button content */
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  loading = false,
  type = 'button',
  className = '',
  children,
  onClick,
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClasses = `btn--${variant}`;
  const sizeClasses = `btn--${size}`;
  const fullWidthClass = fullWidth ? 'btn--full-width' : '';
  const loadingClass = loading ? 'btn--loading' : '';
  
  const buttonClasses = [
    baseClasses,
    variantClasses,
    sizeClasses,
    fullWidthClass,
    loadingClass,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const buttonStyles: React.CSSProperties = {
    // Base styles
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[2],
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    fontWeight: theme.typography.fontWeight.medium,
    textDecoration: 'none',
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: `all ${theme.animation.duration[200]} ${theme.animation.easing.inOut}`,
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    
    // Size variants
    ...(size === 'small' && {
      padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.tight,
      minHeight: '2rem'
    }),
    ...(size === 'medium' && {
      padding: `${theme.spacing[2.5]} ${theme.spacing[4]}`,
      fontSize: theme.typography.fontSize.base,
      lineHeight: theme.typography.lineHeight.normal,
      minHeight: '2.5rem'
    }),
    ...(size === 'large' && {
      padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
      fontSize: theme.typography.fontSize.lg,
      lineHeight: theme.typography.lineHeight.normal,
      minHeight: '3rem'
    }),
    
    // Variant styles
    ...(variant === 'primary' && {
      backgroundColor: theme.colors.primary[500],
      color: theme.colors.neutral.white,
      boxShadow: theme.boxShadow.sm
    }),
    ...(variant === 'secondary' && {
      backgroundColor: theme.colors.neutral.white,
      color: theme.colors.secondary[700],
      border: `1px solid ${theme.colors.secondary[300]}`,
      boxShadow: theme.boxShadow.sm
    }),
    ...(variant === 'danger' && {
      backgroundColor: theme.colors.semantic.error,
      color: theme.colors.neutral.white,
      boxShadow: theme.boxShadow.sm
    })
  };

  const hoverStyles: React.CSSProperties = {
    ...(variant === 'primary' && {
      backgroundColor: theme.colors.primary[600]
    }),
    ...(variant === 'secondary' && {
      backgroundColor: theme.colors.secondary[50],
      borderColor: theme.colors.secondary[400]
    }),
    ...(variant === 'danger' && {
      backgroundColor: theme.colors.semantic.errorDark
    })
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      style={buttonStyles}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-disabled={disabled || loading}
      aria-label={loading ? `Loading: ${children}` : undefined}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, buttonStyles);
      }}
      onFocus={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.outline = `2px solid ${theme.colors.primary[500]}`;
          e.currentTarget.style.outlineOffset = '2px';
        }
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = 'none';
        e.currentTarget.style.outlineOffset = '0';
      }}
      {...props}
    >
      {loading && (
        <span
          style={{
            width: '1rem',
            height: '1rem',
            border: '2px solid transparent',
            borderTop: '2px solid currentColor',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
          aria-hidden="true"
        />
      )}
      <span style={{ opacity: loading ? 0.7 : 1 }}>
        {children}
      </span>
    </button>
  );
};

export type { ButtonProps };
export default Button;