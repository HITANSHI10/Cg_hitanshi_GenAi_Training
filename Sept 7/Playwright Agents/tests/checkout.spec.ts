import { test, expect } from '@playwright/test';

async function startCheckout(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: 'Add to cart' }).click();
  await page.locator('.shopping_cart_link').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
}

test.describe('Checkout', () => {
  test('completes checkout with valid customer information', async ({ page }) => {
    // 1. Log in, add Sauce Labs Backpack, open the cart, and select Checkout.
    await startCheckout(page);
    await expect(page.getByText('Checkout: Your Information', { exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Zip/Postal Code' })).toBeVisible();

    // 2. Enter valid first name, last name, and postal code, then select Continue.
    await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Customer');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.getByText('Checkout: Overview', { exact: true })).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.locator('[data-test="subtotal-label"]')).toContainText('Item total:');
    await expect(page.locator('[data-test="tax-label"]')).toContainText('Tax:');
    await expect(page.locator('[data-test="total-label"]')).toContainText('Total:');

    // 3. Select Finish.
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.getByText('Thank you for your order!')).toBeVisible();

    // 4. Select Back Home.
    await page.getByRole('button', { name: 'Back Home' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
  });

  test('blocks checkout when required data is absent', async ({ page }) => {
    // 1. Reach Checkout: Your Information and continue without entering data.
    await startCheckout(page);
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Error: First Name is required')).toBeVisible();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.getByText('Thank you for your order!')).not.toBeVisible();

    // 2. Enter only a first name and select Continue.
    await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Error: Last Name is required')).toBeVisible();

    // 3. Enter first name and last name but leave postal code blank.
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Customer');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Error: Postal Code is required')).toBeVisible();
  });
});
