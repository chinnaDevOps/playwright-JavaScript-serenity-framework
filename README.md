# 🎭 Playwright + Serenity/JS Framework

<div align="center">

![Playwright](https://img.shields.io/badge/Playwright-2D8653?style=for-the-badge&logo=playwright&logoColor=white)
![Serenity/JS](https://img.shields.io/badge/Serenity%2FJS-20B2AA?style=for-the-badge&logo=javascript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**A production-grade E2E test automation framework combining the power of Playwright with Serenity/JS's rich reporting and Screenplay pattern.**

[Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Running Tests](#-running-tests) • [Reports](#-reports) • [Configuration](#-configuration)

</div>

---

## ✨ Features

- 🚀 **Playwright** — Fast, reliable cross-browser testing
- 📊 **Serenity/JS** — Living documentation & rich BDD-style HTML reports
- 🎭 **Screenplay Pattern** — Highly maintainable, actor-centric test design
- 🧩 **Page Object Model** — Clean separation of UI logic and test logic
- ⚙️ **Environment Configurable** — Runtime control via env variables
- 🖥️ **Cross-Platform** — Supports Windows CMD, PowerShell, and macOS/Linux

---

## 📁 Project Structure

```
playwright-js-serenity-framework/
├── 📄 package.json                    # Project metadata & npm scripts
├── ⚙️  playwright.config.js            # Playwright + Serenity/JS configuration
├── 🧪 tests/
│   ├── login.spec.js                  # Login feature test suite
│   └── inventory.spec.js              # Inventory feature test suite
├── 📄 pages/
│   ├── LoginPage.js                   # Login page object
│   └── InventoryPage.js               # Inventory page object
├── 🔧 utils/
│   └── testData.js                    # Shared test data & constants
├── 📊 target/
│   └── site/
│       └── serenity/                  # Generated Serenity HTML reports
└── 📘 README.md
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | `>= 18.x` |
| npm | `>= 9.x` |
| macOS / Windows / Linux | Any modern OS |

---

### 🛠️ Setup — macOS / Linux (Terminal)

Run the following commands in your terminal:

```bash
# 1. Create and navigate to the project directory
mkdir playwright-js-serenity-framework
cd playwright-js-serenity-framework

# 2. Initialize Node.js project
npm init -y

# 3. Install Playwright
npm install -D @playwright/test

# 4. Install Serenity/JS and all required packages
npm install -D \
  @serenity-js/core \
  @serenity-js/web \
  @serenity-js/playwright \
  @serenity-js/playwright-test \
  @serenity-js/assertions \
  @serenity-js/console-reporter \
  @serenity-js/serenity-bdd \
  rimraf \
  npm-failsafe

# 5. Install Playwright browsers
npx playwright install
```

> 💡 **Tip:** Run `npx playwright install --with-deps` to also install system-level browser dependencies on Linux/CI environments.

---

## ▶️ Running Tests

### macOS / Linux

```bash
# Run all regression tests (headless, default)
npm run test:regression

# Run with visible browser (headed mode)
BASE_URL=https://www.saucedemo.com HEADLESS=false BROWSER_CHANNEL=chrome npm run test:regression

# Run with slow motion (useful for debugging)
BASE_URL=https://www.saucedemo.com HEADLESS=false BROWSER_CHANNEL=chrome SLOWMO=1000 npm run test:regression

# Run specific tagged tests and generate report
npm run clean && \
  npx playwright test --grep "@ui" && \
  npm run test:report
```

---

### 🪟 Windows CMD

```cmd
:: Run regression tests
set BASE_URL=https://www.saucedemo.com && set HEADLESS=false && set BROWSER_CHANNEL=chrome && npm run test:regression

:: Run with slow motion execution
set BASE_URL=https://www.saucedemo.com && set HEADLESS=false && set BROWSER_CHANNEL=chrome && set SLOWMO=1000 && npm run test:regression
```

---

### 💠 Windows PowerShell

```powershell
# Run with slow motion, clean output and generate report
$env:BASE_URL="https://www.saucedemo.com"
$env:BROWSER_CHANNEL="chrome"
$env:HEADLESS="false"
$env:SLOWMO="1000"
npm run clean
npx playwright test --grep "@ui"
npm run test:report
```

Or as a one-liner:

```powershell
$env:BASE_URL="https://www.saucedemo.com"; $env:BROWSER_CHANNEL="chrome"; $env:HEADLESS="false"; $env:SLOWMO="1000"; npm run clean; npx playwright test --grep "@ui"; npm run test:report
```

---

## ⚙️ Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://www.saucedemo.com` | Application under test base URL |
| `HEADLESS` | `true` | Run browser in headless mode (`true` / `false`) |
| `BROWSER_CHANNEL` | `chromium` | Browser to use (`chrome`, `firefox`, `webkit`) |
| `SLOWMO` | `0` | Delay (ms) between Playwright actions — useful for debugging |

---

## 📊 Reports

Serenity/JS generates rich, living documentation-style HTML reports after each test run.

```bash
# Generate and open the Serenity report
npm run test:report
```

Reports are saved to:

```
target/site/serenity/index.html
```

> 📌 The report includes **test timelines**, **screenshots**, **step-by-step logs**, and **aggregate statistics** across all test runs.

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `@playwright/test` | Core browser automation and test runner |
| `@serenity-js/core` | Screenplay pattern foundation |
| `@serenity-js/web` | Web interaction abstractions |
| `@serenity-js/playwright` | Playwright adapter for Serenity/JS |
| `@serenity-js/playwright-test` | Integration with Playwright Test runner |
| `@serenity-js/assertions` | Fluent assertion library |
| `@serenity-js/console-reporter` | Console output reporter |
| `@serenity-js/serenity-bdd` | BDD-style HTML report generation |
| `rimraf` | Cross-platform directory cleanup |
| `npm-failsafe` | Ensures cleanup scripts run even on test failure |

---

## 🧑‍💻 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ using <strong>Playwright</strong> + <strong>Serenity/JS</strong>
</div>
