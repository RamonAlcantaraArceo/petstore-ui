export const getAssetUrl = (
  url: string | null | undefined,
  generatedAt: string | undefined,
): string | null => {
  if (!url) {
    return null;
  }

  if (!generatedAt) {
    return url;
  }

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${encodeURIComponent(generatedAt)}`;
};
