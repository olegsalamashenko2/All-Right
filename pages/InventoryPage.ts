import { type Page, type Locator } from '@playwright/test';
import { HeaderComponent } from './components/HeaderComponent';

export class InventoryPage {
  readonly page: Page;
  readonly productsHeading: Locator;
  readonly inventoryItems: Locator;
  readonly inventoryList: Locator;
  readonly productPrices: Locator;
  readonly sortDropdown: Locator;
  readonly header: HeaderComponent;
  readonly addBackpackButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsHeading = page.getByText('Products', { exact: true });
    this.inventoryItems = page.locator('.inventory_item');
    this.inventoryList = page.locator('.inventory_list');
    this.productPrices = page.locator('.inventory_item_price');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.header = new HeaderComponent(page);
    this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }
}