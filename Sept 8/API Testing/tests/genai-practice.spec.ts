import { test, expect } from '@playwright/test';

const baseUrl = 'https://automationexercise.com';

test.describe('GenaiPractice Postman collection', () => {
  test.skip('GET request has no URL configured in Postman', async () => {
    // The collection request is incomplete, so there is no endpoint to exercise.
  });

  test('Search products for tshirt', async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/searchProduct`, {
      form: { search_product: 'tshirt' },
      failOnStatusCode: false,
    });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toEqual(expect.objectContaining({
      responseCode: 200,
      products: expect.any(Array),
    }));
    expect(body.products.length).toBeGreaterThan(0);
    expect(body.products).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: expect.stringMatching(/t-shirt|tshirt/i),
        category: expect.objectContaining({ category: 'Tshirts' }),
      }),
    ]));
  });

  test('Verify login for the configured user', async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/verifyLogin`, {
      form: {
        email: '1234hj@gmail.com',
        password: '111',
      },
      failOnStatusCode: false,
    });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toEqual({ responseCode: 200, message: 'User exists!' });
  });
});