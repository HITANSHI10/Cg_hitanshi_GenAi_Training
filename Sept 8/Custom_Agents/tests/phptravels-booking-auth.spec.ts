import { expect, test } from '@playwright/test';

const bookingAuthData = require('../test-data/phptravels-booking-auth.json');
const baseUrl = process.env.PHPTRAVELS_BASE_URL ?? 'https://phptravels.net';

async function dismissDemoNotice(page: import('@playwright/test').Page) {
  const acknowledgeButton = page.locator('#acknowledgeDemoWarning');
  try {
    await acknowledgeButton.waitFor({ state: 'visible', timeout: 15000 });
    await acknowledgeButton.click({ force: true });
  } catch {
    // The notice is not shown on every visit.
  }
}

test.describe('TC-010 through TC-017 and TC-022: booking and authentication data contracts', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      new MutationObserver(() => document.querySelector('#demoWarningModal')?.remove())
        .observe(document, { childList: true, subtree: true });
    });
  });

  test('provides the customer login entry point and validates empty credentials', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await dismissDemoNotice(page);
    const loginLink = page.getByRole('link', { name: /customer login|login/i }).first();
    await expect(loginLink).toBeVisible();
    await loginLink.click();
    await expect(page.locator('body')).toContainText(/login|sign in/i);

    const loginButton = page.getByRole('button', { name: /login|sign in/i }).first();
    if (await loginButton.isVisible()) {
      await loginButton.click();
      await expect(page.locator('body')).toContainText(/required|invalid|email|password/i);
    }
  });

  test('keeps synthetic auth and payment fixtures free of real production values', async () => {
    expect(bookingAuthData.auth.customer.validLogin.email).toContain('@example.com');
    expect(bookingAuthData.auth.customer.validSignup.email).toContain('@example.com');
    expect(bookingAuthData.payment.valid.paymentMethod).toMatch(/sandbox/i);
    expect(bookingAuthData.payment.valid.termsAccepted).toBe(true);
    expect(bookingAuthData.payment.invalid).toHaveLength(2);
  });

  test('contains valid single and multiple traveller records', async () => {
    expect(bookingAuthData.travellers.validSingle).toHaveLength(1);
    expect(bookingAuthData.travellers.validMultiple.length).toBeGreaterThan(1);
    for (const traveller of bookingAuthData.travellers.validMultiple) {
      expect(traveller.firstName).toBeTruthy();
      expect(traveller.lastName).toBeTruthy();
      expect(traveller.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
    }
  });

  test('contains negative fixtures for traveller and payment validation', async () => {
    expect(bookingAuthData.travellers.invalid.some((traveller: { email: string }) => !traveller.email || !traveller.email.includes('@'))).toBe(true);
    expect(bookingAuthData.payment.invalid.some((payment: { termsAccepted: boolean }) => !payment.termsAccepted)).toBe(true);
    expect(bookingAuthData.auth.customer.invalidLogin).toHaveLength(3);
    expect(bookingAuthData.auth.agent.invalidSignup).toHaveLength(1);
  });
});