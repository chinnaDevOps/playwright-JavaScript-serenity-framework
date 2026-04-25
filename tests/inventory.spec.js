const { describe, test, expect } = require('@serenity-js/playwright-test');
const { TakeScreenshot } = require('@serenity-js/web');

const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { validUser } = require('../utils/testData');

describe('Inventory Module', () => {

  test.beforeEach(async ({ page, actor }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(validUser.username, validUser.password);

    await actor.attemptsTo(
      TakeScreenshot.of('login-successful')
    );
  });

  test('Verify inventory page and product count',{tag: ['@smoke', '@regression']}, async ({ page, actor }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.verifyInventoryPageLoaded();
    await actor.attemptsTo(
      TakeScreenshot.of('inventory-page-loaded')
    );

    await expect(inventoryPage.title).toHaveText('Products');

    const count = await inventoryPage.getInventoryCount();
    expect(count).toBeGreaterThan(0);

    await actor.attemptsTo(
      TakeScreenshot.of('product-count-validated')
    );
  });

  test('Add and remove product from cart',{tag: ['@regression', '@ui']}, async ({ page, actor }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addBackpackToCart();
    await actor.attemptsTo(
      TakeScreenshot.of('product-added-to-cart')
    );

    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    await actor.attemptsTo(
      TakeScreenshot.of('cart-count-validated')
    );

    await inventoryPage.removeBackpackFromCart();
    await actor.attemptsTo(
      TakeScreenshot.of('product-removed-from-cart')
    );
  });

  test('Sort products by Price Low to High',{tag: ['@smoke','@ui']}, async ({ page, actor }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortLowToHigh();
    await actor.attemptsTo(
      TakeScreenshot.of('products-sorted-low-to-high')
    );

    await expect(inventoryPage.sortDropdown).toHaveValue('lohi');
    await actor.attemptsTo(
      TakeScreenshot.of('sort-validation-completed')
    );
  });
});