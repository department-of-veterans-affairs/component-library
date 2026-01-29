import { newE2EPage } from '@stencil/core/testing';

describe('va-sort', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-sort></va-sort>');

    const element = await page.find('va-sort');
    expect(element).toHaveClass('hydrated');
  });

  it('passes the name prop to va-select with default value', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-sort></va-sort>');

    const vaSelect = await page.find('va-sort >>> va-select');
    expect(await vaSelect.getProperty('name')).toBe('sort');
  });

  it('passes a custom name prop to va-select', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-sort name="custom-sort"></va-sort>');

    const vaSelect = await page.find('va-sort >>> va-select');
    expect(await vaSelect.getProperty('name')).toBe('custom-sort');
  });

  it('updates the value property on va-sort when selection changes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-sort value="newest">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </va-sort>
    `);

    const vaSort = await page.find('va-sort');
    expect(await vaSort.getProperty('value')).toBe('newest');

    // Change selection to 'oldest'
    await page.$eval('va-sort', (el: HTMLElement) => {
      const vaSelect = el.shadowRoot?.querySelector('va-select');
      const select = vaSelect?.shadowRoot?.querySelector('select');
      if (select) {
        select.value = 'oldest';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    await page.waitForChanges();
    expect(await vaSort.getProperty('value')).toBe('oldest');
  });

  it('passes the width prop to va-select with default value', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-sort></va-sort>');

    const vaSelect = await page.find('va-sort >>> va-select');
    expect(await vaSelect.getProperty('width')).toBe('lg');
  });

  it('passes a custom width prop to va-select', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-sort width="xl"></va-sort>');

    const vaSelect = await page.find('va-sort >>> va-select');
    expect(await vaSelect.getProperty('width')).toBe('xl');
  });

  it('passes the message-aria-describedby prop to va-select', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-sort message-aria-describedby="Sort options related to the list"></va-sort>');

    const vaSelect = await page.find('va-sort >>> va-select');
    expect(await vaSelect.getProperty('messageAriaDescribedby')).toBe('Sort options related to the list');
  });

  it('emits vaSortSelect event when selection changes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-sort>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </va-sort>
    `);

    const sortSelectSpy = await page.spyOnEvent('vaSortSelect');

    await page.$eval('va-sort', (el: HTMLElement) => {
      const vaSelect = el.shadowRoot?.querySelector('va-select');
      const select = vaSelect?.shadowRoot?.querySelector('select');
      if (select) {
        select.value = 'oldest';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    expect(sortSelectSpy).toHaveReceivedEventDetail({ value: 'oldest' });
  });

  it('emits vaSortSelectBlur event when select loses focus', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-sort>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </va-sort>
    `);

    const sortBlurSpy = await page.spyOnEvent('vaSortSelectBlur');

    await page.$eval('va-sort', (el: HTMLElement) => {
      const vaSelect = el.shadowRoot?.querySelector('va-select');
      const select = vaSelect?.shadowRoot?.querySelector('select');
      if (select) {
        select.focus();
        select.blur();
      }
    });

    expect(sortBlurSpy).toHaveReceivedEvent();
  });

  it('emits vaSortKeyDown event when key is pressed', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-sort>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </va-sort>
    `);

    const sortKeyDownSpy = await page.spyOnEvent('vaSortKeyDown');

    await page.$eval('va-sort', (el: HTMLElement) => {
      const vaSelect = el.shadowRoot?.querySelector('va-select');
      const select = vaSelect?.shadowRoot?.querySelector('select');
      if (select) {
        select.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      }
    });

    expect(sortKeyDownSpy).toHaveReceivedEvent();
  });
});
