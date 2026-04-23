// Shared test bootstrap for service-layer tests only.
// Must run before importing apiClient to satisfy resolveBaseUrl at module load time.
const testWindow = (globalThis as any).window;
if (testWindow && !testWindow.__RUNTIME_CONFIG__?.API_BASE_URL) {
  testWindow.__RUNTIME_CONFIG__ = {
    ...(testWindow.__RUNTIME_CONFIG__ ?? {}),
    API_BASE_URL: 'http://localhost/api',
  };
}

export {};
