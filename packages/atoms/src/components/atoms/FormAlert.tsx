import type { CSSProperties, FC, HTMLAttributes } from 'react';
import { theme } from '../../tokens/theme';

export interface FormAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'role'> {
  /** Alert text to announce and display */
  message: string;
  /** Visual tone of the alert */
  tone?: 'error' | 'warning' | 'info' | 'success';
}

const getToneStyles = (tone: NonNullable<FormAlertProps['tone']>): CSSProperties => {
  switch (tone) {
    case 'warning':
      return {
        color: theme.colors.semantic.warningDark,
        background: theme.colors.semantic.warningLight,
        border: `1px solid ${theme.colors.semantic.warning}`,
      };
    case 'info':
      return {
        color: theme.colors.semantic.infoDark,
        background: theme.colors.semantic.infoLight,
        border: `1px solid ${theme.colors.semantic.info}`,
      };
    case 'success':
      return {
        color: theme.colors.semantic.successDark,
        background: theme.colors.semantic.successLight,
        border: `1px solid ${theme.colors.semantic.success}`,
      };
    default:
      return {
        color: theme.colors.semantic.errorDark,
        background: '#fef2f2',
        border: `1px solid ${theme.colors.semantic.errorLight}`,
      };
  }
};

export const FormAlert: FC<FormAlertProps> = ({
  message,
  tone = 'error',
  className = '',
  'aria-live': ariaLive,
  ...props
}) => {
  const toneStyles = getToneStyles(tone);
  const formAlertStyles: CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    marginBottom: theme.spacing[3],
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    borderRadius: theme.borderRadius.md,
    ...toneStyles,
  };

  return (
    <div
      data-component="FormAlert"
      data-variant={tone}
      role="alert"
      aria-live={ariaLive ?? (tone === 'error' || tone === 'warning' ? 'assertive' : 'polite')}
      className={`form-alert form-alert--${tone} ${className}`.trim()}
      style={formAlertStyles}
      {...props}
    >
      {message}
    </div>
  );
};

export default FormAlert;
