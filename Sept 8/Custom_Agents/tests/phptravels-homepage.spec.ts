import { expect, test } from '@playwright/test';

const homepageData = require('../test-data/phptravels-homepage.json');
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

test.describe('TC-001 and TC-002: PHPTRAVELS homepage and navigation', () => {
  test('shows the brand, booking options, auth links, and demo notice', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    await expect(page.getByText(homepageData.homePage.brand.expectedText, { exact: false }).first()).toBeVisible();
    for (const navigationItem of homepageData.homePage.primaryNavigation.slice(0, 3)) {
      await expect(page.getByText(navigationItem, { exact: true }).first()).toBeVisible();
    }

    const demoNotice = page.locator('#demoWarningModal');
    await expect(demoNotice).toContainText(/simulated/i);
    await expect(demoNotice).toContainText(/sandbox/i);

    await dismissDemoNotice(page);
    await expect(page.getByRole('link', { name: new RegExp('login', 'i') }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /sign ?up|register/i }).first()).toBeVisible();
  });

  test('exposes reachable primary navigation destinations', async ({ page, context }) => {
    await page.addInitScript(() => {
      new MutationObserver(() => document.querySelector('#demoWarningModal')?.remove())
        .observe(document, { childList: true, subtree: true });
    });
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await dismissDemoNotice(page);
    await page.getByRole('button', { name: /Services/i }).click();
    const expectedDestinations = homepageData.homePage.primaryNavigation.slice(0, 3);

    for (const destinationName of expectedDestinations) {
      const link = page.getByRole('link', { name: new RegExp(`${destinationName}.*booking`, 'i') }).first();
      await expect(link).toBeVisible();
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();

      const destinationPage = await context.newPage();
      await destinationPage.goto(new URL(href!, baseUrl).toString(), { waitUntil: 'domcontentloaded' });
      expect(destinationPage.url()).not.toMatch(/about:blank/);
      await destinationPage.close();
    }
  });
});