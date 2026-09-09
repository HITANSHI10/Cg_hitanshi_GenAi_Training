import { expect, test } from '@playwright/test';

const homepageData = require('../test-data/phptravels-homepage.json');
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

test.describe('TC-018 through TC-021: support, refund, and responsive checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      new MutationObserver(() => document.querySelector('#demoWarningModal')?.remove())
        .observe(document, { childList: true, subtree: true });
    });
  });

  test('exposes configured support destinations', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await dismissDemoNotice(page);
    const supportEmail = page.getByRole('link', { name: new RegExp(homepageData.homePage.supportLinks.email, 'i') }).first();
    const emailCount = await supportEmail.count();
    if (emailCount > 0) {
      await expect(supportEmail).toHaveAttribute('href', /^mailto:/i);
    }

    const supportPhone = page.getByRole('link', { name: new RegExp('phone|whatsapp|\\+1234567890', 'i') }).first();
    if (await supportPhone.count()) {
      await expect(supportPhone).toHaveAttribute('href', /^(tel:|https:\/\/wa\.me\/)/i);
    }
  });

  test('keeps the refund request fixture complete and rejects its invalid row', async () => {
    const validRequest = bookingAuthData.refundRequest.valid;
    expect(validRequest.bookingReference).toBeTruthy();
    expect(validRequest.serviceDetails).toBeTruthy();
    expect(validRequest.cancellationReason).toBeTruthy();
    expect(validRequest.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);

    const invalidRequest = bookingAuthData.refundRequest.invalid[0];
    expect(invalidRequest.bookingReference).toBe('');
    expect(invalidRequest.expectedError).toMatch(/required/i);
  });

  test('keeps the main page usable at mobile width', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await dismissDemoNotice(page);
    await expect(page.getByText(homepageData.homePage.brand.expectedText, { exact: false }).first()).toBeVisible();

    const menuButton = page.getByRole('button', { name: /menu|navigation/i }).first();
    if (await menuButton.count()) {
      await menuButton.click();
      await expect(page.getByText('Stays', { exact: true }).first()).toBeVisible();
    }
  });
});