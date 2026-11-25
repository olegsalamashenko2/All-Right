import { test, expect, type Page } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';

async function login(page: Page) {
  await page.goto(BASE_URL);
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
}

test.describe('SauceDemo UI Tests', () => {

  test('should login successfully', async ({ page }) => {
    await login(page);

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('should display all products in catalog', async ({ page }) => {
    await login(page);

    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('should sort products by price from low to high', async ({ page }) => {
    await login(page);

    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(price => Number(price.replace('$', '')));
    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b));
  });

  test('should add product to cart', async ({ page }) => {
    await login(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  });

  test('should remove product from cart', async ({ page }) => {
    await login(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });

  test('should complete checkout successfully', async ({ page }) => {
    await login(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
    await page.locator('[data-test="finish"]').click();
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });

  test('should reject invalid credentials', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });

  test('should reject locked out user', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });

  test('should require first name during checkout', async ({ page }) => {
    await login(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
  });
});
