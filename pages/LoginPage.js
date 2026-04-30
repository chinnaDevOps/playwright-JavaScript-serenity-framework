const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.logo = page.locator('.login_logo');
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorButton = page.locator('[data-test="error"] .error-button');
  }

  async navigate() {
    await this.navigateTo('/');
    await this.verifyLoginPageLoaded();
  }

  async verifyLoginPageLoaded(timeout = 10000) {
    await this.waitForAllVisible([this.logo, this.usernameInput, this.passwordInput, this.loginButton],timeout,'Login page');
  }

  getUrl() {
    return this.getCurrentUrl();
  }

  async isLogoVisible() {
    return await this.isVisible(this.logo);
  }

  async isUsernameVisible() {
    return await this.isVisible(this.usernameInput);
  }

  async isPasswordVisible() {
    return await this.isVisible(this.passwordInput);
  }

  async isLoginButtonVisible() {
    return await this.isVisible(this.loginButton);
  }

  async isErrorBannerVisible() {
    return await this.isVisible(this.errorMessage);
  }

  async verifyNoError() {
    const visible = await this.isVisible(this.errorMessage);
    if (visible) {
      throw new Error('Expected no error banner to be visible, but it is still showing.');
    }
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

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
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async loginAndExpectError(username, password) {
    await this.login(username, password);
  }
}

module.exports = { LoginPage };