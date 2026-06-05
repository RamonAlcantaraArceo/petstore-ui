import type { CSSProperties, FC } from 'react';
import { useTranslation } from '@petstore-ui/atoms';
import { theme } from '@petstore-ui/atoms';

export interface VisualImagePanelProps {
  imageUrl: string | null;
  altText: string;
  missingKey: string;
}

export const VisualImagePanel: FC<VisualImagePanelProps> = ({ imageUrl, altText, missingKey }) => {
  const { t } = useTranslation();

  const panelStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--color-border)',
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    background: 'var(--color-main)',
    padding: theme.spacing[3],
    minHeight: '120px',
  };

  const emptyStyle: CSSProperties = {
    color: 'var(--color-text-muted)',
    border: '1px dashed var(--color-border-strong)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[3],
  };

  if (!imageUrl) {
    return (
      <div style={panelStyle}>
        <div style={emptyStyle}>{t(missingKey)}</div>
      </div>
    );
  }

  return (
    <div style={panelStyle}>
      <img
        src={imageUrl}
        alt={altText}
        draggable={false}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};
