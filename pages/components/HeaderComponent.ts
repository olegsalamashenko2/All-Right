import { type Page, type Locator } from '@playwright/test';

export class HeaderComponent {
  readonly title: Locator;
  readonly cartBadge: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    this.title = page.locator('.title');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}