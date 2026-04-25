const { describe, test, expect } = require('@serenity-js/playwright-test');
const { TakeScreenshot } = require('@serenity-js/web');

const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { validUser, invalidUser } = require('../utils/testData');

describe('Login Module', () => {

  test('Verify login page UI',{tag: ['@smoke', '@regression', '@ui']}, async ({ page, actor }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await actor.attemptsTo(
      TakeScreenshot.of('login-page-opened')
    );

    await loginPage.verifyLoginPageLoaded();
    await actor.attemptsTo(
      TakeScreenshot.of('login-page-validated')
    );

    await expect(loginPage.logo).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Valid login and logout',{tag: ['@smoke']}, async ({ page, actor }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await actor.attemptsTo(
      TakeScreenshot.of('login-page-opened')
    );

    await loginPage.enterUsername(validUser.username);
    await actor.attemptsTo(
      TakeScreenshot.of('username-entered')
    );

    await loginPage.enterPassword(validUser.password);
    await actor.attemptsTo(
      TakeScreenshot.of('password-entered')
    );

    await loginPage.clickLogin();
    await actor.attemptsTo(
      TakeScreenshot.of('login-clicked')
    );

    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.title).toHaveText('Products');
    await actor.attemptsTo(
      TakeScreenshot.of('inventory-page-loaded')
    );

    await inventoryPage.logout();
    await actor.attemptsTo(
      TakeScreenshot.of('logout-clicked')
    );

    await expect(loginPage.loginButton).toBeVisible();
    await actor.attemptsTo(
      TakeScreenshot.of('back-to-login-page')
    );
  });

  test('Invalid user login should show error',{tag: ['@regression']}, async ({ page, actor }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await actor.attemptsTo(
      TakeScreenshot.of('login-page-opened')
    );

    await loginPage.enterUsername(invalidUser.username);
    await actor.attemptsTo(
      TakeScreenshot.of('invalid-username-entered')
    );

    await loginPage.enterPassword(invalidUser.password);
    await actor.attemptsTo(
      TakeScreenshot.of('password-entered')
    );

    await loginPage.clickLogin();
    await actor.attemptsTo(
      TakeScreenshot.of('login-clicked')
    );

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
    await actor.attemptsTo(
      TakeScreenshot.of('error-message-displayed')
    );
  });
});