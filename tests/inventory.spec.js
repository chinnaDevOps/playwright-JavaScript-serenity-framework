const { describe, test, expect }          = require('@serenity-js/playwright-test');
const { TakeScreenshot }                  = require('@serenity-js/web');
const { Ensure, equals, includes, not, isGreaterThan }   = require('@serenity-js/assertions');

const { LoginPage }                       = require('../pages/LoginPage');
const { InventoryPage }                   = require('../pages/InventoryPage');
const { validUser }                       = require('../utils/testData');
const { useInventoryHook }                = require('../hooks/hooks');

describe('Inventory Module', () => {

  useInventoryHook();

  test('Verify inventory page and product count',{ tag: ['@smoke', '@regression'] },async ({ page, actor }) => {

      const inventoryPage = new InventoryPage(page);

      await inventoryPage.verifyInventoryPageLoaded();
      await inventoryPage.verifyTitle('Products');
      await actor.attemptsTo(TakeScreenshot.of('title-validated'));

      const count = await inventoryPage.getInventoryCount();
      await actor.attemptsTo(Ensure.that(count, isGreaterThan(0)),
         TakeScreenshot.of('product-count-validated'),
      );
    }
  );

  test('Add and remove product from cart',{ tag: ['@regression', '@ui'] },async ({ page, actor }) => {

      const inventoryPage = new InventoryPage(page);

      await inventoryPage.addToCart(inventoryPage.backpackAddToCartButton);
      await actor.attemptsTo(TakeScreenshot.of('product-added-to-cart'));

      const countAfterAdd = await inventoryPage.getCartCount();
      await actor.attemptsTo(Ensure.that(countAfterAdd, equals(1)));
      await actor.attemptsTo(TakeScreenshot.of('cart-count-validated'));

      await inventoryPage.removeFromCart(inventoryPage.backpackRemoveButton);
      await actor.attemptsTo(TakeScreenshot.of('product-removed-from-cart'));

      const countAfterRemove = await inventoryPage.getCartCount();
      await actor.attemptsTo(Ensure.that(countAfterRemove, equals(0)));
      await actor.attemptsTo(TakeScreenshot.of('cart-empty-validated'));
    }
  );


  test('Add multiple products to cart',{ tag: ['@regression', '@ui'] },async ({ page, actor }) => {

      const inventoryPage = new InventoryPage(page);

      await inventoryPage.addMultipleToCart([inventoryPage.backpackAddToCartButton,inventoryPage.bikeLightAddToCartButton,]);
      await actor.attemptsTo(TakeScreenshot.of('multiple-products-added'));

      const count = await inventoryPage.getCartCount();
      await actor.attemptsTo(Ensure.that(count, equals(2)));
      await actor.attemptsTo(TakeScreenshot.of('multiple-cart-count-validated'));
    }
  );

  test('Sort products by price low to high',{ tag: ['@smoke', '@ui'] },async ({ page, actor }) => {

      const inventoryPage = new InventoryPage(page);

      await inventoryPage.sortBy('lohi');
      await actor.attemptsTo(TakeScreenshot.of('products-sorted-low-to-high'));

      const activeSort = await inventoryPage.getActiveSortOption();
      await actor.attemptsTo(Ensure.that(activeSort, equals('lohi')));

      const prices = await inventoryPage.getProductPrices();
      const sorted  = [...prices].sort((a, b) => a - b);
      await actor.attemptsTo(Ensure.that(JSON.stringify(prices), equals(JSON.stringify(sorted))));
      await actor.attemptsTo(TakeScreenshot.of('price-order-validated'));
    }
  );


  test('Sort products by price high to low',{ tag: ['@regression', '@ui'] },async ({ page, actor }) => {

      const inventoryPage = new InventoryPage(page);

      await inventoryPage.sortBy('hilo');
      await actor.attemptsTo(TakeScreenshot.of('products-sorted-high-to-low'));

      const activeSort = await inventoryPage.getActiveSortOption();
      await actor.attemptsTo(Ensure.that(activeSort, equals('hilo')));

      const prices = await inventoryPage.getProductPrices();
      const sorted  = [...prices].sort((a, b) => b - a);
      await actor.attemptsTo(Ensure.that(JSON.stringify(prices), equals(JSON.stringify(sorted))));
      await actor.attemptsTo(TakeScreenshot.of('price-high-to-low-validated'));
    }
  );


  test('Sort products by name A to Z',{ tag: ['@regression', '@ui'] },async ({ page, actor }) => {

      const inventoryPage = new InventoryPage(page);

      await inventoryPage.sortBy('az');
      await actor.attemptsTo(TakeScreenshot.of('products-sorted-az'));

      const names  = await inventoryPage.getProductNames();
      const sorted = [...names].sort();
      await actor.attemptsTo(Ensure.that(JSON.stringify(names), equals(JSON.stringify(sorted))));
      await actor.attemptsTo(TakeScreenshot.of('name-az-order-validated'));
    }
  );

  test('Logout from inventory page',{ tag: ['@smoke', '@regression'] },async ({ page, actor }) => {
    
      const inventoryPage = new InventoryPage(page);
      const loginPage     = new LoginPage(page);

      await inventoryPage.logout();
      await actor.attemptsTo(TakeScreenshot.of('logout-successful'));

      //await expect(page).toHaveURL('/');
      await actor.attemptsTo(Ensure.that(page.url(), includes('saucedemo.com')),
         Ensure.that(await loginPage.isLoginButtonVisible(), equals(true)),
         TakeScreenshot.of('back-to-login-page'),
      );
    });

});

