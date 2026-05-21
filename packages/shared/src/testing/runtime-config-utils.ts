export const setRuntimeApiBaseUrl = (apiBaseUrl: string): void => {
  const globalThisWithRuntimeConfig = globalThis as typeof globalThis & {
    window?: { __RUNTIME_CONFIG__?: { API_BASE_URL?: string } };
  };

  globalThisWithRuntimeConfig.window = globalThisWithRuntimeConfig.window ?? {};
  globalThisWithRuntimeConfig.window.__RUNTIME_CONFIG__ = {
    API_BASE_URL: apiBaseUrl,
  };
};
