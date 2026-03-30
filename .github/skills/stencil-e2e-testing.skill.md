# Stencil E2E Testing Patterns - Skill

Domain: Writing e2e tests for Stencil web components in the VA Design System component-library

## When to use this skill

- Writing or fixing e2e tests for VA web components
- Dealing with shadow DOM selectors
- Testing keyboard interactions, focus, or viewport behavior
- Debugging timing issues in component tests

## Core Concepts

### Shadow DOM Selectors

VA web components use shadow DOM. Use `>>>` (deep pierce) to reach shadow elements:

```typescript
// ❌ Won't work - can't reach into shadow DOM
const button = await page.find('button');

// ✅ Works - pierces shadow DOM
const button = await page.find('va-accordion-item >>> button');

// ✅ Multiple levels deep
const icon = await page.find('va-accordion >>> va-button-icon >>> button >>> va-icon');
```

### Timing and Updates

Always wait for changes after interactions:

```typescript
await button.click();
await page.waitForChanges(); // Let component update
expect(button.getAttribute('aria-expanded')).toEqual('true');
```

### Test File Imports

```typescript
import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';
```

## Common Test Patterns

### Baseline: axe-core Check

Every component should have an axeCheck test:

```typescript
it('passes an axe check', async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <va-accordion>
      <va-accordion-item header="First item">Content</va-accordion-item>
    </va-accordion>`);

  await axeCheck(page);
});
```

### Keyboard Navigation

**Tab to element**:
```typescript
it('is keyboard operable', async () => {
  const page = await newE2EPage();
  await page.setContent(`<va-button>Click me</va-button>`);

  await page.keyboard.press('Tab');
  const button = await page.find('va-button >>> button');

  // Verify focused
  const isFocused = await page.evaluate(() => {
    return document.activeElement?.tagName.toLowerCase() === 'va-button';
  });
  expect(isFocused).toBe(true);
});
```

**Activate with Enter or Space**:
```typescript
it('activates with Enter key', async () => {
  const page = await newE2EPage();
  await page.setContent(`<va-accordion-item header="Item">Content</va-accordion-item>`);

  const button = await page.find('va-accordion-item >>> button');
  await button.focus();

  await page.keyboard.press('Enter');
  await page.waitForChanges();

  expect(button.getAttribute('aria-expanded')).toEqual('true');
});
```

**Track focus order**:
```typescript
it('maintains logical tab order', async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <va-accordion>
      <va-accordion-item header="First">Content</va-accordion-item>
      <va-accordion-item header="Second">Content</va-accordion-item>
    </va-accordion>`);

  const focusOrder = [];
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('Tab');
    const activeText = await page.evaluate(() => {
      const active = document.activeElement?.shadowRoot?.activeElement;
      return active?.textContent?.trim() || active?.getAttribute('data-testid');
    });
    focusOrder.push(activeText);
  }

  expect(focusOrder).toEqual(['Expand all', 'Collapse all', 'First', 'Second']);
});
```

**No keyboard trap**:
```typescript
it('does not trap keyboard focus', async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <button id="before">Before</button>
    <va-modal visible>Modal content</va-modal>
    <button id="after">After</button>
  `);

  await page.keyboard.press('Tab'); // before
  await page.keyboard.press('Tab'); // modal
  await page.keyboard.press('Tab'); // should move to after

  const activeId = await page.evaluate(() => document.activeElement?.id);
  expect(activeId).toBe('after');
});
```

### Focus Visibility

```typescript
it('displays visible focus indicator', async () => {
  const page = await newE2EPage();
  await page.setContent(`<va-button>Click</va-button>`);

  await page.keyboard.press('Tab');
  const button = await page.find('va-button >>> button');
  const style = await button.getComputedStyle();

  const hasOutline = style.outline && style.outline !== 'none';
  const hasBoxShadow = style.boxShadow && style.boxShadow !== 'none';

  expect(hasOutline || hasBoxShadow).toBeTruthy();
});
```

### ARIA Attributes

**State changes**:
```typescript
it('updates aria-expanded on toggle', async () => {
  const page = await newE2EPage();
  await page.setContent(`<va-accordion-item header="Item">Content</va-accordion-item>`);

  const button = await page.find('va-accordion-item >>> button');
  expect(button.getAttribute('aria-expanded')).toEqual('false');

  await button.click();
  await page.waitForChanges();

  expect(button.getAttribute('aria-expanded')).toEqual('true');
});
```

**Check for presence**:
```typescript
it('has aria-label on icon button', async () => {
  const page = await newE2EPage();
  await page.setContent(`<va-icon-button icon="close"></va-icon-button>`);

  const button = await page.find('va-icon-button >>> button');
  const ariaLabel = button.getAttribute('aria-label');

  expect(ariaLabel).not.toBeNull();
  expect(ariaLabel.length).toBeGreaterThan(0);
});
```

### Viewport and Responsive

**Set viewport before content**:
```typescript
it('renders in portrait orientation', async () => {
  const page = await newE2EPage();
  await page.setViewport({ width: 375, height: 667 }); // BEFORE setContent
  await page.setContent(`<va-accordion><va-accordion-item header="Item">Content</va-accordion-item></va-accordion>`);

  const button = await page.find('va-accordion-item >>> button');
  expect(await button.isVisible()).toBeTruthy();
});
```

**Check for overflow**:
```typescript
it('does not overflow at 320px viewport', async () => {
  const page = await newE2EPage();
  await page.setViewport({ width: 320, height: 568 });
  await page.setContent(`<va-accordion><va-accordion-item header="Long text item">Content</va-accordion-item></va-accordion>`);

  const accordion = await page.find('va-accordion');
  const overflow = await accordion.evaluate(el => {
    return el.scrollWidth > el.clientWidth;
  });

  expect(overflow).toBeFalsy();
});
```

### Injected Styles

**WCAG text spacing**:
```typescript
it('handles adjusted text spacing', async () => {
  const page = await newE2EPage();
  await page.setContent(`<va-button>Long button text here</va-button>`);

  await page.addStyleTag({
    content: `
      * {
        line-height: 1.5em !important;
        letter-spacing: 0.12em !important;
        word-spacing: 0.16em !important;
      }
    `
  });

  await page.waitForChanges();

  const button = await page.find('va-button >>> button');
  const overflow = await button.evaluate(el => {
    return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
  });

  expect(overflow).toBeFalsy();
});
```

**Zoom simulation**:
```typescript
it('maintains functionality at 200% zoom', async () => {
  const page = await newE2EPage();
  await page.setContent(`<va-accordion-item header="Item">Content</va-accordion-item>`);

  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  await page.waitForChanges();

  const button = await page.find('va-accordion-item >>> button');
  await button.click();
  await page.waitForChanges();

  expect(button.getAttribute('aria-expanded')).toEqual('true');
});
```

### Element Dimensions

**Target size**:
```typescript
it('has minimum 24x24 pixel target size', async () => {
  const page = await newE2EPage();
  await page.setContent(`<va-link href="#">Link text</va-link>`);

  const link = await page.find('va-link >>> a');
  const size = await link.evaluate(el => {
    const rect = el.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });

  expect(size.width).toBeGreaterThanOrEqual(24);
  expect(size.height).toBeGreaterThanOrEqual(24);
});
```

**Focus not obscured**:
```typescript
it('focused element remains fully visible', async () => {
  const page = await newE2EPage();
  await page.setContent(`<va-button>Click</va-button>`);

  await page.keyboard.press('Tab');
  const button = await page.find('va-button >>> button');
  const rect = await button.evaluate(el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, left: r.left, right: r.right };
  });

  const viewport = page.viewport();
  expect(rect.top >= 0).toBeTruthy();
  expect(rect.bottom <= viewport.height).toBeTruthy();
  expect(rect.left >= 0).toBeTruthy();
  expect(rect.right <= viewport.width).toBeTruthy();
});
```

## Common Pitfalls

### Shadow DOM selector issues

**Problem**: `page.find('button')` returns null

**Solution**: Use `>>>` to pierce shadow DOM levels:
```typescript
// Count the shadow DOM levels
// va-accordion → shadow → va-accordion-item → shadow → button
const button = await page.find('va-accordion-item >>> button');
```

### Timing issues

**Problem**: "Cannot read property of null"

**Solution**: Add `waitForChanges()` after state-changing interactions:
```typescript
await button.click();
await page.waitForChanges(); // Component needs time to update
expect(button.getAttribute('aria-expanded')).toEqual('true');
```

### Tab count mismatch

**Problem**: Tab doesn't land on expected element

**Solution**: Count ALL focusable elements in the component:
```typescript
// va-accordion has expand all + collapse all buttons before items
await page.keyboard.press('Tab'); // Expand all
await page.keyboard.press('Tab'); // Collapse all
await page.keyboard.press('Tab'); // First accordion item
```

Or focus directly:
```typescript
const button = await page.find('va-accordion-item >>> button');
await button.focus();
```

### Viewport not applying

**Problem**: Viewport size doesn't affect test

**Solution**: Call `setViewport` BEFORE `setContent`:
```typescript
const page = await newE2EPage();
await page.setViewport({ width: 320, height: 568 }); // Before
await page.setContent(`<va-component></va-component>`); // After
```

### getComputedStyle on wrong element

**Problem**: Style check fails unexpectedly

**Solution**: Get style on the actual shadow element:
```typescript
const button = await page.find('va-accordion-item >>> button'); // ← Shadow element
const style = await button.getComputedStyle(); // Not on va-accordion-item
```

## Test Grouping

Group accessibility tests in describe blocks:

```typescript
describe('accessibility - WEB-211 keyboard operation', () => {
  it('element is keyboard operable with Tab and Enter', async () => { ... });
  it('element is keyboard operable with Space', async () => { ... });
});

describe('accessibility - WEB-247 focus indicator', () => {
  it('displays visible focus indicator', async () => { ... });
});
```

This makes test output readable and groups related assertions.
