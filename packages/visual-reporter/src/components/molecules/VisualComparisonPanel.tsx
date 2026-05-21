import type { CSSProperties, FC } from 'react';
import { useTranslation } from '../../i18n';
import type { ComparisonMode } from '../../visual-report/types';
import { getAssetUrl } from '../../visual-report/assets';
import { VisualImagePanel } from './VisualImagePanel';
import { VisualSliderCompare } from './VisualSliderCompare';

export interface VisualComparisonPanelProps {
  mode: ComparisonMode;
  generatedAt: string | undefined;
  expected: string | null;
  actual: string | null;
  diff?: string | null;
  altBase: string;
}

export const VisualComparisonPanel: FC<VisualComparisonPanelProps> = ({
  mode,
  generatedAt,
  expected,
  actual,
  diff,
  altBase,
}) => {
  const { t } = useTranslation();

  const expectedUrl = getAssetUrl(expected, generatedAt);
  const actualUrl = getAssetUrl(actual, generatedAt);
  const diffUrl = getAssetUrl(diff ?? null, generatedAt);

  if (mode === 'diff') {
    return (
      <VisualImagePanel
        imageUrl={diffUrl}
        altText={`${altBase} diff`}
        missingKey="visualReport.messages.missingDiff"
      />
    );
  }

  if (mode === 'actual') {
    return (
      <VisualImagePanel
        imageUrl={actualUrl}
        altText={`${altBase} actual`}
        missingKey="visualReport.messages.missingActual"
      />
    );
  }

  if (mode === 'expected') {
    return (
      <VisualImagePanel
        imageUrl={expectedUrl}
        altText={`${altBase} expected`}
        missingKey="visualReport.messages.missingExpected"
      />
    );
  }

  if (mode === 'side-by-side') {
    const wrapStyle: CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: '10px',
    };

    const labelStyle: CSSProperties = {
      margin: '0 0 6px',
      fontSize: '0.8rem',
      fontWeight: 600,
    };

    return (
      <div style={wrapStyle}>
        <section>
          <h4 style={labelStyle}>{t('visualReport.modes.expected')}</h4>
          <VisualImagePanel
            imageUrl={expectedUrl}
            altText={`${altBase} expected`}
            missingKey="visualReport.messages.missingExpected"
          />
        </section>
        <section>
          <h4 style={labelStyle}>{t('visualReport.modes.actual')}</h4>
          <VisualImagePanel
            imageUrl={actualUrl}
            altText={`${altBase} actual`}
            missingKey="visualReport.messages.missingActual"
          />
        </section>
      </div>
    );
  }

  return <VisualSliderCompare expectedUrl={expectedUrl} actualUrl={actualUrl} altBase={altBase} />;
};
