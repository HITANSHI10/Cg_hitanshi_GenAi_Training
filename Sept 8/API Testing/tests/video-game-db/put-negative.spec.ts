import { test, expect } from '@playwright/test';

// spec: specs/video-game-db-crud-api-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Video Game DB CRUD API', () => {
  test('Handle update of a missing video game', async ({ request }) => {
    // 1. Authenticate and send PUT /api/videogame/999999 with a valid body.
    const authResponse = await request.post('https://videogamedb.uk/api/authenticate', {
      data: { username: 'admin', password: 'admin' },
    });
    const { token } = await authResponse.json();
    const response = await request.put('https://videogamedb.uk/api/videogame/999999', {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      data: {
        category: 'Platform',
        name: 'API Test Game',
        rating: 'Mature',
        releaseDate: '2024-01-15',
        reviewScore: 85,
      },
      failOnStatusCode: false,
    });
    const error = await response.json();

    expect(response.status()).toBe(404);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(error).toEqual(expect.objectContaining({ status: 404 }));
  });
});
