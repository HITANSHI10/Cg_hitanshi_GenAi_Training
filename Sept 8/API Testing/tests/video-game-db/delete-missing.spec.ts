import { test, expect } from '@playwright/test';

// spec: specs/video-game-db-crud-api-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Video Game DB CRUD API', () => {
  test('Delete a missing video game returns 404', async ({ request }) => {
    // 1. Authenticate and send DELETE /api/videogame/999999.
    const authResponse = await request.post('https://videogamedb.uk/api/authenticate', {
      data: { username: 'admin', password: 'admin' },
    });
    const { token } = await authResponse.json();
    const response = await request.delete('https://videogamedb.uk/api/videogame/999999', {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
    });
    const error = await response.json();

    expect(response.status()).toBe(404);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(error).toEqual(expect.objectContaining({ status: 404 }));
  });
});
