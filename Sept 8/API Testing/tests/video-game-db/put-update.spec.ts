import { test, expect } from '@playwright/test';

// spec: specs/video-game-db-crud-api-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Video Game DB CRUD API', () => {
  test('Update a video game and verify response content', async ({ request }) => {
    // 1. Authenticate with admin/admin and send PUT /api/videogame/1 with a valid body.
    const authResponse = await request.post('https://videogamedb.uk/api/authenticate', {
      data: { username: 'admin', password: 'admin' },
    });
    const { token } = await authResponse.json();
    const update = {
      category: 'Platform',
      name: 'API Test Game',
      rating: 'Mature',
      releaseDate: '2024-01-15',
      reviewScore: 85,
    };
    const response = await request.put('https://videogamedb.uk/api/videogame/1', {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      data: update,
      failOnStatusCode: false,
    });
    const game = await response.json();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(game).toEqual(expect.objectContaining({ id: 1, ...update }));
  });
});
