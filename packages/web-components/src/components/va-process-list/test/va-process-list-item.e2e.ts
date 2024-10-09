import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';


describe('va-process-list-item', () => {
  it('renders without a header', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-process-list-item >
        <p>Some content</p>
      </va-process-list>
    `);
    const element = await page.find('va-process-list-item');
    expect(element).toEqualHtml(`
      <va-process-list-item class="hydrated usa-process-list__item" role="listitem">
        <!---->
        <p>Some content</p>
      </va-process-list-item>
    `);
  })

  it('renders with a default header', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-process-list-item header="Heading">
        <p>Some content</p>
      </va-process-list>
    `);
    const element = await page.find('va-process-list-item');
    expect(element).toEqualHtml(`
      <va-process-list-item class="hydrated usa-process-list__item" role="listitem" header="Heading">
        <!---->
        <h3 class="usa-process-list__heading">Heading</h3>
        <p>Some content</p>
      </va-process-list-item>
    `);
  })

  it('renders with a custom header size', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-process-list-item header="Heading" level="1">
        <p>Some content</p>
      </va-process-list>
    `);
    const element = await page.find('va-process-list-item');
    expect(element).toEqualHtml(`
      <va-process-list-item class="hydrated usa-process-list__item" role="listitem" header="Heading" level="1">
        <!---->
        <h1 class="usa-process-list__heading">Heading</h1>
        <p>Some content</p>
      </va-process-list-item>
    `);
  })

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ol>
        <va-process-list-item header="Heading">
          <p>Some content</p>
        </va-process-list>
      </ol>
    `);

    await axeCheck(page);
  });
  it('includes sr-only span for checkmark status', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ol>
        <va-process-list-item header="Heading" checkmark>
          <p>Some content</p>
        </va-process-list>
      </ol>
    `);
    const element = await page.find('va-process-list-item .sr-only');
    expect(element.innerText).toEqual('Completed:');
  })
  it('includes sr-only span for pending status', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ol>
        <va-process-list-item header="Heading" pending>
          <p>Some content</p>
        </va-process-list>
      </ol>
    `);
    const element = await page.find('va-process-list-item .sr-only');
    expect(element.innerText).toEqual('Pending:');
  })
  it('includes sr-only span for active status', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ol>
        <va-process-list-item header="Heading" active>
          <p>Some content</p>
        </va-process-list>
      </ol>
    `);
    const element = await page.find('va-process-list-item .sr-only');
    expect(element.innerText).toEqual('Current Step:');
  })
  it('renders the right status text for checkmark status', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ol>
        <va-process-list-item header="Heading" checkmark>
          <p>Some content</p>
        </va-process-list>
      </ol>
    `);
    const element = await page.find('va-process-list-item .usa-process-list__heading-eyebrow');
    expect(element.innerText).toEqual('Complete');
  })
  it('renders the right status text for active status', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ol>
        <va-process-list-item header="Heading" active>
          <p>Some content</p>
        </va-process-list>
      </ol>
    `);
    const element = await page.find('va-process-list-item .usa-process-list__heading-eyebrow');
    expect(element.innerText).toEqual('Active');
  })
  it('renders the right status text for pending status', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ol>
        <va-process-list-item header="Heading" pending>
          <p>Some content</p>
        </va-process-list>
      </ol>
    `);
    const element = await page.find('va-process-list-item .usa-process-list__heading-eyebrow');
    expect(element.innerText).toEqual('Pending');
  })
  it('does not render the status text by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ol>
        <va-process-list-item header="Heading">
          <p>Some content</p>
        </va-process-list>
      </ol>
    `);
    const element = await page.find('va-process-list-item .usa-process-list__heading-eyebrow');
    expect(element).toBeNull;
  })
})

