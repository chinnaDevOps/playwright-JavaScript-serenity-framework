# Playwright JS Serenity Framework

A sample UI automation framework that combines Playwright Test with Serenity/JS to run end-to-end tests and generate living documentation style reports. Serenity/JS integrates with Playwright Test through the @serenity-js/playwright-test adapter and enhances reporting and maintainability for web automation projects 
​
# Project structure
playwright-js-serenity-framework/
├── package.json
├── playwright.config.js
├── tests/
│   ├── login.spec.js
│   └── inventory.spec.js
├── pages/
│   ├── LoginPage.js
│   └── InventoryPage.js
├── utils/
│   └── testData.js
├── target/
│   └── site/
│       └── serenity/
└── README.md

# Prerequisites

Node.js 18+ recommended for modern Playwright and JavaScript tooling.

npm installed.

Google Chrome installed when running with BROWSER_CHANNEL=chrome.

Internet access to reach SauceDemo at https://www.saucedemo.com/, which is commonly used in Playwright examples and demo test flows 
.
### Setup
# Create the project folder and initialize npm:

- mkdir playwright-js-serenity-framework
- cd playwright-js-serenity-framework
- npm init -y

# Install Playwright Test:

- npm install -D @playwright/test

# Install Serenity/JS and supporting packages:

- npm install -D @serenity-js/core @serenity-js/web @serenity-js/playwright @serenity-js/playwright-test @serenity-js/assertions @serenity-js/console-reporter @serenity-js/serenity-bdd rimraf npm-failsafe

The npm-failsafe package is designed to run multiple npm scripts in sequence and return the correct exit code when one of them fails, which makes it useful for chained test and report commands 
​
# Suggested folders

- tests/ stores Playwright test specs such as login and inventory scenarios.

- pages/ stores page objects or lean page abstractions for screens like Login and Inventory.

- utils/ stores test data and reusable helpers.

- target/site/serenity/ stores Serenity BDD report output generated after execution, which aligns with Serenity/JS reporting guidance 

  # Run commands
  . Windows CMD
  set BASE_URL=https://www.saucedemo.com && set HEADLESS=false && set BROWSER_CHANNEL=chrome && npm run test:regression

# Windows CMD with slow execution
set BASE_URL=https://www.saucedemo.com && set HEADLESS=false && set BROWSER_CHANNEL=chrome && set SLOWMO=1000 && npm run test:regression

# PowerShell
$env:BASE_URL="https://www.saucedemo.com"; $env:BROWSER_CHANNEL="chrome"; $env:HEADLESS="false"; $env:SLOWMO="1000"; npm run clean; npx playwright test --grep "@ui"; npm run test:report

# Environment variables

###
Variable	Purpose	Example
BASE_URL	Target application URL for test execution.	https://www.saucedemo.com
HEADLESS	Controls headed or headless browser mode.	false
BROWSER_CHANNEL	Selects the installed browser channel used by Playwright.	chrome
SLOWMO	Adds delay between browser actions for debugging and demos.	1000

# Example npm scripts

- Add scripts like these to package.json:

- {
  "scripts": {
    "clean": "rimraf target",
    "test:ui": "playwright test --grep @ui",
    "test:report": "serenity-bdd run --features target/site/serenity --destination target/site/serenity",
    "test:regression": "failsafe clean test:ui test:report"
  }
}

# What this framework supports

. Playwright-based browser automation for UI scenarios.

. Serenity/JS integration for richer reporting, reusable test design, and maintainable automation architecture 


. Page object style organization for better test readability.

. Environment-driven execution across browsers and execution modes.

# Notes
Serenity/JS can be used with Playwright Test either with existing test code or with Screenplay Pattern abstractions, so this framework can start simple and evolve as the suite grows 
​. The report output under target/site/serenity/ is the natural place to publish execution results for local review or CI artifacts 
​





