import React from 'react';
import type { FC, InputHTMLAttributes } from 'react';
import { theme } from '../../tokens/theme';

/**
 * Input component with validation states and accessibility features.
 * Supports various input types, validation states, and helper text.
 * 
 * @example
 * ```tsx
 * <Input
 *   type="email"
 *   placeholder="Enter your email"
 *   label="Email Address"
 *   required
 * />
 * 
 * <Input
 *   type="text"
 *   value={value}
 *   onChange={handleChange}
 *   validationState="error"
 *   helperText="Please enter a valid name"
 * />
 * ```
 */
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visual validation state */
  validationState?: 'default' | 'success' | 'warning' | 'error';
  /** Size of the input */
  size?: 'small' | 'medium' | 'large';
  /** Label text for the input */
  label?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Error message displayed when validationState is 'error' */
  errorMessage?: string;
  /** Whether the input should take full width */
  fullWidth?: boolean;
  /** Icon to display at the start of the input */
  startIcon?: React.ReactNode;
  /** Icon to display at the end of the input */
  endIcon?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export const Input: FC<InputProps> = ({
  validationState = 'default',
  size = 'medium',
  label,
  helperText,
  errorMessage,
  fullWidth = false,
  startIcon,
  endIcon,
  className = '',
  disabled = false,
  required = false,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const helperId = helperText || errorMessage ? `${inputId}-helper` : undefined;
  
  const baseClasses = 'input';
  const validationClasses = `input--${validationState}`;
  const sizeClasses = `input--${size}`;
  const fullWidthClass = fullWidth ? 'input--full-width' : '';
  const disabledClass = disabled ? 'input--disabled' : '';
  
  const inputClasses = [
    baseClasses,
    validationClasses,
    sizeClasses,
    fullWidthClass,
    disabledClass,
    className
  ]
    .filter(Boolean)
    .join(' ');

  // Get validation colors
  const getValidationColor = () => {
    switch (validationState) {
      case 'success':
        return theme.colors.semantic.success;
      case 'warning':
        return theme.colors.semantic.warning;
      case 'error':
        return theme.colors.semantic.error;
      default:
        return theme.colors.secondary[300];
    }
  };

  const getValidationBackgroundColor = () => {
    switch (validationState) {
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

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[1],
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.secondary[700],
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    lineHeight: theme.typography.lineHeight.tight,
  };

  const inputWrapperStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  };

  const inputStyles: React.CSSProperties = {
    // Base styles
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    fontSize: size === 'small' ? theme.typography.fontSize.sm : 
              size === 'large' ? theme.typography.fontSize.lg : theme.typography.fontSize.base,
    lineHeight: theme.typography.lineHeight.normal,
    color: theme.colors.secondary[900],
    backgroundColor: disabled ? theme.colors.secondary[50] : getValidationBackgroundColor(),
    border: `1px solid ${getValidationColor()}`,
    borderRadius: theme.borderRadius.md,
    transition: `all ${theme.animation.duration[200]} ${theme.animation.easing.inOut}`,
    outline: 'none',
    width: '100%',

    // Size variants
    ...(size === 'small' && {
      padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
      minHeight: '2rem'
    }),
    ...(size === 'medium' && {
      padding: `${theme.spacing[2.5]} ${theme.spacing[3]}`,
      minHeight: '2.5rem'
    }),
    ...(size === 'large' && {
      padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
      minHeight: '3rem'
    }),

    // Icon padding adjustments
    ...(startIcon && {
      paddingLeft: size === 'small' ? theme.spacing[8] : 
                   size === 'large' ? theme.spacing[12] : theme.spacing[10]
    }),
    ...(endIcon && {
      paddingRight: size === 'small' ? theme.spacing[8] : 
                    size === 'large' ? theme.spacing[12] : theme.spacing[10]
    }),

    // Disabled state
    ...(disabled && {
      cursor: 'not-allowed',
      opacity: 0.6
    })
  };

  const iconWrapperStyles: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    color: theme.colors.secondary[400],
    fontSize: size === 'small' ? theme.typography.fontSize.sm :
              size === 'large' ? theme.typography.fontSize.xl : theme.typography.fontSize.base,
  };

  const startIconStyles: React.CSSProperties = {
    ...iconWrapperStyles,
    left: theme.spacing[3],
  };

  const endIconStyles: React.CSSProperties = {
    ...iconWrapperStyles,
    right: theme.spacing[3],
  };

  const helperTextStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xs,
    lineHeight: theme.typography.lineHeight.tight,
    color: validationState === 'error' ? theme.colors.semantic.error : theme.colors.secondary[600],
    fontFamily: theme.typography.fontFamily.sans.join(', '),
  };

  const displayedHelperText = validationState === 'error' ? errorMessage || helperText : helperText;

  return (
    <div style={containerStyles}>
      {label && (
        <label htmlFor={inputId} style={labelStyles}>
          {label}
          {required && (
            <span style={{ color: theme.colors.semantic.error, marginLeft: theme.spacing[1] }}>
              *
            </span>
          )}
        </label>
      )}
      <div style={inputWrapperStyles}>
        {startIcon && (
          <span style={startIconStyles} aria-hidden="true">
            {startIcon}
          </span>
        )}
        <input
          id={inputId}
          className={inputClasses}
          style={inputStyles}
          disabled={disabled}
          required={required}
          aria-invalid={validationState === 'error'}
          aria-describedby={helperId}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.borderColor = theme.colors.primary[500];
              e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.colors.primary[500]}20`;
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = getValidationColor();
            e.currentTarget.style.boxShadow = 'none';
          }}
          {...props}
        />
        {endIcon && (
          <span style={endIconStyles} aria-hidden="true">
            {endIcon}
          </span>
        )}
      </div>
      {displayedHelperText && (
        <span id={helperId} style={helperTextStyles} role={validationState === 'error' ? 'alert' : undefined}>
          {displayedHelperText}
        </span>
      )}
    </div>
  );
};

export type { InputProps };
export default Input;