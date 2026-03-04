// Debug locale: always returns the key as the translation value
// Supports any key, any nesting, and param interpolation for debugging

const debugProxy: any = new Proxy(
  {},
  {
    get: (_target, prop) => {
      // If accessing a nested object, return another proxy
      if (typeof prop === 'string') {
        return debugProxy;
      }
      return undefined;
    },
    apply: (_target, _thisArg, args) => {
      // If called as a function (for param interpolation), return the key
      return args[0];
    },
  },
);

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
