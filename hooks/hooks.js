const { test }           = require('@playwright/test');
const { TakeScreenshot } = require('@serenity-js/web');

const { LoginPage }     = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { validUser }     = require('../utils/testData');


function useLoginHook() {
  test.beforeEach(async ({ page, actor }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await actor.attemptsTo(TakeScreenshot.of('login-page-opened'));
  });

  test.afterEach(async ({ actor }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await actor.attemptsTo(TakeScreenshot.of(`FAILED-${testInfo.title}`));
    }
  });
}


function useInventoryHook() {
  test.beforeEach(async ({ page, actor }) => {
    const loginPage     = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login(validUser.username, validUser.password);
    await actor.attemptsTo(TakeScreenshot.of('login-successful'));

    await inventoryPage.verifyInventoryPageLoaded();
    await actor.attemptsTo(TakeScreenshot.of('inventory-page-ready'));
  });

  test.afterEach(async ({ actor }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await actor.attemptsTo(TakeScreenshot.of(`FAILED-${testInfo.title}`));
    }
  });
}


function useLogoutHook() {
  test.afterEach(async ({ page, actor }) => {
    try {
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.logout();
      await actor.attemptsTo(TakeScreenshot.of('logout-after-test'));
    } catch {
      // Intentionally swallowed — logout is best-effort cleanup
    }
  });
}

module.exports = { useLoginHook, useInventoryHook, useLogoutHook };
