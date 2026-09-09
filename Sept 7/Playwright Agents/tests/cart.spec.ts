import { test, expect } from '@playwright/test';

async function loginAsStandardUser(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
}

test.describe('Cart', () => {
  test('adds, removes, preserves, and resets cart state', async ({ page }) => {
    // 1. Log in as standard_user and add Sauce Labs Backpack and Sauce Labs Bike Light.
    await loginAsStandardUser(page);
    await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' }).getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // 2. Open the cart.
    await page.locator('.shopping_cart_link').click();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).toBeVisible();
    await expect(page.getByText('$29.99', { exact: true })).toBeVisible();
    await expect(page.getByText('$9.99', { exact: true })).toBeVisible();

    // 3. Remove Sauce Labs Bike Light, navigate to inventory, and return to the cart.
    await page.locator('.cart_item').filter({ hasText: 'Sauce Labs Bike Light' }).getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.locator('.shopping_cart_link').click();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).not.toBeVisible();

    // 4. Open the menu and select Reset App State.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Reset App State' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    await page.getByRole('button', { name: 'Close Menu' }).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await expect(page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: 'Add to cart' })).toBeVisible();
  });
});
