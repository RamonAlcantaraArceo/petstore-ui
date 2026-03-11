import type { CSSProperties, FC } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from '../../i18n';
import { theme } from '../../tokens/theme';

type Orientation = 'horizontal' | 'vertical';

export interface VisualSliderCompareProps {
  expectedUrl: string | null;
  actualUrl: string | null;
  altBase: string;
}

export const VisualSliderCompare: FC<VisualSliderCompareProps> = ({
  expectedUrl,
  actualUrl,
  altBase,
}) => {
  const { t } = useTranslation();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const rangeId = useId();
  const [value, setValue] = useState(50);
  const [orientation, setOrientation] = useState<Orientation>('horizontal');

  useEffect(() => {
    setValue(50);
  }, [orientation, expectedUrl, actualUrl]);

  const emptyStyle: CSSProperties = {
    color: theme.colors.neutral.gray[400],
    border: `1px dashed ${theme.colors.secondary[600]}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[3],
  };

  if (!expectedUrl || !actualUrl) {
    return (
      <div
        style={{
          border: `1px solid ${theme.colors.secondary[800]}`,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing[3],
        }}
      >
        <div style={emptyStyle}>{t('visualReport.messages.missingExpectedActual')}</div>
      </div>
    );
  }

  const dividerPosition = `${value}%`;
  const actualClipPath =
    orientation === 'vertical' ? `inset(0 0 ${100 - value}% 0)` : `inset(0 ${100 - value}% 0 0)`;

  const rootStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: `1px solid ${theme.colors.secondary[800]}`,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    background: theme.colors.secondary[950],
    padding: theme.spacing[3],
    width: '100%',
  };

  const sliderStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '100%',
    minHeight: '200px',
    overflow: 'hidden',
  };

  const imgStyle: CSSProperties = {
    display: 'block',
    width: '100%',
    height: 'auto',
    userSelect: 'none',
    pointerEvents: 'none',
  };

  const topLayerStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    clipPath: actualClipPath,
  };

  const dividerStyle: CSSProperties =
    orientation === 'vertical'
      ? {
          position: 'absolute',
          left: 0,
          right: 0,
          top: dividerPosition,
          height: '2px',
          background: theme.colors.primary[400],
        }
      : {
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: dividerPosition,
          width: '2px',
          background: theme.colors.primary[400],
        };

  const updateFromPointer = (clientX: number, clientY: number) => {
    const host = sliderRef.current;
    if (!host) {
      return;
    }

    const bounds = host.getBoundingClientRect();
    if (!bounds.width || !bounds.height) {
      return;
    }

    const next =
      orientation === 'vertical'
        ? Math.round(
            (Math.min(Math.max(clientY - bounds.top, 0), bounds.height) / bounds.height) * 100,
          )
        : Math.round(
            (Math.min(Math.max(clientX - bounds.left, 0), bounds.width) / bounds.width) * 100,
          );

    setValue(next);
  };

  return (
    <div style={rootStyle}>
      <div
        ref={sliderRef}
        style={sliderStyle}
        onPointerDown={(event) => updateFromPointer(event.clientX, event.clientY)}
        onPointerMove={(event) => {
          if (event.buttons === 1) {
            updateFromPointer(event.clientX, event.clientY);
          }
        }}
      >
        <img src={expectedUrl} alt={`${altBase} expected`} draggable={false} style={imgStyle} />
        <div style={topLayerStyle}>
          <img src={actualUrl} alt={`${altBase} actual`} draggable={false} style={imgStyle} />
        </div>
        <div style={dividerStyle} />
      </div>
      <div
        style={{
          marginTop: theme.spacing[2],
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: theme.spacing[2],
        }}
      >
        <label
          htmlFor={rangeId}
          style={{ color: theme.colors.neutral.gray[400], fontSize: theme.typography.fontSize.xs }}
        >
          {t('visualReport.modes.slider')}
        </label>
        <button
          type="button"
          style={{
            border: `1px solid ${theme.colors.secondary[600]}`,
            background: theme.colors.secondary[900],
            color: theme.colors.neutral.gray[200],
            borderRadius: theme.borderRadius.md,
            padding: '4px 8px',
            cursor: 'pointer',
          }}
          onClick={() =>
            setOrientation((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'))
          }
        >
          {orientation === 'vertical'
            ? t('visualReport.modes.slideUpDown')
            : t('visualReport.modes.slideLeftRight')}
        </button>
      </div>
      <input
        id={rangeId}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        aria-label={t('visualReport.modes.sliderAria')}
        style={{ width: '100%', marginTop: theme.spacing[2] }}
      />
    </div>
  );
};
