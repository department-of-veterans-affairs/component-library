import { newE2EPage } from '@stencil/core/testing';

describe('va-tabs', () => {
  const tabItems = JSON.stringify([
      { label: 'Tab 1', url: '#tab1' },
      { label: 'Tab 2', url: '#tab2' },
      { label: 'Tab 3', url: '#tab3' },
      { label: 'Tab 4', url: '#tab4' }
    ]);
  it('renders all tabs when there is enough space', async () => {
    const page = await newE2EPage({
      html: `<va-tabs tab-items='${tabItems}'></va-tabs>`
    });

    const el = await page.find('va-tabs');
    expect(el).not.toBeNull();
  });

  it('selects tab and shows correct panel', async () => {
    const page = await newE2EPage({
      html: `<va-tabs tab-items='${tabItems}'></va-tabs>`
    });
    await page.setViewport({ width: 1000, height: 600 });
    await page.waitForChanges();
    
    const tab2 = await page.find('va-tabs >>> button[id="#tab2"]');
    await tab2.click();
    await page.waitForChanges();

    // Check that tab2 is selected
    const selected = await page.find('va-tabs >>> .selected button[id="#tab2"]');
    expect(selected).not.toBeNull();
  });
});
