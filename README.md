# 🎭 Playwright JS Serenity Framework

A scalable end-to-end test automation framework built using **Playwright** and **Serenity/JS**, designed for maintainability, readability, and rich reporting.

---

## 📁 Project Structure

```bash
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
```

---

## 🚀 Setup Instructions

### 1️⃣ Create Project

```bash
mkdir playwright-js-serenity-framework
cd playwright-js-serenity-framework
npm init -y
```

---

### 2️⃣ Install Dependencies

#### Playwright

```bash
npm install -D @playwright/test
```

#### Serenity/JS

```bash
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
```

---

## ▶️ Running Tests

### 🪟 Windows CMD

```bash
set BASE_URL=https://www.saucedemo.com && set HEADLESS=false && set BROWSER_CHANNEL=chrome && npm run test:regression
```

---

### 🐢 Windows CMD (Slow Execution)

```bash
set BASE_URL=https://www.saucedemo.com && set HEADLESS=false && set BROWSER_CHANNEL=chrome && set SLOWMO=1000 && npm run test:regression
```

---

### ⚡ PowerShell

```powershell
$env:BASE_URL="https://www.saucedemo.com";
$env:BROWSER_CHANNEL="chrome";
$env:HEADLESS="false";
$env:SLOWMO="1000";

npm run clean;
npx playwright test --grep "@ui";
npm run test:report
```

---

### Mac Terminal

```Terminal
BASE_URL=https://www.saucedemo.com HEADLESS=false BROWSER_CHANNEL=chrome npm run test:smoke
```


## 📊 Reporting

After execution, Serenity reports are generated at:

```bash
target/site/serenity/
```

Open the report in your browser to view:

* Test results
* Step-level details
* Execution timeline
* Screenshots (if configured)

---

## 🧩 Key Features

* ✅ Page Object Model (POM) structure
* ✅ Serenity/JS rich reporting
* ✅ Cross-browser support via Playwright
* ✅ Environment-based configuration
* ✅ Tag-based test execution (`@ui`, `@regression`, etc.)
* ✅ Easy CI/CD integration

---

## 🛠️ Useful Scripts (Example)

Add these to your `package.json`:

```json
"scripts": {
  "clean": "rimraf target",
  "test": "playwright test",
  "test:regression": "playwright test --grep @regression",
  "test:report": "serenity-bdd run"
}
```

---

## 📌 Notes

* Ensure Playwright browsers are installed:

  ```bash
  npx playwright install
  ```
* Customize environment variables as needed.
* Use tags to control execution scope.

---

## 🤝 Contribution

Feel free to fork, improve, and raise pull requests!

---

