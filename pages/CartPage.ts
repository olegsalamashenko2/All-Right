import { type Page, type Locator } from '@playwright/test';
import { HeaderComponent } from './components/HeaderComponent';

export class CartPage {
  readonly cartItems: Locator;
  readonly backpack: Locator;
  readonly removeBackpackButton: Locator;
  readonly checkoutButton: Locator;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    this.cartItems = page.locator('.cart_item');
    this.backpack = page.getByText('Sauce Labs Backpack', { exact: true });
    this.removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.header = new HeaderComponent(page);
  }

  async removeBackpack() {
    await this.removeBackpackButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}