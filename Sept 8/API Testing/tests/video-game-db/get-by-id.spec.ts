import { test, expect } from '@playwright/test';

// spec: specs/video-game-db-crud-api-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Video Game DB CRUD API', () => {
  test('Get an existing video game by ID', async ({ request }) => {
    // 1. Send GET https://videogamedb.uk/api/videogame/1 with Accept: application/json.
    const response = await request.get('https://videogamedb.uk/api/videogame/1', {
      headers: { Accept: 'application/json' },
    });
    const game = await response.json();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(game).toEqual({
      id: 1,
      name: 'Resident Evil 4',
      releaseDate: '2005-10-01 23:59:59',
      reviewScore: 85,
      category: 'Shooter',
      rating: 'Universal',
    });
  });
});
