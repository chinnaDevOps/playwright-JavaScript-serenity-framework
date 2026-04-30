/**
 * BasePage — common low-level actions shared by all Page Object Models.
 * Every page class extends this instead of duplicating boilerplate.
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(path = '/') {
    await this.page.goto(path);
  }

  getCurrentUrl() {
    return this.page.url();
  }

  async reloadPage() {
    await this.page.reload();
  }

  async waitForVisible(locator, timeout = 10000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(locator, timeout = 10000) {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async waitForAllVisible(locators, timeout = 10000, pageName = 'Page') {
    try {
      await Promise.all(
        locators.map((locator) => locator.waitFor({ state: 'visible', timeout }))
      );
    } catch (error) {
      throw new Error(
        `${pageName} did not load within ${timeout}ms.\nCause: ${error.message}`
      );
    }
  }

  async click(locator) {
    await this.waitForVisible(locator);
    await locator.click();
  }

  async fill(locator, value) {
    await this.waitForVisible(locator);
    await locator.fill('');
    await locator.fill(value);
  }

  async clear(locator) {
    await this.waitForVisible(locator);
    await locator.fill('');
  }

  async selectOption(locator, value) {
    await this.waitForVisible(locator);
    await locator.selectOption(value);
  }

  async getText(locator) {
    await this.waitForVisible(locator);
    const text = await locator.textContent();
    return text ? text.trim() : '';
  }

  async getInputValue(locator) {
    await this.waitForVisible(locator);
    return await locator.inputValue();
  }

  async isVisible(locator) {
    return await locator.isVisible();
  }

  async isHidden(locator) {
    return await locator.isHidden();
  }

  async verifyTextContains(locator, expectedText, label = 'Element') {
    const actual = await this.getText(locator);
    if (!actual.includes(expectedText)) {
      throw new Error(
        `${label} text mismatch.\nExpected to contain: "${expectedText}"\nActual: "${actual}"`
      );
    }
  }

  async verifyTextEquals(locator, expectedText, label = 'Element') {
    const actual = await this.getText(locator);
    if (actual !== expectedText) {
      throw new Error(
        `${label} text mismatch.\nExpected: "${expectedText}"\nActual: "${actual}"`
      );
    }
  }

  async takeScreenshot(fileName, dir = 'screenshots') {
    await this.page.screenshot({
      path: `${dir}/${fileName}.png`,
      fullPage: true,
    });
  }
}

module.exports = { BasePage };