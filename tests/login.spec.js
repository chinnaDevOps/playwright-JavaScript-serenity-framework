const { describe, test, expect }          = require('@serenity-js/playwright-test');
const { TakeScreenshot }                  = require('@serenity-js/web');
const { Ensure, equals, includes, not }   = require('@serenity-js/assertions');
const { LoginPage }                       = require('../pages/LoginPage');
const { InventoryPage }                   = require('../pages/InventoryPage');
const { validUser, invalidUser}           = require('../utils/testData');
const { useLoginHook }                    = require('../hooks/hooks');

describe('Login Module', () => {

  useLoginHook();

  test('Verify login page UI',{ tag: ['@smoke', '@regression', '@ui'] },async ({ page, actor }) => {

      const loginPage = new LoginPage(page);

      
    await actor.attemptsTo(
      Ensure.that(await loginPage.isLogoVisible(), equals(true)),
      Ensure.that(await loginPage.isUsernameVisible(), equals(true)),
      Ensure.that(await loginPage.isPasswordVisible(), equals(true)),
      Ensure.that(await loginPage.isLoginButtonVisible(), equals(true)),
      TakeScreenshot.of('login-page-validated'),
    );

      await loginPage.verifyNoError();
    }
  );

  test('Valid login and logout — step by step',{ tag: ['@smoke'] },async ({ page, actor }) => {

      const loginPage     = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.enterUsername(validUser.username);
      await actor.attemptsTo(TakeScreenshot.of('username-entered'));

      await loginPage.enterPassword(validUser.password);
      await actor.attemptsTo(TakeScreenshot.of('password-entered'));

      await loginPage.clickLogin();
      await actor.attemptsTo(TakeScreenshot.of('login-clicked'));

      await actor.attemptsTo(
      Ensure.that(loginPage.getUrl(), includes('inventory')),
      );
      await inventoryPage.verifyInventoryPageLoaded();
      await inventoryPage.verifyTitle('Products');
      await actor.attemptsTo(TakeScreenshot.of('inventory-page-loaded'));

      await inventoryPage.logout();
      await actor.attemptsTo(TakeScreenshot.of('logout-clicked'));

      await actor.attemptsTo(
        Ensure.that(loginPage.getUrl(), includes('saucedemo.com')),
        Ensure.that(await loginPage.isLoginButtonVisible(), equals(true)),
        TakeScreenshot.of('back-to-login-page'),
     );
    });

  test('Valid login — composite flow',{ tag: ['@smoke', '@regression'] },async ({ page, actor }) => {

      const loginPage     = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.login(validUser.username, validUser.password);
      await actor.attemptsTo(TakeScreenshot.of('login-submitted'));

      await actor.attemptsTo(
       Ensure.that(loginPage.getUrl(), includes('inventory')),
      );
      await inventoryPage.verifyInventoryPageLoaded();
      await actor.attemptsTo(TakeScreenshot.of('inventory-page-loaded'));
    }
  );


  test('Invalid credentials — should show error message',{ tag: ['@regression'] },async ({ page, actor }) => {

      const loginPage = new LoginPage(page);

      await loginPage.enterUsername(invalidUser.username);
      await actor.attemptsTo(TakeScreenshot.of('invalid-username-entered'));

      await loginPage.enterPassword(invalidUser.password);
      await actor.attemptsTo(TakeScreenshot.of('password-entered'));

      await loginPage.clickLogin();
      await actor.attemptsTo(TakeScreenshot.of('login-clicked'));

      await actor.attemptsTo(
       Ensure.that(await loginPage.getErrorMessage(), includes('Epic sadface: Sorry, this user has been locked out.')),
       TakeScreenshot.of('error-message-displayed'),
      );

      await actor.attemptsTo(
        Ensure.that(loginPage.getUrl(), not(includes('inventory'))),
      );
    });


  test('Locked-out user — should show locked error',{ tag: ['@regression'] },async ({ page, actor }) => {

      const loginPage = new LoginPage(page);

      await loginPage.loginAndExpectError(invalidUser.username, invalidUser.password);
      await actor.attemptsTo(TakeScreenshot.of('locked-user-error-displayed'));
      await actor.attemptsTo(
        Ensure.that(await loginPage.getErrorMessage(), includes('Sorry, this user has been locked out')),
        TakeScreenshot.of('locked-user-error-displayed'),
      );

      await actor.attemptsTo(
        Ensure.that(loginPage.getUrl(), not(includes('inventory'))),
      );
    });


  test('Error banner dismisses on close button click',{ tag: ['@regression', '@ui'] },async ({ page, actor }) => {

      const loginPage = new LoginPage(page);

      await loginPage.loginAndExpectError(invalidUser.username,invalidUser.password);
      await actor.attemptsTo(TakeScreenshot.of('error-displayed'));

      await loginPage.dismissError();
      await actor.attemptsTo(
       Ensure.that(await loginPage.isErrorBannerVisible(), equals(false)),
       TakeScreenshot.of('error-dismissed'),
     );
  });


  test('Empty credentials — should show required field error',{ tag: ['@regression'] },async ({ page, actor }) => {
    
      const loginPage = new LoginPage(page);

      await loginPage.clickLogin();
      await actor.attemptsTo(TakeScreenshot.of('login-clicked-empty'));

      await actor.attemptsTo( 
        Ensure.that(await loginPage.getErrorMessage(), includes('Epic sadface: Username is required')),
        TakeScreenshot.of('empty-credentials-error'),
      );
    });
});

