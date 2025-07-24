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
        <va-tab-panel panel-id="panel-1" selected="true">
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
      <va-tabs label="Filtered content options" selected="0">
        <va-tab-item target-id="panel-1" button-text="Tab 1"></va-tab-item>
        <va-tab-item target-id="panel-2" button-text="Tab 2"></va-tab-item>
        <va-tab-item target-id="panel-3" button-text="Tab 3"></va-tab-item>
        <va-tab-panel panel-id="panel-1" selected="true">
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

  it('respects the selected prop', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-tabs label="Filtered content options" selected="1">
        <va-tab-item target-id="panel-1" button-text="Tab 1"></va-tab-item>
        <va-tab-item target-id="panel-2" button-text="Tab 2"></va-tab-item>
        <va-tab-item target-id="panel-3" button-text="Tab 3"></va-tab-item>
        <va-tab-panel panel-id="panel-1" selected="true">
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

  it('only renders a maximum of 3 tabs', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-tabs label="Filtered content options" selected="1">
        <va-tab-item target-id="panel-1" button-text="Tab 1"></va-tab-item>
        <va-tab-item target-id="panel-2" button-text="Tab 2"></va-tab-item>
        <va-tab-item target-id="panel-3" button-text="Tab 3"></va-tab-item>
        <va-tab-item target-id="panel-4" button-text="Tab 4"></va-tab-item>
        <va-tab-panel panel-id="panel-1" selected="true">
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
        <va-tab-panel panel-id="panel-4">
          <h2>Panel 4</h2>
          <p>This is the content for Panel 4.</p>
        </va-tab-panel>
      </va-tabs>
    `);
    await page.waitForChanges();

    const tabs = await page.findAll('va-tabs >>> button');
    expect(tabs.length).toBeLessThanOrEqual(3);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-tabs label="Filtered content options" selected="0">
        <va-tab-item target-id="panel-1" button-text="Tab 1"></va-tab-item>
        <va-tab-item target-id="panel-2" button-text="Tab 2"></va-tab-item>
        <va-tab-item target-id="panel-3" button-text="Tab 3"></va-tab-item>
        <va-tab-panel panel-id="panel-1" selected="true">
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
