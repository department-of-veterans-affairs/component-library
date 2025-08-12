import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-tabs label="Filtered content options">
        <va-tab-item target-id="panel-1" button-text="Tab 1"></va-tab-item>
        <va-tab-item target-id="panel-2" button-text="Tab 2"></va-tab-item>
        <va-tab-item target-id="panel-3" button-text="Tab 3"></va-tab-item>
        <va-tab-panel panel-id="panel-1">
          <h2>Panel 1</h2>
          <p>This is the content for Panel 1.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-2">
          <h2>Panel 2</h2>
          <p>This is the content for Panel 2.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-2">
          <h2>Panel 2</h2>
          <p>This is the content for Panel 2.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-3">
          <h2>Panel 3</h2>
          <p>This is the content for Panel 3.</p>
        </va-tab-panel>
      </va-tabs>
    `);

    const el = await page.find('va-tabs');
    expect(el).not.toBeNull();
  });

  it('does not render if no children are passed', async () => {
    const page = await newE2EPage();

    await page.setContent(`<va-tabs></va-tabs>`);

    const elementHandle = await page.$('va-tabs');
    await page.waitForChanges();

    const shadowContent = await page.evaluate(
      el => el.shadowRoot.innerHTML.trim(),
      elementHandle,
    );

    expect(shadowContent).toBe('');
  });

  it('selects tab and shows correct panel', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-tabs label="Filtered content options" initially-selected"0">
        <va-tab-item target-id="panel-1" button-text="Tab 1"></va-tab-item>
        <va-tab-item target-id="panel-2" button-text="Tab 2"></va-tab-item>
        <va-tab-item target-id="panel-3" button-text="Tab 3"></va-tab-item>
        <va-tab-panel panel-id="panel-1">
          <h2>Panel 1</h2>
          <p>This is the content for Panel 1.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-2">
          <h2>Panel 2</h2>
          <p>This is the content for Panel 2.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-2">
          <h2>Panel 2</h2>
          <p>This is the content for Panel 2.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-3">
          <h2>Panel 3</h2>
          <p>This is the content for Panel 3.</p>
        </va-tab-panel>
      </va-tabs>
    `);

    const tabItems = await page.findAll('va-tab-item');
    expect(tabItems.length).toEqual(3);

    const tab2 = await page.find('va-tab-item[target-id="panel-2"]');
    expect(tab2).not.toBeNull();
    await page.$eval('va-tab-item[target-id="panel-2"]', el => el.click());

    await page.waitForChanges();

    // Check that tab2 is selected
    const ariaSelected = tab2.getAttribute('aria-selected');
    expect(ariaSelected).toBe('true');
  });

  it('respects the initially-selected prop', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-tabs label="Filtered content options" initially-selected="1">
        <va-tab-item target-id="panel-1" button-text="Tab 1"></va-tab-item>
        <va-tab-item target-id="panel-2" button-text="Tab 2"></va-tab-item>
        <va-tab-item target-id="panel-3" button-text="Tab 3"></va-tab-item>
        <va-tab-panel panel-id="panel-1">
          <h2>Panel 1</h2>
          <p>This is the content for Panel 1.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-2">
          <h2>Panel 2</h2>
          <p>This is the content for Panel 2.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-2">
          <h2>Panel 2</h2>
          <p>This is the content for Panel 2.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-3">
          <h2>Panel 3</h2>
          <p>This is the content for Panel 3.</p>
        </va-tab-panel>
      </va-tabs>
    `);

    const tabItems = await page.findAll('va-tab-item');
    expect(tabItems.length).toEqual(3);

    expect(tabItems[1].getAttribute('aria-selected')).toBe('true');
  });

  it('sets the selected attribute, removes the hidden attribute, and updates tabindex on the corresponding tab panel when a tab item is clicked', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-tabs label="Filtered content options" initially-selected="0">
        <va-tab-item target-id="panel-1" button-text="Tab 1"></va-tab-item>
        <va-tab-item target-id="panel-2" button-text="Tab 2"></va-tab-item>
        <va-tab-item target-id="panel-3" button-text="Tab 3"></va-tab-item>
        <va-tab-panel panel-id="panel-1">
          <h2>Panel 1</h2>
          <p>This is the content for Panel 1.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-2">
          <h2>Panel 2</h2>
          <p>This is the content for Panel 2.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-3">
          <h2>Panel 3</h2>
          <p>This is the content for Panel 3.</p>
        </va-tab-panel>
      </va-tabs>

    const tabItems = await page.findAll('va-tab-item');
    expect(tabItems.length).toEqual(3);

    const tabPanels = await page.findAll('va-tab-panel');
    expect(tabPanels.length).toEqual(3);

    const tab2 = await page.find('va-tab-item[target-id="panel-2"]');
    expect(tab2).not.toBeNull();
    await page.$eval('va-tab-item[target-id="panel-2"]', el => el.click());

    await page.waitForChanges();

    const panel2 = await page.find('va-tab-panel[panel-id="panel-2"]');
    expect(panel2).not.toBeNull();

    const selectedAttr = panel2.getAttribute('selected');
    expect(selectedAttr).toEqual("");

    const hiddenAttr = panel2.getAttribute('hidden');
    expect(hiddenAttr).toEqual(null);

    const tabIndexAttr = panel2.getAttribute("tabindex");
    expect(tabIndexAttr).toEqual("0");
  });

  it('updates the aria-pressed attribute on tab items when one is clicked', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-tabs label="Filtered content options" initially-selected="0">
        <va-tab-item target-id="panel-1" button-text="Tab 1"></va-tab-item>
        <va-tab-item target-id="panel-2" button-text="Tab 2"></va-tab-item>
        <va-tab-item target-id="panel-3" button-text="Tab 3"></va-tab-item>
        <va-tab-panel panel-id="panel-1">
          <h2>Panel 1</h2>
          <p>This is the content for Panel 1.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-2">
          <h2>Panel 2</h2>
          <p>This is the content for Panel 2.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-3">
          <h2>Panel 3</h2>
          <p>This is the content for Panel 3.</p>
        </va-tab-panel>
      </va-tabs>
    `);

    const tabItems = await page.findAll('va-tab-item');
    expect(tabItems.length).toEqual(3);

    const tab2 = await page.find('va-tab-item[target-id="panel-2"]');
    expect(tab2).not.toBeNull();
    await page.$eval('va-tab-item[target-id="panel-2"]', el => el.click());

    await page.waitForChanges();

    // Check that tab2 is selected
    const ariaSelected = tab2.getAttribute('aria-selected');
    expect(ariaSelected).toBe('true');
  });

  it('updates the tabindex attribute on both va-tab-item when right arrow and left arrow keys are pressed', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-tabs label="Filtered content options" initially-selected="0">
        <va-tab-item target-id="panel-1" button-text="Tab 1"></va-tab-item>
        <va-tab-item target-id="panel-2" button-text="Tab 2"></va-tab-item>
        <va-tab-item target-id="panel-3" button-text="Tab 3"></va-tab-item>
        <va-tab-panel panel-id="panel-1">
          <h2>Panel 1</h2>
          <p>This is the content for Panel 1.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-2">
          <h2>Panel 2</h2>
          <p>This is the content for Panel 2.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-3">
          <h2>Panel 3</h2>
          <p>This is the content for Panel 3.</p>
        </va-tab-panel>
      </va-tabs>
    `);

    await page.waitForChanges();

    const tabItems = await page.findAll('va-tab-item');
    expect(tabItems.length).toEqual(3);

    const tabPanels = await page.findAll('va-tab-panel');
    expect(tabPanels.length).toEqual(3);

    // Focus on first tab item
    await tabItems[0].focus();

    // Simulate right arrow key press
    await page.keyboard.press('ArrowRight');

    await page.waitForChanges();

    // Check that the tabindex attribute has been updated
    expect(tabItems[0].getAttribute('tabindex')).toBe('-1');
    expect(tabItems[1].getAttribute('tabindex')).toBe('0');

    // Simulate left arrow key press
    await page.keyboard.press('ArrowLeft');

    await page.waitForChanges();

    // Check that the tabindex attribute has been updated
    expect(tabItems[0].getAttribute('tabindex')).toBe('0');
    expect(tabItems[1].getAttribute('tabindex')).toBe('-1');
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-tabs label="Filtered content options" initially-selected"0">
        <va-tab-item target-id="panel-1" button-text="Tab 1"></va-tab-item>
        <va-tab-item target-id="panel-2" button-text="Tab 2"></va-tab-item>
        <va-tab-item target-id="panel-3" button-text="Tab 3"></va-tab-item>
        <va-tab-panel panel-id="panel-1">
          <h2>Panel 1</h2>
          <p>This is the content for Panel 1.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-2">
          <h2>Panel 2</h2>
          <p>This is the content for Panel 2.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-2">
          <h2>Panel 2</h2>
          <p>This is the content for Panel 2.</p>
        </va-tab-panel>
        <va-tab-panel panel-id="panel-3">
          <h2>Panel 3</h2>
          <p>This is the content for Panel 3.</p>
        </va-tab-panel>
      </va-tabs>
    `);

    await page.waitForChanges()

    await axeCheck(page);
  });
});
