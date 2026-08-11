// Shared test bootstrap for service-layer tests only.
// Must run before importing apiClient to satisfy resolveBaseUrl at module load time.
type RuntimeConfigWindow = Window & {
  __RUNTIME_CONFIG__?: {
    API_BASE_URL?: string;
    USE_POST_LOGIN_ENDPOINT?: boolean | string;
    use_post_login_endpoint?: boolean | string;
  };
};

const testWindow = (globalThis as { window?: RuntimeConfigWindow }).window;
if (testWindow && !testWindow.__RUNTIME_CONFIG__?.API_BASE_URL) {
  testWindow.__RUNTIME_CONFIG__ = {
    ...(testWindow.__RUNTIME_CONFIG__ ?? {}),
    API_BASE_URL: 'http://localhost/api',
  };
}

export {};
