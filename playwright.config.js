const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  retries: 0,
  workers: 1,

  reporter: [
    ['@serenity-js/playwright-test', {
      crew: [
        '@serenity-js/console-reporter',
        ['@serenity-js/serenity-bdd', { specDirectory: './tests' }],
        ['@serenity-js/core:ArtifactArchiver', { outputDirectory: './target/site/serenity' }]
      ]
    }],
    ['html', { open: 'never' }]
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    browserName: 'chromium',
    channel: process.env.BROWSER_CHANNEL || 'chrome',
    headless: process.env.HEADLESS !== 'false',
    ignoreHTTPSErrors: process.env.ACCEPT_SSL_CERTS === 'true',
    viewport: null,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    launchOptions: {
      args: ['--start-maximized'],
      slowMo: Number(process.env.SLOWMO || 0)
    },
    crew: [
      ['@serenity-js/web:Photographer', {
        strategy: 'TakePhotosOfFailures'
      }]
    ]
  }
});