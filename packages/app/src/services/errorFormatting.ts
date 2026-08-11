/**
 * Parse JSON response/request bodies for structured display while preserving
 * plain text and empty bodies unchanged.
 */
export function parseJsonBody(body: string | null): unknown {
  if (!body) {
    return body;
  }

  try {
    return JSON.parse(body) as unknown;
  } catch {
    return body;
  }
}
