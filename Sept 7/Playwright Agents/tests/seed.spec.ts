import { test, expect } from '@playwright/test';

const users = require('../test-data/users.json');

test('seed', async ({ page }) => {
	await page.goto('https://www.saucedemo.com/');
	await page.locator('input[name="user-name"]').fill(users.login.username);
	await page.locator('[data-test="password"]').fill(users.login.password);
	await page.locator('input[name="login-button"]').click();
	await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
});
"import { test, expect } from '@playwright/test';\n\nconst users = require('../test-data/users.json');\n\ntest.describe('Test group', () => {\n  test('seed', async ({ page }) => {\n    await page.goto('https://www.saucedemo.com/');\n    await page.locator('input[name=\"user-name\"]').fill(users.login.username);\n    await page.locator(\"//input[@id='password']\").fill(users.login.password);\n    await page.locator('input[name=\"login-button\"]').click();\n    await expect(page.locator(\"//div[@class='app_logo']\")).toHaveText('Swag Labs');\n  });\n});\n"