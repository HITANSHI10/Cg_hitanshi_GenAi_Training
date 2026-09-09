import { test, expect } from '@playwright/test';

// spec: specs/video-game-db-crud-api-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Video Game DB CRUD API', () => {
  test('Delete a video game and verify response content', async ({ request }) => {
    // 1. Authenticate and send DELETE https://videogamedb.uk/api/videogame/1.
    const authResponse = await request.post('https://videogamedb.uk/api/authenticate', {
      data: { username: 'admin', password: 'admin' },
    });
    const { token } = await authResponse.json();
    const response = await request.delete('https://videogamedb.uk/api/videogame/1', {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
    });
    const body = await response.text();

    expect(response.status()).toBe(200);
    expect(body).toBe('Video game deleted');
  });
});
