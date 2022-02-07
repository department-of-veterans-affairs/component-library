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
});
