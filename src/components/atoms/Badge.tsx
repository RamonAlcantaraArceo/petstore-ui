import React from 'react';
import type { FC } from 'react';
import { theme } from '../../tokens/theme';
import { useTranslation } from '../../i18n';
import { useAccessibility } from '../../accessibility';

export interface BadgeProps {
  variant?: 'available' | 'pending' | 'sold' | 'placed' | 'approved' | 'delivered' | 'info' | 'default';
  size?: 'small' | 'medium';
  children?: React.ReactNode;
  className?: string;
  labelTranslationKey?: string;
  translationParams?: Record<string, string | number>;
}

export const Badge: FC<BadgeProps> = ({
  variant = 'default',
  size = 'medium',
  children,
  className = '',
  labelTranslationKey,
  translationParams,
}) => {
  const { t } = useTranslation();
  const { ariaAttributes } = useAccessibility({});

  const label = labelTranslationKey ? t(labelTranslationKey, translationParams) : children;

  const getColors = (): { backgroundColor: string; color: string } => {
    switch (variant) {
      case 'available':
      case 'approved':
        return { backgroundColor: theme.colors.semantic.successLight, color: theme.colors.semantic.successDark };
      case 'pending':
      case 'placed':
        return { backgroundColor: theme.colors.semantic.warningLight, color: theme.colors.semantic.warningDark };
      case 'sold':
      case 'delivered':
        return { backgroundColor: theme.colors.semantic.infoLight, color: theme.colors.semantic.infoDark };
      case 'info':
        return { backgroundColor: theme.colors.primary[100], color: theme.colors.primary[700] };
      default:
        return { backgroundColor: theme.colors.secondary[100], color: theme.colors.secondary[700] };
    }
  };

  const { backgroundColor, color } = getColors();

  const badgeStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.full,
    backgroundColor,
    color,
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    fontWeight: theme.typography.fontWeight.semibold,
    fontSize: size === 'small' ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.tight,
    padding: size === 'small' ? `${theme.spacing[1]} ${theme.spacing[2]}` : `${theme.spacing[1.5]} ${theme.spacing[3]}`,
    whiteSpace: 'nowrap',
  };

  return (
    <span
      className={`badge badge--${variant} badge--${size} ${className}`.trim()}
      style={badgeStyles}
      {...ariaAttributes}
      aria-label={typeof label === 'string' ? label : undefined}
    >
      {label}
    </span>
  );
};

export default Badge;
