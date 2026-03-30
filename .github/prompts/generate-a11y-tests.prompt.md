# Generate Accessibility Tests

Use this prompt in the **component-library** repo to generate working Stencil e2e tests for specific accessibility test IDs identified by the audit prompt.

## Prerequisites

**Run the audit prompt first**: Use `audit-a11y-test-coverage.prompt.md` to identify which tests are missing. This prompt generates tests for specific test IDs from that audit.

## Step 1: Get test IDs to implement

Ask the user which tests to generate, or accept them as parameters:
- **Option 1**: "Generate all Priority 1 uncovered tests"
- **Option 2**: "Generate tests for WEB-211, WEB-247, WEB-1412"
- **Option 3**: Let user specify test IDs manually

**Recommended approach**: Start with 2-3 Priority 1 tests, validate they work, then generate remaining tests.

## Step 2: Gather context

For each test ID to implement, you need:

### A. Test definition from library

Fetch from `vets-design-system-documentation` repo (local or remote):
- `id`
- `description_short`
- `automation_notes` - Contains the "Assert"/"Check"/"Use" instructions
- `wcag_criterion` and `wcag_name`

### B. Component structure

Read the component implementation to understand:
- Interactive elements and their selectors
- Shadow DOM structure
- Props and their default values
- Typical usage patterns (check Storybook stories if needed)

### C. Existing test patterns

Read existing e2e tests in `packages/web-components/src/components/va-[component]/test/` to:
- Match coding style
- Identify working selectors
- Reuse setup patterns

## Step 3: Choose the right test file

**For compound components** (have child components):

### Parent component tests (`va-[parent].e2e.ts`)
Tests that involve multiple items or parent-level features:
- **WEB-132** - Content order (multiple items)
- **WEB-134** - Orientation (whole component)
- **WEB-144** - Text resize (whole component)
- **WEB-1410** - Reflow (whole component)
- **WEB-2411** - Focus not obscured (viewport-level)
- Parent-specific features (expand all, collapse all)

### Child component tests (`va-[child].e2e.ts`)
Tests focusing on individual item behavior:
- **WEB-211** - Keyboard operation (single item focus/activation)
- **WEB-212** - No keyboard trap (single item)
- **WEB-247** - Focus indicator (single element)
- **WEB-1412** - Text spacing (single item)
- **WEB-412-002** - ARIA state (single element state changes)

**Rule of thumb**: Single interactive element → child file. Multiple elements or whole component → parent file.

**For simple components**: Add all tests to `va-[component].e2e.ts`.

## Step 4: Generate test code

Reference the `@stencil-e2e-testing` skill for test patterns. Generate tests following these conventions:

### Test structure

```typescript
// At top of file (if not already present)
import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

// At end of file, group accessibility tests
describe('accessibility - WEB-XXX [category]', () => {
  it('[describes what is tested]', async () => {
    // Test implementation
  });
});
```

### Use automation_notes instructions

The `automation_notes` field tells you exactly what to test:

**Example**: WEB-211 says "Tab to element, press Enter or Space, verify element activates"

```typescript
describe('accessibility - WEB-211 keyboard operation', () => {
  it('accordion buttons are fully keyboard operable with Tab and Enter', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-accordion>
        <va-accordion-item header="First item">Content</va-accordion-item>
      </va-accordion>`);

    // Tab to accordion button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // Account for expand/collapse buttons

    const button = await page.find('va-accordion-item >>> button');
    expect(button.getAttribute('aria-expanded')).toEqual('false');

    // Press Enter to activate
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(button.getAttribute('aria-expanded')).toEqual('true');
  });
});
```

### Component-specific considerations

**Check for compound structure**:
```typescript
// ❌ Wrong for accordion
await page.setContent(`<va-accordion-item header="Test">Content</va-accordion-item>`);

// ✅ Correct - use compound structure
await page.setContent(`
  <va-accordion>
    <va-accordion-item header="Test">Content</va-accordion-item>
  </va-accordion>`);
```

**Account for all focusable elements**:
```typescript
// If component has expand/collapse buttons, account for them in Tab count
await page.keyboard.press('Tab'); // Expand all
await page.keyboard.press('Tab'); // Collapse all
await page.keyboard.press('Tab'); // First accordion item
```

**Use actual component content**:
```typescript
// ❌ Generic placeholder
<va-text-input label="Input">

// ✅ Realistic content
<va-text-input required label="First name" hint="Enter your legal first name">
```

## Step 5: Validate tests work

**Critical**: Validate each batch of tests before generating more. Reference `@puppeteer-chrome-setup` skill for troubleshooting.

### Syntax validation (always works)

```bash
cd packages/web-components
yarn lint src/components/va-[component]/test/*.ts
```

Expected: Only i18next warnings (safe to ignore)

### Run tests (requires Chrome)

```bash
cd packages/web-components
npx stencil test --e2e --spec -- src/components/va-[component]/test/va-[component].e2e.ts
```

**If Chrome errors occur**: Reference `@puppeteer-chrome-setup` skill for solutions.

### Incremental approach

1. **Generate** 2-3 tests
2. **Validate** they pass
3. **Fix** any issues (selectors, timing, shadow DOM)
4. **Use working tests as templates** for remaining tests
5. **Repeat** until all tests are implemented

This catches issues early rather than debugging many failing tests.

## Step 6: Review and document

Present the generated tests with:

1. **Files modified**: List which test files were updated
2. **Tests added**: List test IDs covered (e.g., "WEB-211, WEB-247, WEB-1412")
3. **Coverage status**: "These tests cover X of Y uncovered items from the audit"
4. **Validation results**: "✅ All tests pass" or "⚠️ Tests need Chrome setup (see @puppeteer-chrome-setup)"
5. **Next steps**: If not all tests generated, suggest: "Ready to generate remaining tests: [list IDs]"

## Important notes

- **Shadow DOM**: Always use `>>>` to pierce shadow DOM: `page.find('va-component >>> button')`
- **Timing**: Add `await page.waitForChanges()` after interactions that trigger component updates
- **Realistic content**: Check Storybook stories for typical usage patterns
- **Existing patterns**: Reuse setup patterns from existing tests in the same file
- **Partial coverage**: For tests with `automation_coverage: partial`, add a comment noting what requires manual review

## Example output format

```typescript
// Added to packages/web-components/src/components/va-accordion/test/va-accordion-item.e2e.ts

describe('accessibility - WEB-211 keyboard operation', () => {
  it('accordion buttons are fully keyboard operable with Tab and Enter', async () => {
    // ... test implementation
  });

  it('accordion buttons are fully keyboard operable with Space', async () => {
    // ... test implementation
  });
});

describe('accessibility - WEB-247 focus indicator', () => {
  it('displays visible focus indicator on accordion buttons', async () => {
    // ... test implementation
  });
});
```

## When to stop and ask for help

- **Complex interactions**: If the component has non-standard interaction patterns not covered in `@stencil-e2e-testing`
- **Accessibility uncertainty**: If unsure whether the generated test truly validates the WCAG requirement
- **Multiple valid approaches**: If there are several ways to test something, present options to user
- **Selector uncertainty**: If unsure which shadow DOM selector reaches the right element

Always err on the side of generating working, conservative tests rather than comprehensive but broken tests.
