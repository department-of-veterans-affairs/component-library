import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

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
    await page.setContent('<va-sort message-aria-describedby="Sort options"></va-sort>');

    const vaSelect = await page.find('va-sort >>> va-select');
    expect(await vaSelect.getProperty('messageAriaDescribedby')).toBe('Sort options');
  });

  it('does not pass enable-analytics to inner va-select', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-sort enable-analytics></va-sort>');

    // va-sort handles its own analytics, so it should not pass enable-analytics to va-select
    const vaSelect = await page.find('va-sort >>> va-select');
    expect(await vaSelect.getProperty('enableAnalytics')).toBe(false);
  });

  it('fires analytics event when enable-analytics is true and selection changes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-sort enable-analytics>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </va-sort>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    await page.$eval('va-sort', (el: HTMLElement) => {
      const vaSelect = el.shadowRoot?.querySelector('va-select');
      const select = vaSelect?.shadowRoot?.querySelector('select');
      if (select) {
        select.value = 'oldest';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    await page.waitForChanges();

    expect(analyticsSpy).toHaveReceivedEventTimes(1);
    expect(analyticsSpy).toHaveReceivedEventDetail({
      componentName: 'va-sort',
      action: 'change',
      details: {
        label: 'Sort by',
        selectLabel: 'oldest',
      },
    });
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-sort
        name="custom-sort"
        value="oldest"
        width="xl"
        message-aria-describedby="Sort the results"
        enable-analytics
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="az">A to Z</option>
      </va-sort>
    `);

    await axeCheck(page);
  });

  it('does not fire analytics event when enable-analytics is false', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-sort>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </va-sort>
    `);

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    await page.$eval('va-sort', (el: HTMLElement) => {
      const vaSelect = el.shadowRoot?.querySelector('va-select');
      const select = vaSelect?.shadowRoot?.querySelector('select');
      if (select) {
        select.value = 'oldest';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    expect(analyticsSpy).not.toHaveReceivedEvent();
  });
});
