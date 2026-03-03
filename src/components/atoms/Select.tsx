import React from 'react';
import type { FC } from 'react';
import { theme } from '../../tokens/theme';
import { useTranslation } from '../../i18n';
import { useAccessibility, generateAccessibilityId } from '../../accessibility';

export interface SelectOption {
  value: string;
  label?: string;
  labelTranslationKey?: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange'> {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  labelTranslationKey?: string;
  translationParams?: Record<string, string | number>;
  enterActivation?: boolean;
  spaceActivation?: boolean;
  announceOnAction?: string;
}

export const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  size = 'medium',
  disabled = false,
  fullWidth = false,
  className = '',
  id,
  labelTranslationKey,
  translationParams,
  enterActivation = true,
  spaceActivation = true,
  announceOnAction,
  ...props
}) => {
  const { t } = useTranslation();

  const selectId = id || generateAccessibilityId('select');
  const labelId = (label || labelTranslationKey) ? `${selectId}-label` : undefined;
  const displayLabel = labelTranslationKey ? t(labelTranslationKey, translationParams) : label;

  const { ariaAttributes, handleKeyDown, announceAction } = useAccessibility({
    id: selectId,
    'aria-label': displayLabel ?? t('petstore.common.selectLabel'),
    enterActivation,
    spaceActivation,
    ...(announceOnAction ? { announceOnAction } : {}),
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
    announceAction();
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[1],
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyles: React.CSSProperties = {
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    color: theme.colors.secondary[700],
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  };

  const selectStyles: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    minWidth: theme.spacing[48],
    border: `1px solid ${theme.colors.secondary[300]}`,
    borderRadius: theme.borderRadius.md,
    backgroundColor: disabled ? theme.colors.secondary[50] : theme.colors.neutral.white,
    color: theme.colors.secondary[900],
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    fontSize: size === 'small' ? theme.typography.fontSize.sm : size === 'large' ? theme.typography.fontSize.lg : theme.typography.fontSize.base,
    padding: size === 'small'
      ? `${theme.spacing[2]} ${theme.spacing[3]}`
      : size === 'large'
        ? `${theme.spacing[3]} ${theme.spacing[4]}`
        : `${theme.spacing[2.5]} ${theme.spacing[3]}`,
    outline: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  return (
    <div className={`select select--${size} ${className}`.trim()} style={containerStyles}>
      {displayLabel ? (
        <label id={labelId} htmlFor={selectId} style={labelStyles}>
          {displayLabel}
        </label>
      ) : null}

      <select
        id={selectId}
        value={value}
        disabled={disabled}
        style={selectStyles}
        onChange={handleChange}
        onKeyDown={(event) => {
          handleKeyDown(event as unknown as React.KeyboardEvent);
          props.onKeyDown?.(event);
        }}
        aria-labelledby={labelId}
        {...ariaAttributes}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.labelTranslationKey
              ? t(option.labelTranslationKey, translationParams)
              : option.label ?? option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
