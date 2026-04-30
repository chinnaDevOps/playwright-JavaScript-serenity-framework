const { BasePage }                = require('./BasePage');
const { describe, test, expect }  = require('@serenity-js/playwright-test');

/**
 * Page Object Model for the Inventory (Products) Page.
 * Extends BasePage for all common element interactions.
 */
class InventoryPage extends BasePage {

  constructor(page) {
    super(page);

    // ── Locators 
    this.title             = page.locator('.title');
    this.inventoryItems    = page.locator('.inventory_item');
    this.sortDropdown      = page.locator('.product_sort_container');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink  = page.locator('.shopping_cart_link');
    this.menuButton        = page.locator('#react-burger-menu-btn');
    this.menuCloseButton   = page.locator('#react-burger-cross-btn');
    this.logoutLink        = page.locator('#logout_sidebar_link');
    this.sidebarMenu       = page.locator('.bm-menu-wrap');

    this.inventoryItemNames       = this.inventoryItems.locator('.inventory_item_name');
    this.inventoryItemPrices      = this.inventoryItems.locator('.inventory_item_price');
    this.backpackAddToCartButton  = page.locator('#add-to-cart-sauce-labs-backpack');
    this.bikeLightAddToCartButton = page.locator('#add-to-cart-sauce-labs-bike-light');
    this.backpackRemoveButton     = page.locator('#remove-sauce-labs-backpack');
    this.bikeLightRemoveButton    = page.locator('#remove-sauce-labs-bike-light');
  }

 
  async verifyInventoryPageLoaded(timeout = 10_000) {
    await this.waitForAllVisible([this.title, this.inventoryItems.first(), this.sortDropdown],timeout,'Inventory page');
  }

  async verifyTitle(expected = 'Products') {
    await expect(this.title).toHaveText(expected);
  }

  async getInventoryCount() {
    return await this.inventoryItems.count();
  }

  async getProductNames() {
   return await this.inventoryItemNames.allTextContents();
  }

  async getProductPrices() {
    const rawPrices = await this.inventoryItemPrices.allTextContents();
    return rawPrices.map(price => parseFloat(price.replace('$', '')));
  }

  async sortBy(sortValue) {
    await this.selectOption(this.sortDropdown, sortValue);
  }


  async getActiveSortOption() {
    return await this.getInputValue(this.sortDropdown);
  }

  async addToCart(locator) {
    await this.click(locator);
  }

  async removeFromCart(locator) {
    await this.click(locator);
  }


  async addMultipleToCart(locators) {
    for (const locator of locators) {
      await this.addToCart(locator);
    }
  }


  async getCartCount() {
    const visible = await this.isVisible(this.shoppingCartBadge);
    if (!visible) return 0;
    const text = await this.getText(this.shoppingCartBadge);
    return parseInt(text, 10);
  }


  async openCart() {
    await this.click(this.shoppingCartLink);
  }

  async openMenu() {
    await this.click(this.menuButton);
    await this.waitForVisible(this.sidebarMenu);
  }


  async closeMenu() {
    await this.click(this.menuCloseButton);
    await this.waitForHidden(this.sidebarMenu);
  }

  async logout() {
    await this.openMenu();
    await this.click(this.logoutLink);
  }
}

module.exports = { InventoryPage };
