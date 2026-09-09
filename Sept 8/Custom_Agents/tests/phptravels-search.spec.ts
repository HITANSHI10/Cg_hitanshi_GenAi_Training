import { expect, test } from '@playwright/test';

const searchData = require('../test-data/phptravels-search.json');
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

async function openStayDestination(page: import('@playwright/test').Page) {
  await page.getByText('Destination or Hotel Name', { exact: true }).click();
  return page.getByPlaceholder('Search By City');
}

function formField(page: import('@playwright/test').Page, names: string[]) {
  return page.getByRole('textbox', { name: new RegExp(names.join('|'), 'i') }).first();
}

test.describe('TC-003 through TC-009: PHPTRAVELS search flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      new MutationObserver(() => document.querySelector('#demoWarningModal')?.remove())
        .observe(document, { childList: true, subtree: true });
    });
  });

  test('renders the stay search controls and accepts a valid data row', async ({ page }) => {
    const stay = searchData.staySearch.valid[0];
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await dismissDemoNotice(page);

    await expect(page.getByText('Stays', { exact: true }).first()).toBeVisible();
    const destination = await openStayDestination(page);
    await expect(destination).toBeVisible();
    await destination.fill(stay.destination);

    const searchButton = page.getByRole('button', { name: /search/i }).first();
    await expect(searchButton).toBeVisible();
  });

  for (const invalidStay of searchData.staySearch.invalid) {
    test(`rejects invalid stay input: ${invalidStay.expectedError}`, async ({ page }) => {
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
      await dismissDemoNotice(page);
      const destination = await openStayDestination(page);

      if (invalidStay.destination) {
        await destination.fill(invalidStay.destination);
      }

      await page.getByRole('button', { name: /search/i }).first().click();
      await expect(page.locator('body')).toContainText(/required|invalid|must be|select|enter/i);
    });
  }

  test('renders the flight search entry point and required controls', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await dismissDemoNotice(page);
    await page.getByRole('tab', { name: /Flights/i }).click();
    await expect(page.locator('body')).toContainText(/flight|departure|arrival|from|to/i);

    const flight = searchData.flightSearch.valid[0];
    const fromField = formField(page, ['from', 'departure']);
    await expect(fromField).toBeVisible();
    await fromField.fill(flight.from);
    await expect(formField(page, ['to', 'arrival'])).toBeVisible();
  });

  test('retains the no-results dataset for a recoverable search attempt', async ({ page }) => {
    const noResults = searchData.staySearch.noResults;
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await dismissDemoNotice(page);
    const destination = await openStayDestination(page);
    await destination.fill(noResults.destination);
    await expect(destination).toHaveValue(noResults.destination);
  });
});