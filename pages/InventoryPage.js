class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('.product_sort_container');
    this.addToCartBackpack = page.locator('#add-to-cart-sauce-labs-backpack');
    this.removeBackpack = page.locator('#remove-sauce-labs-backpack');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async verifyInventoryPageLoaded() {
    await this.title.waitFor({ state: 'visible' });
  }

  async getInventoryCount() {
    return await this.inventoryItems.count();
  }

  async sortLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
  }

  async addBackpackToCart() {
    await this.addToCartBackpack.click();
  }

  async removeBackpackFromCart() {
    await this.removeBackpack.click();
  }

  async getCartCount() {
    return await this.shoppingCartBadge.textContent();
  }

  async sortByVisibleText(value) {
    await this.sortDropdown.selectOption(value);
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };