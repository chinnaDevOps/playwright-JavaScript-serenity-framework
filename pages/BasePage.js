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

  async waitForVisible(locator, timeout = 10_000) {
    await locator.waitFor({ state: 'visible', timeout });
  }


  async waitForHidden(locator, timeout = 10_000) {
    await locator.waitFor({ state: 'hidden', timeout });
  }


  async waitForAllVisible(locators, timeout = 10_000, pageName = 'Page') {
    try {
      await Promise.all(
        locators.map((locator) => locator.waitFor({ state: 'visible', timeout }))
      );
    } catch (error) {
      throw new Error('${pageName} did not load within ${timeout}ms.\nCause: ${error.message}');
    }
  }

  async click(locator) {
    await this.waitForVisible(locator);
    await locator.click();
  }

  async fill(locator, value) {
    await this.waitForVisible(locator);
    await locator.clear();
    await locator.fill(value);
  }


  async selectOption(locator, value) {
    await this.waitForVisible(locator);
    await locator.selectOption(value);
  }

  async getText(locator) {
    await this.waitForVisible(locator);
    return (await locator.textContent()).trim();
  }


  async getInputValue(locator) {
    await this.waitForVisible(locator);
    return locator.inputValue();
  }


  async isVisible(locator) {
    return locator.isVisible();
  }


  async verifyTextContains(locator, expectedText, label = 'Element') {
    const actual = await this.getText(locator);
    if (!actual.includes(expectedText)) {
      throw new Error( '${label} text mismatch.\n  Expected to contain: "${expectedText}"\n  Actual: "${actual}"');
    }
  }


  async verifyTextEquals(locator, expectedText, label = 'Element') {
    const actual = await this.getText(locator);
    if (actual !== expectedText) {
      throw new Error('${label} text mismatch.\n  Expected: "${expectedText}"\n  Actual:   "${actual}"');
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
