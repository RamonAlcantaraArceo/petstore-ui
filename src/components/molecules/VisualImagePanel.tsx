import type { CSSProperties, FC } from 'react';
import { useTranslation } from '../../i18n';
import { theme } from '../../tokens/theme';

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
    border: `1px solid ${theme.colors.secondary[800]}`,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    background: theme.colors.secondary[950],
    padding: theme.spacing[3],
    minHeight: '120px',
  };

  const emptyStyle: CSSProperties = {
    color: theme.colors.neutral.gray[400],
    border: `1px dashed ${theme.colors.secondary[600]}`,
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
