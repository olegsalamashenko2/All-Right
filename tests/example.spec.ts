import { test, expect } from './fixtures';

test.describe('SauceDemo UI Tests', () => {
  test('should login successfully', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.loginAsStandardUser();
    await expect(page).toHaveURL(/inventory.html/);
    await expect(inventoryPage.productsHeading).toBeVisible();
  });

  test('should display all products in catalog', async ({ loginPage, inventoryPage }) => {
    await loginPage.loginAsStandardUser();
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test('should sort products by price from low to high', async ({ loginPage, inventoryPage }) => {
    await loginPage.loginAsStandardUser();
    await inventoryPage.sortByPriceLowToHigh();

    const prices = await inventoryPage.productPrices.allTextContents();
    const numericPrices = prices.map(price => Number(price.replace('$', '')));

    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b));
  });

  test('should add product to cart', async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.loginAsStandardUser();
    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.header.cartBadge).toHaveText('1');
    await inventoryPage.header.openCart();
    await expect(cartPage.backpack).toBeVisible();
  });

  test('should remove product from cart', async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.loginAsStandardUser();
    await inventoryPage.addBackpackToCart();
    await inventoryPage.header.openCart();
    await cartPage.removeBackpack();
    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(cartPage.header.cartBadge).toHaveCount(0);
  });

  test('should complete checkout successfully', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.loginAsStandardUser();
    await inventoryPage.addBackpackToCart();
    await inventoryPage.header.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('John', 'Doe', '12345');
    await checkoutPage.continue();
    await expect(checkoutPage.overviewHeading).toBeVisible();
    await checkoutPage.finishOrder();
    await expect(checkoutPage.orderConfirmation).toBeVisible();
  });

  test('should reject invalid credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });

  test('should reject locked out user', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('should require first name during checkout', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.loginAsStandardUser();
    await inventoryPage.addBackpackToCart();
    await inventoryPage.header.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('', 'Doe', '12345');
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
  });
});
