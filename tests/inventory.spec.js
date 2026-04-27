const { describe, test, expect } = require('@serenity-js/playwright-test');
const { TakeScreenshot } = require('@serenity-js/web');

const { LoginPage }       = require('../pages/LoginPage');
const { InventoryPage }   = require('../pages/InventoryPage');
const { validUser }       = require('../utils/testData');
const { useInventoryHook } = require('../hooks/hooks');

describe('Inventory Module', () => {

  useInventoryHook();

  // ─── Test 1: Page load & product count ─────

  test('Verify inventory page and product count',{ tag: ['@smoke', '@regression'] },async ({ page, actor }) => {

      const inventoryPage = new InventoryPage(page);

      await inventoryPage.verifyTitle('Products');
      await actor.attemptsTo(TakeScreenshot.of('title-validated'));

      const count = await inventoryPage.getInventoryCount();
      expect(count).toBeGreaterThan(0);
      await actor.attemptsTo(TakeScreenshot.of('product-count-validated'));
    }
  );

  // ─── Test 2: Add & remove a product from cart ────

  test('Add and remove product from cart',{ tag: ['@regression', '@ui'] },async ({ page, actor }) => {

      const inventoryPage = new InventoryPage(page);

      await inventoryPage.addToCart('#add-to-cart-sauce-labs-backpack');
      await actor.attemptsTo(TakeScreenshot.of('product-added-to-cart'));

      const countAfterAdd = await inventoryPage.getCartCount();
      expect(countAfterAdd).toBe(1);
      await actor.attemptsTo(TakeScreenshot.of('cart-count-validated'));

      await inventoryPage.removeFromCart('#remove-sauce-labs-backpack');
      await actor.attemptsTo(TakeScreenshot.of('product-removed-from-cart'));

      const countAfterRemove = await inventoryPage.getCartCount();
      expect(countAfterRemove).toBe(0);
      await actor.attemptsTo(TakeScreenshot.of('cart-empty-validated'));
    }
  );

  // ─── Test 3: Add multiple products to cart ───

  test('Add multiple products to cart',{ tag: ['@regression', '@ui'] },async ({ page, actor }) => {

      const inventoryPage = new InventoryPage(page);

      await inventoryPage.addMultipleToCart(['#add-to-cart-sauce-labs-backpack','#add-to-cart-sauce-labs-bike-light',]);
      await actor.attemptsTo(TakeScreenshot.of('multiple-products-added'));

      const count = await inventoryPage.getCartCount();
      expect(count).toBe(2);
      await actor.attemptsTo(TakeScreenshot.of('multiple-cart-count-validated'));
    }
  );

  // ─── Test 4: Sort products low to high ────

  test('Sort products by price low to high',{ tag: ['@smoke', '@ui'] },async ({ page, actor }) => {

      const inventoryPage = new InventoryPage(page);

      await inventoryPage.sortBy('lohi');
      await actor.attemptsTo(TakeScreenshot.of('products-sorted-low-to-high'));

      const activeSort = await inventoryPage.getActiveSortOption();
      expect(activeSort).toBe('lohi');

      const prices = await inventoryPage.getProductPrices();
      const sorted  = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sorted);
      await actor.attemptsTo(TakeScreenshot.of('price-order-validated'));
    }
  );

  // ─── Test 5: Sort products high to low ─────

  test('Sort products by price high to low',{ tag: ['@regression', '@ui'] },async ({ page, actor }) => {

      const inventoryPage = new InventoryPage(page);

      await inventoryPage.sortBy('hilo');
      await actor.attemptsTo(TakeScreenshot.of('products-sorted-high-to-low'));

      const activeSort = await inventoryPage.getActiveSortOption();
      expect(activeSort).toBe('hilo');

      const prices = await inventoryPage.getProductPrices();
      const sorted  = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sorted);
      await actor.attemptsTo(TakeScreenshot.of('price-high-to-low-validated'));
    }
  );

  // ─── Test 6: Sort products name A–Z ─────

  test('Sort products by name A to Z',{ tag: ['@regression', '@ui'] },async ({ page, actor }) => {

      const inventoryPage = new InventoryPage(page);

      await inventoryPage.sortBy('az');
      await actor.attemptsTo(TakeScreenshot.of('products-sorted-az'));

      const names  = await inventoryPage.getProductNames();
      const sorted = [...names].sort();
      expect(names).toEqual(sorted);
      await actor.attemptsTo(TakeScreenshot.of('name-az-order-validated'));
    }
  );

  // ─── Test 7: Logout via sidebar menu ────

  test('Logout from inventory page',{ tag: ['@smoke', '@regression'] },async ({ page, actor }) => {
    
      const inventoryPage = new InventoryPage(page);
      const loginPage     = new LoginPage(page);

      await inventoryPage.logout();
      await actor.attemptsTo(TakeScreenshot.of('logout-successful'));

      await expect(page).toHaveURL('/');
      await expect(loginPage.loginButton).toBeVisible();
    }
  );

});

