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
        <h5 class="usa-process-list__heading">Heading</h5>
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
})

