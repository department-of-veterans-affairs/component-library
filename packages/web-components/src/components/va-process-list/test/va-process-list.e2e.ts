import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-process-list', () => {
  it('renders slotted nodes into an ordered list', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-process-list>
        <li>
          <h2>Step one</h2>
          <p>Some content</p>
        </li>
        <li>
          <h2>Step two</h2>
          <p>Additional content</p>
          <ul>
            <li>Item one</li>
            <li>Item two</li>
          </ul>
        </li>
      </va-process-list>
    `);

    const element = await page.find('va-process-list');
    expect(element).toEqualHtml(`
      <va-process-list class="hydrated">
        <mock:shadow-root>
          <ol role="list">
            <slot></slot>
          </ol>
        </mock:shadow-root>
        <li>
          <h2>Step one</h2>
          <p>Some content</p>
        </li>
        <li>
          <h2>Step two</h2>
          <p>Additional content</p>
          <ul>
            <li>Item one</li>
            <li>Item two</li>
          </ul>
        </li>
      </va-process-list>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-process-list>
          <li>One</li>
          <li>Two</li>
          <li>Three</li>
        </va-process-list>
      `);

    await axeCheck(page);
  });

  it('v3 passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-process-list uswds>
        <va-process-list-item header="Step one">
          <p>Some content</p>
        </va-process-list-item>
        <va-process-list-item header="Step two">
          <p>Additional content</p>
          <ul>
            <li>Item one</li>
            <li>Item two</li>
          </ul>
        </va-process-list-item>
      </va-process-list>
    `);

    await axeCheck(page);
  });

  it('v3 uswds renders slotted nodes into an ordered list', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-process-list uswds>
        <va-process-list-item header="Step one">
          <p>Some content</p>
        </va-process-list-item>
        <va-process-list-item header="Step two">
          <p>Additional content</p>
          <ul>
            <li>Item one</li>
            <li>Item two</li>
          </ul>
        </va-process-list-item>
      </va-process-list>
    `);

    const element = await page.find('va-process-list');
    expect(element).toEqualHtml(`
      <va-process-list class="hydrated " uswds class="hydrated">
        <mock:shadow-root>
          <ol class="usa-process-list" role="list">
            <slot></slot>
          </ol>
        </mock:shadow-root>
        <va-process-list-item class="hydrated usa-process-list__item" header="Step one" role="listitem">
          <!---->  
          <h5 class="usa-process-list__heading">Step one</h5>
          <p>Some content</p>
        </va-process-list-item>
        <va-process-list-item class="hydrated usa-process-list__item" header="Step two" role="listitem">
          <!---->
          <h5 class="usa-process-list__heading">Step two</h5>
          <p>Additional content</p>
          <ul>
            <li>Item one</li>
            <li>Item two</li>
          </ul>
        </va-process-list-item>
      </va-process-list>
    `);
  });
});
