import { test, expect } from '@playwright/test';

// spec: specs/video-game-db-crud-api-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Video Game DB CRUD API', () => {
  test('List all video games returns a JSON array', async ({ request }) => {
    // 1. Send GET https://videogamedb.uk/api/videogame with Accept: application/json.
    const response = await request.get('https://videogamedb.uk/api/videogame', {
      headers: { Accept: 'application/json' },
    });
    const games = await response.json();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(Array.isArray(games)).toBe(true);
    expect(games.length).toBeGreaterThan(0);
    expect(games[0]).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      releaseDate: expect.any(String),
      reviewScore: expect.any(Number),
      category: expect.any(String),
      rating: expect.any(String),
    }));
  });
});
