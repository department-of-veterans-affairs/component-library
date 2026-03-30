# Puppeteer and Chrome Setup - Skill

Domain: Running Stencil e2e tests with Puppeteer/Chrome in the component-library

## When to use this skill

- Setting up e2e test environment
- Troubleshooting "Could not find Chrome" errors
- Running Stencil e2e tests
- Validating test syntax without running tests
- CI/CD test configuration

## Prerequisites Check

Stencil e2e tests require:
1. Node.js (v18.x or v22.x)
2. Yarn
3. Chrome or Chromium browser
4. Puppeteer (installed via yarn)

## Running Tests

### Navigate to web-components package

```bash
cd packages/web-components
```

### Option 1: Run specific test file (recommended)

For validating newly generated tests:

```bash
npx stencil test --e2e --spec -- src/components/va-[component]/test/va-[component].e2e.ts
```

### Option 2: Run all tests

```bash
yarn test
```

This runs both unit tests and e2e tests for all components.

### Option 3: Watch mode

For iterative test development:

```bash
npx stencil test --e2e --watchAll -- src/components/va-[component]/test/va-[component].e2e.ts
```

Tests rerun automatically when files change.

### Option 4: Syntax validation only

If Chrome isn't working, at least validate TypeScript syntax:

```bash
yarn lint src/components/va-[component]/test/*.ts
```

**Expected output**: Only i18next warnings about literal strings (safe to ignore in test files)

**Red flags**: Import errors, syntax errors, type mismatches

## Troubleshooting Chrome/Puppeteer

### Error: "Could not find Chrome (ver. X.X.X)"

This means Puppeteer can't find Chrome. Try these solutions in order:

#### Solution 1: Reinstall Puppeteer

```bash
cd packages/web-components
rm -rf node_modules/puppeteer*
yarn install
```

This reinstalls Puppeteer and downloads the correct Chrome version.

#### Solution 2: Use system Chrome

Tell Puppeteer to use your installed Chrome instead of downloading its own:

**macOS**:
```bash
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

**Linux**:
```bash
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH=$(which google-chrome)
# or
export PUPPETEER_EXECUTABLE_PATH=$(which chromium-browser)
```

Then rerun tests.

#### Solution 3: Clear Puppeteer cache

```bash
rm -rf ~/.cache/puppeteer
cd packages/web-components
yarn install
```

#### Solution 4: Install Chrome/Chromium

If Chrome isn't installed:

**macOS**:
```bash
brew install --cask google-chrome
```

**Ubuntu/Debian**:
```bash
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
sudo apt-get update
sudo apt-get install google-chrome-stable
```

**Or use Chromium**:
```bash
sudo apt-get install chromium-browser
```

### Warning: "Puppeteer old Headless deprecation warning"

**Message**:
```
Puppeteer old Headless deprecation warning:
  In the near future `headless: true` will default to the new Headless mode
```

**Action**: Ignore this. It's informational only and doesn't affect test execution. The Stencil team will update to new headless mode in a future release.

### Error: "Protocol error: Target closed"

**Cause**: Chrome crashed during test execution

**Solutions**:
- Add `--no-sandbox` flag (CI environments):
  ```bash
  CHROME_BIN=$(which google-chrome) npx stencil test --e2e
  ```
- Reduce parallel test workers:
  ```bash
  yarn test --maxWorkers=2
  ```
- Check for infinite loops or non-terminating async operations in tests

### Tests hang or timeout

**Cause**: Missing `await` or `waitForChanges()`

**Solution**: Ensure all async operations are awaited:
```typescript
// ❌ Missing await
button.click();
page.waitForChanges();

// ✅ Correct
await button.click();
await page.waitForChanges();
```

## CI/CD Setup

### GitHub Actions Example

```yaml
name: E2E Tests

on: [pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Chrome
        run: |
          wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
          sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
          sudo apt-get update
          sudo apt-get install -y google-chrome-stable

      - name: Install dependencies
        run: yarn install

      - name: Run E2E Tests
        run: |
          cd packages/web-components
          yarn test --maxWorkers=2
```

### Docker Example

```dockerfile
FROM node:18

# Install Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -y google-chrome-stable

# Install dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# Run tests
CMD ["yarn", "test"]
```

## Test Output

### Successful run

```
@stencil/core v4.20.0 ✨
testing e2e files

PASS  src/components/va-accordion/test/va-accordion-item.e2e.ts
  ✓ renders (234ms)
  ✓ passes an axe check (156ms)
  accessibility - WEB-211 keyboard operation
    ✓ accordion buttons are fully keyboard operable with Tab and Enter (189ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

### Failed test

```
FAIL  src/components/va-accordion/test/va-accordion-item.e2e.ts
  ✕ accordion buttons are fully keyboard operable with Tab and Enter (234ms)

  ● accordion buttons are fully keyboard operable with Tab and Enter

    expect(received).toEqual(expected)

    Expected: "true"
    Received: "false"

      67 |       await page.waitForChanges();
      68 |
    > 69 |       expect(button.getAttribute('aria-expanded')).toEqual('true');
         |                                                    ^
```

Read the error message carefully - it shows the exact line and what value was expected vs received.

## Performance Tips

### Speed up test runs

1. **Run specific files**: Don't run all tests when developing one component
2. **Reduce workers**: Use `--maxWorkers=2` on slower machines
3. **Use watch mode**: Only reruns changed tests
4. **Skip flaky tests temporarily**: Use `it.skip()` to isolate issues

### Debug individual tests

```bash
# Run single test file with verbose output
npx stencil test --e2e --spec -- src/components/va-accordion/test/va-accordion-item.e2e.ts

# Add console.log in tests to debug
await page.evaluate(() => console.log(document.activeElement));
```

## Quick Reference

| Task | Command |
|------|---------|
| Run one test file | `npx stencil test --e2e --spec -- src/components/va-X/test/va-X.e2e.ts` |
| Run all tests | `yarn test` |
| Watch mode | `npx stencil test --e2e --watchAll -- src/components/va-X/test/va-X.e2e.ts` |
| Lint only | `yarn lint src/components/va-X/test/*.ts` |
| Check Chrome path | `which google-chrome` or `which chromium-browser` |
| Clear Puppeteer cache | `rm -rf ~/.cache/puppeteer` |
| Reinstall dependencies | `rm -rf node_modules && yarn install` |

## When to ask for help

- Chrome errors persist after trying all solutions
- Tests pass locally but fail in CI
- Need to configure custom Chrome flags
- Memory or performance issues during test runs
