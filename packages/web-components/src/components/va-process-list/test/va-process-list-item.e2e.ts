import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';


describe('va-process-list-item', () => {
  it('v1 renders without a header', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-process-list-item>
        <p>Some content</p>
      </va-process-list>
    `);
    const element = await page.find('va-process-list-item');
    expect(element).toEqualHtml(`
      <va-process-list-item class="hydrated" role="listitem">
        <!---->
        <p>Some content</p>
      </va-process-list-item>
    `);
  });

  it('v1 renders with a default header', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-process-list-item header="Heading">
        <p>Some content</p>
      </va-process-list>
    `);
    const element = await page.find('va-process-list-item');
    expect(element).toEqualHtml(`
      <va-process-list-item class="hydrated" header="Heading" role="listitem">
        <!---->
        <h3>Heading</h3>
        <p>Some content</p>
      </va-process-list-item>
    `);
  });

  it('v1 renders with a custom header size', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-process-list-item header="Heading" level="1">
        <p>Some content</p>
      </va-process-list>
    `);
    const element = await page.find('va-process-list-item');
    expect(element).toEqualHtml(`
      <va-process-list-item class="hydrated" header="Heading" level="1" role="listitem">
        <!---->
        <h1>Heading</h1>
        <p>Some content</p>
      </va-process-list-item>
    `);
  });

  it('v1 passes an axe check', async () => {
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

  it('v3 renders without a header', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-process-list-item uswds>
        <p>Some content</p>
      </va-process-list>
    `);
    const element = await page.find('va-process-list-item');
    expect(element).toEqualHtml(`
      <va-process-list-item class="hydrated usa-process-list__item" role="listitem" uswds="">
        <!---->
        <p>Some content</p>
      </va-process-list-item>
    `);
  })

  it('v3 renders with a default header', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-process-list-item uswds header="Heading">
        <p>Some content</p>
      </va-process-list>
    `);
    const element = await page.find('va-process-list-item');
    expect(element).toEqualHtml(`
      <va-process-list-item class="hydrated usa-process-list__item" role="listitem" uswds="" header="Heading">
        <!---->
        <h3 class="usa-process-list__heading">Heading</h3>
        <p>Some content</p>
      </va-process-list-item>
    `);
  })

  it('v3 renders with a custom header size', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-process-list-item uswds header="Heading" level="1">
        <p>Some content</p>
      </va-process-list>
    `);
    const element = await page.find('va-process-list-item');
    expect(element).toEqualHtml(`
      <va-process-list-item class="hydrated usa-process-list__item" role="listitem" uswds="" header="Heading" level="1">
        <!---->
        <h1 class="usa-process-list__heading">Heading</h1>
        <p>Some content</p>
      </va-process-list-item>
    `);
  })

  it('v3 passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ol>
        <va-process-list-item uswds header="Heading">
          <p>Some content</p>
        </va-process-list>
      </ol>
    `);

    await axeCheck(page);
  });
})

/*
 expect(element).toEqualHtml(`
      <va-process-list-item class="hydrated usa-process-list__item" header="Heading" role="listitem" uswds="">
        <!---->
        <h3 class="usa-process-list__heading">Heading</h3>
        <p>Additional content</p>
        <ul>
          <li>Item one</li>
          <li>Item two</li>
        </ul>
      </va-process-list-item>
    `);


*/

