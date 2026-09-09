import { test, expect } from '@playwright/test';

async function loginAsStandardUser(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
}

test.describe('Navigation and Session', () => {
  test('uses All Items, logs out, and protects direct inventory access', async ({ page }) => {
    // 1. Log in, open a product detail page, then use All Items.
    await loginAsStandardUser(page);
    await page.getByRole('link', { name: 'Sauce Labs Backpack' }).first().click();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'All Items' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    // 2. Open the menu and select Logout.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 3. Navigate directly to inventory after logout.
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.locator('.inventory_list')).not.toBeVisible();
  });
});
