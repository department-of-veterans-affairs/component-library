import { newE2EPage } from '@stencil/core/testing';
// import { axeCheck } from '../../../testing/test-helpers';

describe('va-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-tabs label="Filtered content options">
        <va-tab-item target-id="tab1">Tab 1</va-tab-item>
        <va-tab-item target-id="tab2">Tab 2</va-tab-item>
        <va-tab-item target-id="tab3">Tab 3</va-tab-item>
      </va-tabs>`
    );

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
      <va-tabs label="Filtered content options">
        <va-tab-item target-id="tab1">Tab 1</va-tab-item>
        <va-tab-item target-id="tab2">Tab 2</va-tab-item>
        <va-tab-item target-id="tab3">Tab 3</va-tab-item>
      </va-tabs>`
    );

    const buttons = await page.findAll(
      'va-tab-item >>> button',
    );
    expect(buttons.length).toEqual(3);

    // Trigger click
    const button2 = buttons[1];
    await button2.click();

    await page.waitForChanges();

    // Check that tab2 is selected
    const ariaSelected = button2.getAttribute('aria-selected');
    expect(ariaSelected).toBe('true');
  });

  it('respects the selected prop', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-tabs label="Filtered content options" selected="1">
        <va-tab-item target-id="tab1">Tab 1</va-tab-item>
        <va-tab-item target-id="tab2">Tab 2</va-tab-item>
        <va-tab-item target-id="tab3">Tab 3</va-tab-item>
      </va-tabs>`
    );

    const buttons = await page.findAll(
      'va-tab-item >>> button',
    );
    expect(buttons.length).toEqual(3);

    expect(buttons[1].getAttribute('aria-selected')).toBe('true');
  });

  it('only renders a maximum of 3 tabs', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <va-tabs>
        <va-tab-item target-id="tab1">Tab 1</va-tab-item>
        <va-tab-item target-id="tab2">Tab 2</va-tab-item>
        <va-tab-item target-id="tab3">Tab 3</va-tab-item>
        <va-tab-item target-id="tab4">Tab 4</va-tab-item>
        <va-tab-item target-id="tab5">Tab 5</va-tab-item>
      </va-tabs>`
    );
    await page.waitForChanges();

    const tabs = await page.findAll('va-tabs >>> button');
    expect(tabs.length).toBeLessThanOrEqual(3);
  });

  // it('passes an axe check', async () => {
  //   const page = await newE2EPage();
  //   await page.setContent(`
  //     <va-tabs label="Filtered content options">
  //       <va-tab-item target-id="tab1">Tab 1</va-tab-item>
  //       <va-tab-item target-id="tab2">Tab 2</va-tab-item>
  //       <va-tab-item target-id="tab3">Tab 3</va-tab-item>
  //     </va-tabs>`
  //   );

  //   await axeCheck(page);
  // });
});
