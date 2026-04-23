// Debug locale: always returns the key as the translation value
// Supports any key, any nesting, and param interpolation for debugging

/**
 * Debug locale for i18n: always returns the key as the value.
 * Usage: t('some.key') => 'some.key'
 */
const debugLocale = new Proxy(
  {},
  {
    get: (_target, prop) => {
      // Return a function for param interpolation, or the key as string
      if (typeof prop === 'string') {
        const key = prop;
        const fn = (params?: Record<string, unknown>) => {
          if (params && Object.keys(params).length > 0) {
            // Show params for debugging
            return `${key} ${JSON.stringify(params)}`;
          }
          return key;
        };
        fn.toString = () => key;
        return fn;
      }
      return undefined;
    },
  },
);

export default debugLocale;
