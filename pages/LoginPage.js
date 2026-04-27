const { BasePage } = require('./BasePage');

/**
 * Page Object Model for the Login Page.
 * Extends BasePage for all common element interactions.
 */
class LoginPage extends BasePage {
  
  constructor(page) {
    super(page);

    // ── Locators ───
    this.logo          = page.locator('.login_logo');
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton   = page.locator('#login-button');
    this.errorMessage  = page.locator('[data-test="error"]');
    this.errorButton   = page.locator('[data-test="error"] .error-button');
  }

  // ─── Navigation ─────

  async navigate() {
    await this.navigateTo('/');
    await this.verifyLoginPageLoaded();
  }

  // ─── Verification ───

  async verifyLoginPageLoaded(timeout = 10_000) {
    await this.waitForAllVisible([this.logo, this.usernameInput, this.passwordInput, this.loginButton],timeout,'Login page');
  }


  async verifyNoError() {
    const visible = await this.isVisible(this.errorMessage);
    if (visible) {
      throw new Error('Expected no error banner to be visible, but it is still showing.');
    }
  }

 
  async getErrorMessage() {
    return this.getText(this.errorMessage);
  }

  async verifyErrorMessage(expectedText) {
    await this.verifyTextContains(this.errorMessage, expectedText, 'Error message');
  }

  // ─── Actions ──────

  async enterUsername(username) {
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  
  async clickLogin() {
    await this.click(this.loginButton);
  }

 
  async dismissError() {
    await this.click(this.errorButton);
    await this.verifyNoError();
  }

  // ─── Composite Flows ─────────

 
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
    return this;
  }

  async loginAndExpectError(username, password, expectedError) {
    await this.login(username, password);
    await this.verifyErrorMessage(expectedError);
  }
}

module.exports = { LoginPage };
