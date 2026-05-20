import { http, HttpResponse } from 'msw';

export const mswHandlers = {
  petstore: [
    http.get('https://petstore3.swagger.io/api/v3/pet/findByStatus', ({ request }) => {
      const url = new URL(request.url);
      const status = url.searchParams.get('status') ?? 'available';

      return HttpResponse.json([
        {
          id: 101,
          name: `Mocked ${status} pet`,
          category: { id: 1, name: 'Dogs' },
          photoUrls: [],
          tags: [],
          status,
        },
      ]);
    }),
    http.get('/api/v1/pet/findByStatus', ({ request }) => {
      const url = new URL(request.url);
      const status = url.searchParams.get('status') ?? 'available';

      return HttpResponse.json([
        {
          id: 101,
          name: `Mocked ${status} pet`,
          category: { id: 1, name: 'Dogs' },
          photoUrls: [],
          tags: [],
          status,
        },
      ]);
    }),
    http.get('/api/v1/health', () =>
      HttpResponse.json({
        status: 'ok',
        mode: 'mock',
        details: {
          version: 'storybook',
          build_date: '2026-05-20T00:00:00Z',
          git_commit_sha: 'storybook',
        },
      }),
    ),
  ],
};
