import { newE2EPage } from '@stencil/core/testing';

describe('va-alert', () => {

  it('fires off the vaComponentDidLoad', async () => {
    const page = await newE2EPage();
    
    const loadSpy = await page.spyOnEvent('vaComponentDidLoad');

    await page.setContent(
      `<va-alert></va-alert>`,
    );
    await page.find('va-alert');

    expect(loadSpy).toHaveReceivedEvent();

  });
});
