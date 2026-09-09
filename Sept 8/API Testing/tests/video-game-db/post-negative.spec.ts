import { test, expect } from '@playwright/test';

// spec: specs/video-game-db-crud-api-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Video Game DB CRUD API', () => {
  test('Reject unauthenticated create requests', async ({ request }) => {
    // 1. Send POST /api/videogame without a bearer token using a valid JSON body.
    const response = await request.post('https://videogamedb.uk/api/videogame', {
      headers: { Accept: 'application/json' },
      data: {
        category: 'Platform',
        name: 'Unauthorized API Test Game',
        rating: 'Mature',
        releaseDate: '2024-01-15',
        reviewScore: 85,
      },
      failOnStatusCode: false,
    });
    const error = await response.json();

    expect(response.status()).toBe(403);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(error).toEqual(expect.objectContaining({
      status: 403,
      error: 'Forbidden',
      path: '/api/videogame',
    }));
  });
});
