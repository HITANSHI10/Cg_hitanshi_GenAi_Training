import { test, expect, APIRequestContext } from '@playwright/test';

type ApiCase = {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  expectedStatus: number;
  expectedBody: 'array' | 'object' | 'text';
};

const baseUrl = 'https://videogamedb.uk';
const gameRequest = {
  category: 'Platform',
  name: 'API Test Game',
  rating: 'Mature',
  releaseDate: '2024-01-15',
  reviewScore: 85,
};

const apiCases: ApiCase[] = [
  { name: 'GET game list', method: 'GET', path: '/api/videogame', expectedStatus: 200, expectedBody: 'array' },
  { name: 'GET game by ID', method: 'GET', path: '/api/videogame/1', expectedStatus: 200, expectedBody: 'object' },
  { name: 'POST game', method: 'POST', path: '/api/videogame', expectedStatus: 200, expectedBody: 'object' },
  { name: 'PUT game', method: 'PUT', path: '/api/videogame/1', expectedStatus: 200, expectedBody: 'object' },
  { name: 'DELETE game', method: 'DELETE', path: '/api/videogame/1', expectedStatus: 200, expectedBody: 'text' },
];

async function authenticate(request: APIRequestContext): Promise<string> {
  const response = await request.post(`${baseUrl}/api/authenticate`, {
    data: { username: 'admin', password: 'admin' },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.token).toEqual(expect.any(String));
  return body.token;
}

test.describe('Video Game DB CRUD API - DDT', () => {
  for (const apiCase of apiCases) {
    test(apiCase.name, async ({ request }, testInfo) => {
      const token = ['POST', 'PUT', 'DELETE'].includes(apiCase.method)
        ? await authenticate(request)
        : undefined;
      const response = await request.fetch(`${baseUrl}${apiCase.path}`, {
        method: apiCase.method,
        headers: {
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...(apiCase.method === 'POST' || apiCase.method === 'PUT' ? { data: gameRequest } : {}),
        failOnStatusCode: false,
      });
      const rawBody = await response.text();
      let body: unknown = rawBody;
      try {
        body = JSON.parse(rawBody);
      } catch {
        // DELETE returns the plain-text body "Video game deleted".
      }

      await testInfo.attach(`${apiCase.method.toLowerCase()}-response`, {
        body: Buffer.from(JSON.stringify({
          request: { method: apiCase.method, path: apiCase.path },
          status: response.status(),
          headers: response.headers(),
          body,
        }, null, 2)),
        contentType: 'application/json',
      });

      expect(response.status()).toBe(apiCase.expectedStatus);
      if (apiCase.expectedBody === 'array') {
        expect(Array.isArray(body)).toBe(true);
      } else if (apiCase.expectedBody === 'object') {
        expect(body).toEqual(expect.objectContaining({ id: expect.any(Number) }));
      } else {
        expect(body).toBe('Video game deleted');
      }
    });
  }
});
