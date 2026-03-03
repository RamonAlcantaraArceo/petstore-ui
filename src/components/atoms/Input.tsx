import React from 'react';
import type { FC } from 'react';
import { theme } from '../../tokens/theme';
import { useTranslation } from '../../i18n';
import { useAccessibility, generateAccessibilityId } from '../../accessibility';


/**
 * Input component with validation states, comprehensive accessibility, and internationalization.
 * Supports various input types, validation states, helper text, and full a11y compliance.
 * 
 * @example
 * ```tsx
 * <Input
 *   type="email"
 *   placeholder={t('components.input.emailPlaceholder')}
 *   label={t('components.input.examples.email')}
 *   required
 * />
 * 
 * <Input
 *   type="text"
 *   value={value}
 *   onChange={handleChange}
 *   validationState="error"
 *   errorMessage={t('components.input.invalid')}
 *   ariaLabel={t('components.input.ariaInvalid', { label: 'Name' })}
 * />
 * ```
 */
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
  /** Use default translation for aria-label if none provided */
  useDefaultAriaLabel?: boolean;
  /** Translation key for label */
  labelTranslationKey?: string;
  /** Translation key for placeholder */
  placeholderTranslationKey?: string;
  /** Translation key for helper text */
  helperTextTranslationKey?: string;
  /** Translation key for error message */
  errorTranslationKey?: string;
  /** Parameters for translation interpolation */
  translationParams?: Record<string, string | number>;
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
  useDefaultAriaLabel = true,
  labelTranslationKey,
  placeholderTranslationKey,
  helperTextTranslationKey,
  errorTranslationKey,
  translationParams,
  ...props
}) => {
  const { t } = useTranslation();
  
  // Generate stable IDs for accessibility relationships
  const inputId = id || generateAccessibilityId('input');
  const helperId = (helperText || errorMessage || helperTextTranslationKey || errorTranslationKey) ? `${inputId}-helper` : undefined;
  const labelId = label || labelTranslationKey ? `${inputId}-label` : undefined;
  
  // Use accessibility hook for comprehensive a11y features
  const {
    ariaAttributes,
    announceChange,
    handleKeyDown
  } = useAccessibility({
    id: inputId,
    announceOnChange: () => 'Input changed',
    accessibilityError: validationState === 'error'
  });
  
  // Get translated content
  const displayLabel = labelTranslationKey 
    ? t(labelTranslationKey, translationParams) 
    : label;
    
  const displayPlaceholder = placeholderTranslationKey 
    ? t(placeholderTranslationKey, translationParams)
    : props.placeholder;
    
  const displayHelperText = helperTextTranslationKey 
    ? t(helperTextTranslationKey, translationParams)
    : helperText;
    
  const displayErrorMessage = errorTranslationKey 
    ? t(errorTranslationKey, translationParams)
    : errorMessage;
  
  // Generate accessible aria-label
  const getAriaLabel = () => {
    if (ariaAttributes['aria-label']) {
      return ariaAttributes['aria-label'];
    }
    
    if (!useDefaultAriaLabel) {
      return undefined;
    }
    
    const labelText = displayLabel || 'input field';
    
    if (validationState === 'error') {
      return t('components.input.ariaInvalid', { label: labelText });
    }
    
    if (required) {
      return t('components.input.ariaRequired', { label: labelText });
    }
    
    return t('components.input.ariaLabel', { label: labelText });
  };
  
  // Enhanced change handler with announcements
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    // Announce changes for screen readers if configured
    if (announceChange) {
      announceChange(value);
    }
    
    props.onChange?.(event);
  };
  
  // Enhanced keyboard handler
  const handleKeyDownEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(event as any);
    props.onKeyDown?.(event);
  };

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

  const displayedHelperText = validationState === 'error' 
    ? displayErrorMessage || displayHelperText 
    : displayHelperText;

  return (
    <div style={containerStyles}>
      {displayLabel && (
        <label 
          htmlFor={inputId} 
          id={labelId}
          style={labelStyles}
        >
          {displayLabel}
          {required && (
            <span 
              style={{ color: theme.colors.semantic.error, marginLeft: theme.spacing[1] }}
              aria-label={t('accessibility.labels.required')}
            >
              *
            </span>
          )}
        </label>
      )}
      <div style={inputWrapperStyles}>
        {startIcon && (
          <span 
            style={startIconStyles} 
            aria-hidden="true"
            role="img"
          >
            {startIcon}
          </span>
        )}
        <input
          id={inputId}
          className={inputClasses}
          style={inputStyles}
          disabled={disabled}
          required={required}
          placeholder={displayPlaceholder}
          aria-invalid={validationState === 'error'}
          aria-describedby={helperId}
          aria-labelledby={labelId}
          aria-label={!displayLabel ? getAriaLabel() : undefined}
          aria-required={required}
          onChange={handleChange}
          onKeyDown={handleKeyDownEvent}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.borderColor = theme.colors.primary[500];
              e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.colors.primary[500]}20`;
            }
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = getValidationColor();
            e.currentTarget.style.boxShadow = 'none';
            props.onBlur?.(e);
          }}
          {...ariaAttributes}
          {...(props as any)} // Spread remaining props
        />
        {endIcon && (
          <span 
            style={endIconStyles} 
            aria-hidden="true"
            role="img"
          >
            {endIcon}
          </span>
        )}
      </div>
      {displayedHelperText && (
        <span 
          id={helperId} 
          style={helperTextStyles} 
          role={validationState === 'error' ? 'alert' : 'status'}
          aria-live={validationState === 'error' ? 'assertive' : 'polite'}
          aria-atomic="true"
        >
          {displayedHelperText}
        </span>
      )}
    </div>
  );
};

export type { InputProps };
export default Input;