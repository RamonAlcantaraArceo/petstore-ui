import type { CSSProperties, FC, KeyboardEvent } from 'react';
import { useMemo } from 'react';
import { useTranslation } from '../../i18n';
import { theme } from '../../tokens/theme';
import { COMPARISON_MODES, DEFAULT_COMPARISON_MODE } from '../../visual-report/constants';
import { resolveSelectableMode } from '../../visual-report/model';
import type { ComparisonMode, VisualVariant } from '../../visual-report/types';

export interface VisualModeControlsProps {
  variant: VisualVariant;
  variantKey: string;
  activeMode: ComparisonMode;
  onModeChange: (mode: ComparisonMode, focusSelected?: boolean) => void;
}

export const VisualModeControls: FC<VisualModeControlsProps> = ({
  variant,
  variantKey,
  activeMode,
  onModeChange,
}) => {
  const { t } = useTranslation();

  const disabledModes = useMemo(() => {
    const blocked = new Set<ComparisonMode>();
    if (variant.status === 'passed') {
      blocked.add('diff');
    }
    return blocked;
  }, [variant.status]);

  const enabledModes = useMemo(
    () =>
      COMPARISON_MODES.filter((mode) => !disabledModes.has(mode.value)).map((mode) => mode.value),
    [disabledModes],
  );

  const idPrefix = `variant-${variantKey.replace(/[^a-zA-Z0-9_-]/g, '-')}`;

  const moveSelection = (direction: number) => {
    const current = resolveSelectableMode(activeMode, enabledModes);
    const index = enabledModes.indexOf(current);
    const nextIndex = (index + direction + enabledModes.length) % enabledModes.length;
    onModeChange(enabledModes[nextIndex] ?? DEFAULT_COMPARISON_MODE, true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      moveSelection(1);
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      moveSelection(-1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      onModeChange(enabledModes[0] ?? DEFAULT_COMPARISON_MODE, true);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      onModeChange(enabledModes[enabledModes.length - 1] ?? DEFAULT_COMPARISON_MODE, true);
    }
  };

  const wrapStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: theme.spacing[2.5],
  };

  return (
    <div role="tablist" aria-label={t('visualReport.modes.ariaLabel')} style={wrapStyle}>
      {COMPARISON_MODES.map((mode) => {
        const disabled = disabledModes.has(mode.value);
        const selected = activeMode === mode.value;
        const style: CSSProperties = {
          border: `1px solid ${selected ? theme.colors.primary[400] : theme.colors.secondary[600]}`,
          background: selected ? theme.colors.primary[950] : theme.colors.secondary[900],
          color: theme.colors.neutral.gray[100],
          borderRadius: theme.borderRadius.md,
          padding: '6px 10px',
          fontSize: theme.typography.fontSize.xs,
          lineHeight: theme.typography.lineHeight.tight,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.45 : 1,
        };

        return (
          <button
            key={mode.value}
            id={`${idPrefix}-tab-${mode.value}`}
            type="button"
            role="tab"
            aria-controls={`${idPrefix}-panel`}
            aria-selected={selected}
            aria-disabled={disabled}
            disabled={disabled}
            tabIndex={selected ? 0 : -1}
            style={style}
            onKeyDown={handleKeyDown}
            onClick={() => !disabled && onModeChange(mode.value)}
          >
            {t(mode.labelKey)}
          </button>
        );
      })}
    </div>
  );
};
