const { BasePage } = require('./BasePage');

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
  }

  // ─── Verification ─────────

 
  async verifyInventoryPageLoaded(timeout = 10_000) {
    await this.waitForAllVisible(
      [this.title, this.inventoryItems.first(), this.sortDropdown],
      timeout,
      'Inventory page'
    );
  }

  async verifyTitle(expected = 'Products') {
    await this.verifyTextEquals(this.title, expected, 'Inventory page title');
  }

  // ─── Inventory Queries ──

  async getInventoryCount() {
    return this.inventoryItems.count();
  }


  async getProductNames() {
    return this.inventoryItems
      .locator('.inventory_item_name')
      .allTextContents();
  }


  async getProductPrices() {
    const rawPrices = await this.inventoryItems
      .locator('.inventory_item_price')
      .allTextContents();
    return rawPrices.map((p) => parseFloat(p.replace('$', '')));
  }

  // ─── Sorting ───

  async sortBy(sortValue) {
    await this.selectOption(this.sortDropdown, sortValue);
  }


  async getActiveSortOption() {
    return this.getInputValue(this.sortDropdown);
  }

  // ─── Cart Interactions ────


  async addToCart(locatorId) {
    await this.click(this.page.locator(locatorId));
  }

 
  async removeFromCart(locatorId) {
    await this.click(this.page.locator(locatorId));
  }


  async addMultipleToCart(locatorIds) {
    for (const id of locatorIds) {
      await this.addToCart(id);
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

  // ─── Navigation Menu ────

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
