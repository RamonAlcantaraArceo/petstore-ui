import React from 'react';
import type { FC, ButtonHTMLAttributes } from 'react';
import { theme } from '../../tokens/theme';

/**
 * Button component for user interactions
 * 
 * A versatile button component that supports multiple variants, sizes, and states.
 * Follows atomic design principles as a foundational atom component.
 * 
 * @example
 * ```tsx
 * <Button variant=\"primary\" size=\"medium\" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 * 
 * @example
 * ```tsx
 * <Button variant=\"secondary\" size=\"large\" disabled>
 *   Disabled Button
 * </Button>
 * ```
 */
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  /** Size of the button */
  size?: 'small' | 'medium' | 'large';
  /** Button type for form usage */
  type?: 'button' | 'submit' | 'reset';
  /** Loading state - shows spinner and disables interaction */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Button content */
  children: React.ReactNode;

}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  type = 'button',
  loading = false,
  fullWidth = false,
  disabled = false,
  className = '',
  children,
  ...props

}) => {
  const baseClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width',
    loading && 'btn--loading',
    className,

  ]
    .filter(Boolean)
    .join(' ');

  const isDisabled = disabled || loading;

  return (
    < button
      type={type}
      className={baseClasses}
      disabled={isDisabled}
      aria - busy= { loading }
  aria - describedby={ loading ? `${props.id || 'button'}-loading` : undefined }
  {...props } 
   >
    { loading && (
      < span
        className=\"btn__spinner\"
  role =\"status\"
  aria - label=\"Loading\"
  id = {`${props.id || 'button'}-loading`
}
          >
  <svg
    className=\"btn__spinner-icon\"
width =\"16\"
height =\"16\"
viewBox =\"0 0 24 24\"
fill =\"none\"
xmlns =\"http://www.w3.org/2000/svg\"
  >
  <circle
    cx=\"12\"
cy =\"12\"
r =\"10\"
stroke =\"currentColor\"
strokeWidth =\"2\"
strokeLinecap =\"round\"
strokeDasharray =\"32\"
strokeDashoffset =\"32\"
  >
  <animate
    attributeName=\"stroke-dashoffset\"
values =\"32;0;32\"
dur =\"1.5s\"
repeatCount =\"indefinite\"
  />
              </circle >
            </svg >
          </span >
        )}
<span className={`btn__content ${loading ? 'btn__content--loading' : ''}`}>
  {children}
</span>
      </button >
    );
  };

export type { ButtonProps };
export default Button;