import { test, expect } from '@playwright/test';

// spec: specs/video-game-db-crud-api-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Video Game DB CRUD API', () => {
  test('Get a missing video game returns a structured 404', async ({ request }) => {
    // 1. Send GET https://videogamedb.uk/api/videogame/999999 with Accept: application/json.
    const response = await request.get('https://videogamedb.uk/api/videogame/999999', {
      headers: { Accept: 'application/json' },
    });
    const error = await response.json();

    expect(response.status()).toBe(404);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(error).toEqual(expect.objectContaining({
      status: 404,
      error: 'Not Found',
      path: '/api/videogame/999999',
    }));
    expect(error.timestamp).toEqual(expect.any(String));
  });
});
