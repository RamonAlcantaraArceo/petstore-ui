import type { CSSProperties, FC } from 'react';
import { useMemo } from 'react';
import { theme } from '../../tokens/theme';
import { DEFAULT_COMPARISON_MODE } from '../../visual-report/constants';
import { resolveSelectableMode } from '../../visual-report/model';
import type { ComparisonMode, VisualStory, VisualVariant } from '../../visual-report/types';
import { VisualStatusBadge } from '../atoms/VisualStatusBadge';
import { VisualComparisonPanel } from '../molecules/VisualComparisonPanel';
import { VisualModeControls } from '../molecules/VisualModeControls';

export interface VisualVariantCardProps {
  story: VisualStory;
  variant: VisualVariant;
  generatedAt?: string;
  activeMode: ComparisonMode;
  onModeChange: (variantKey: string, mode: ComparisonMode) => void;
}

export const VisualVariantCard: FC<VisualVariantCardProps> = ({
  story,
  variant,
  generatedAt,
  activeMode,
  onModeChange,
}) => {
  const variantKey = `${story.id}::${variant.viewport}`;
  const panelId = `variant-${variantKey.replace(/[^a-zA-Z0-9_-]/g, '-')}-panel`;
  const baseAlt = `${story.name} ${variant.viewport}`;

  const selectableModes = useMemo(() => {
    if (variant.status === 'passed') {
      return ['actual', 'expected', 'side-by-side', 'slider'] as ComparisonMode[];
    }

    return ['diff', 'actual', 'expected', 'side-by-side', 'slider'] as ComparisonMode[];
  }, [variant.status]);

  const selectedMode =
    resolveSelectableMode(activeMode, selectableModes) ?? DEFAULT_COMPARISON_MODE;

  const cardStyle: CSSProperties = {
    border: `1px solid ${theme.colors.secondary[800]}`,
    borderRadius: theme.borderRadius.xl,
    background: theme.colors.secondary[900],
    padding: theme.spacing[3],
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[2.5],
    marginBottom: theme.spacing[2.5],
  };

  return (
    <article style={cardStyle}>
      <header style={headerStyle}>
        <h3 style={{ margin: 0, fontSize: theme.typography.fontSize.sm }}>
          {story.name} · {variant.viewport}
        </h3>
        <VisualStatusBadge status={variant.status} />
      </header>

      <VisualModeControls
        variant={variant}
        variantKey={variantKey}
        activeMode={selectedMode}
        onModeChange={(mode) => onModeChange(variantKey, mode)}
      />

      <div
        id={panelId}
        role="tabpanel"
        aria-label={`Comparison preview for ${story.name} ${variant.viewport}`}
        style={{ minWidth: 0 }}
      >
        <VisualComparisonPanel
          mode={selectedMode}
          generatedAt={generatedAt}
          expected={variant.expected}
          actual={variant.actual}
          diff={variant.diff ?? null}
          altBase={baseAlt}
        />
      </div>
    </article>
  );
};
