import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { theme } from '../../tokens/theme';

export interface TabButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Whether the tab is currently selected */
  selected: boolean;
  /** Visual presentation for the tab button */
  appearance?: 'underline' | 'pill';
  /** Accessible controls relationship */
  controls?: string;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Tab label */
  children: React.ReactNode;
}

const getUnderlineStyles = (selected: boolean): React.CSSProperties => ({
  border: 'none',
  borderBottom: `2px solid ${selected ? theme.colors.primary[500] : 'transparent'}`,
  background: 'transparent',
  color: selected ? theme.colors.primary[700] : theme.colors.secondary[600],
  padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing[2],
  fontFamily: theme.typography.fontFamily.sans.join(', '),
  fontSize: theme.typography.fontSize.sm,
  fontWeight: selected ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.medium,
  cursor: 'pointer',
});

const getPillStyles = (selected: boolean, disabled: boolean): React.CSSProperties => ({
  border: `1px solid ${selected ? 'var(--color-primary)' : 'var(--color-border-strong)'}`,
  background: selected ? 'var(--color-primary-soft)' : 'var(--color-surface)',
  color: 'var(--color-text)',
  borderRadius: theme.borderRadius.md,
  padding: '6px 10px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing[2],
  fontFamily: theme.typography.fontFamily.sans.join(', '),
  fontSize: theme.typography.fontSize.xs,
  lineHeight: theme.typography.lineHeight.tight,
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.45 : 1,
});

export const TabButton = React.forwardRef<HTMLButtonElement, TabButtonProps>(
  (
    {
      selected,
      appearance = 'underline',
      controls,
      icon,
      className = '',
      children,
      disabled = false,
      tabIndex,
      style,
      ...props
    },
    ref,
  ) => {
    const buttonStyles =
      appearance === 'pill' ? getPillStyles(selected, disabled) : getUnderlineStyles(selected);

    return (
      <button
        data-component="TabButton"
        data-appearance={appearance}
        ref={ref}
        type="button"
        role="tab"
        aria-selected={selected}
        aria-controls={controls}
        aria-disabled={disabled}
        disabled={disabled}
        tabIndex={tabIndex ?? (selected ? 0 : -1)}
        className={className}
        style={{ ...buttonStyles, ...style }}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  },
);

TabButton.displayName = 'TabButton';

export default TabButton;
