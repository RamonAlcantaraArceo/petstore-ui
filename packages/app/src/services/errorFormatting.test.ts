import { describe, expect, it } from 'vitest';
import { parseJsonBody } from './errorFormatting';

describe('parseJsonBody', () => {
  it('parses JSON bodies for nested pretty-printing', () => {
    expect(parseJsonBody('{"detail":"Invalid credentials."}')).toEqual({
      detail: 'Invalid credentials.',
    });
  });

  it('preserves non-JSON bodies', () => {
    expect(parseJsonBody('Service unavailable')).toBe('Service unavailable');
  });

  it.each([null, ''])('preserves empty body value %s', (body) => {
    expect(parseJsonBody(body)).toBe(body);
  });
});
