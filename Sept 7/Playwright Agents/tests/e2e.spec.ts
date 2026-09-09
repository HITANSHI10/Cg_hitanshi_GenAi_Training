import { test, expect } from '@playwright/test';

const testData = require('../test-data/users.json');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('SauceDemo complete checkout', () => {
  test('completes checkout using JSON test data', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('1. Open SauceDemo', async () => {
      await loginPage.open();
    });

    await test.step('2. Read login credentials from test-data/users.json and login', async () => {
      await loginPage.login(testData.login.username, testData.login.password);
    });

    await test.step('4. Verify the inventory page is displayed', async () => {
      await expect(inventoryPage.inventoryPage).toBeVisible();
    });

    await test.step('5-6. Read products from JSON and add every product to the cart', async () => {
      await inventoryPage.addProducts(testData.products);
    });

    await test.step('7. Verify cart count equals the number of JSON products', async () => {
      await expect(inventoryPage.cartBadge).toHaveText(String(testData.products.length));
      expect(await inventoryPage.getCartCount()).toBe(testData.products.length);
    });

    await test.step('8. Open the cart', async () => {
      await inventoryPage.openCart();
    });

    await test.step('9. Verify every JSON product exists in the cart', async () => {
      await expect(cartPage.cartProducts).toHaveCount(testData.products.length);
      await expect.poll(() => cartPage.getProducts()).toEqual(testData.products);
    });

    await test.step('10. Click Checkout', async () => {
      await cartPage.checkout();
    });

    await test.step('11-12. Read customer details from JSON and enter them', async () => {
      await checkoutPage.enterCustomerDetails(
        testData.customer.firstName,
        testData.customer.lastName,
        testData.customer.postalCode,
      );
    });

    await test.step('13. Continue', async () => {
      await checkoutPage.continue();
    });

    await test.step('14. Finish the order', async () => {
      await checkoutPage.finishOrder();
    });

    await test.step('15. Verify the success message', async () => {
      await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
      await expect.poll(() => checkoutPage.getSuccessMessage()).toBe('Thank you for your order!');
    });
  });
});
