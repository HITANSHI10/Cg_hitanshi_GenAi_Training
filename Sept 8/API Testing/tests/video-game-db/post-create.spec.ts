import { test, expect } from '@playwright/test';

// spec: specs/video-game-db-crud-api-test-plan.md
// seed: tests/seed.spec.ts

const gameRequest = {
  category: 'Platform',
  name: 'API Test Game',
  rating: 'Mature',
  releaseDate: '2024-01-15',
  reviewScore: 85,
};

test.describe('Video Game DB CRUD API', () => {
  test('Authenticate and create a video game', async ({ request }) => {
    // 1. Send POST https://videogamedb.uk/api/authenticate with admin credentials.
    const authResponse = await request.post('https://videogamedb.uk/api/authenticate', {
      headers: { Accept: 'application/json' },
      data: { username: 'admin', password: 'admin' },
    });
    const authBody = await authResponse.json();
    const token = authBody.token;

    expect(authResponse.status()).toBe(200);
    expect(authResponse.headers()['content-type']).toContain('application/json');
    expect(token).toEqual(expect.any(String));
    expect(token.length).toBeGreaterThan(0);

    // 2. Send POST /api/videogame with the bearer token and valid VideoGameRequest.
    const response = await request.post('https://videogamedb.uk/api/videogame', {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      data: gameRequest,
      failOnStatusCode: false,
    });
    const game = await response.json();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(game).toEqual(expect.objectContaining({ id: expect.any(Number), ...gameRequest }));
  });
});
