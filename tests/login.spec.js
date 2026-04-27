const { describe, test, expect } = require('@serenity-js/playwright-test');
const { TakeScreenshot } = require('@serenity-js/web');

const { LoginPage }                       = require('../pages/LoginPage');
const { InventoryPage }                   = require('../pages/InventoryPage');
const { validUser, invalidUser, lockedUser } = require('../utils/testData');
const { useLoginHook }                    = require('../hooks/hooks');

describe('Login Module', () => {

  useLoginHook();

  // ─── Test 1: Login page UI validation ──────

  test('Verify login page UI',{ tag: ['@smoke', '@regression', '@ui'] },async ({ page, actor }) => {

      const loginPage = new LoginPage(page);

      // useLoginHook already navigated — just assert elements
      await expect(loginPage.logo).toBeVisible();
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
      await actor.attemptsTo(TakeScreenshot.of('login-page-validated'));

      await loginPage.verifyNoError();
    }
  );

  // ─── Test 2: Valid login using step-by-step actions ───────

  test('Valid login and logout — step by step',{ tag: ['@smoke'] },async ({ page, actor }) => {

      const loginPage     = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.enterUsername(validUser.username);
      await actor.attemptsTo(TakeScreenshot.of('username-entered'));

      await loginPage.enterPassword(validUser.password);
      await actor.attemptsTo(TakeScreenshot.of('password-entered'));

      await loginPage.clickLogin();
      await actor.attemptsTo(TakeScreenshot.of('login-clicked'));

      await expect(page).toHaveURL(/inventory/);
      await inventoryPage.verifyInventoryPageLoaded();
      await inventoryPage.verifyTitle('Products');
      await actor.attemptsTo(TakeScreenshot.of('inventory-page-loaded'));

      await inventoryPage.logout();
      await actor.attemptsTo(TakeScreenshot.of('logout-clicked'));

      await expect(page).toHaveURL('/');
      await expect(loginPage.loginButton).toBeVisible();
      await actor.attemptsTo(TakeScreenshot.of('back-to-login-page'));
    }
  );

  // ─── Test 3: Valid login using composite login() flow ──────

  test('Valid login — composite flow',{ tag: ['@smoke', '@regression'] },async ({ page, actor }) => {

      const loginPage     = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.login(validUser.username, validUser.password);
      await actor.attemptsTo(TakeScreenshot.of('login-submitted'));

      await expect(page).toHaveURL(/inventory/);
      await inventoryPage.verifyInventoryPageLoaded();
      await actor.attemptsTo(TakeScreenshot.of('inventory-page-loaded'));
    }
  );

  // ─── Test 4: Invalid credentials show error ────

  test('Invalid credentials — should show error message',{ tag: ['@regression'] },async ({ page, actor }) => {

      const loginPage = new LoginPage(page);

      await loginPage.enterUsername(invalidUser.username);
      await actor.attemptsTo(TakeScreenshot.of('invalid-username-entered'));

      await loginPage.enterPassword(invalidUser.password);
      await actor.attemptsTo(TakeScreenshot.of('password-entered'));

      await loginPage.clickLogin();
      await actor.attemptsTo(TakeScreenshot.of('login-clicked'));

      await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match');
      await actor.attemptsTo(TakeScreenshot.of('error-message-displayed'));

      await expect(page).toHaveURL('/');
    }
  );

  // ─── Test 5: Locked-out user error ────

  test('Locked-out user — should show locked error',{ tag: ['@regression'] },async ({ page, actor }) => {

      const loginPage = new LoginPage(page);

      await loginPage.loginAndExpectError(lockedUser.username,lockedUser.password,'Sorry, this user has been locked out');
      await actor.attemptsTo(TakeScreenshot.of('locked-user-error-displayed'));

      await expect(page).toHaveURL('/');
    }
  );

  // ─── Test 6: Error banner can be dismissed ────

  test('Error banner dismisses on close button click',{ tag: ['@regression', '@ui'] },async ({ page, actor }) => {

      const loginPage = new LoginPage(page);

      await loginPage.loginAndExpectError(lockedUser.username,lockedUser.password,'Sorry, this user has been locked out');
      await actor.attemptsTo(TakeScreenshot.of('error-displayed'));

      await loginPage.dismissError();
      await actor.attemptsTo(TakeScreenshot.of('error-dismissed'));
    }
  );

  // ─── Test 7: Empty credentials show error ─────

  test('Empty credentials — should show required field error',{ tag: ['@regression'] },async ({ page, actor }) => {
    
      const loginPage = new LoginPage(page);

      await loginPage.clickLogin();
      await actor.attemptsTo(TakeScreenshot.of('login-clicked-empty'));

      await loginPage.verifyErrorMessage('Epic sadface: Username is required');
      await actor.attemptsTo(TakeScreenshot.of('empty-credentials-error'));
    }
  );

});

