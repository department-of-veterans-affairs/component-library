import { newSpecPage } from '@stencil/core/testing';
import { VaAccordionItem } from './va-accordion-item';

describe('va-accordion-item', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [VaAccordionItem],
      html: '<va-accordion-item header="The header">Content inside</va-accordion-item>',
    });
    expect(root).toEqualHtml(`
      <va-accordion-item header="The header">
        <mock:shadow-root>
          <button aria-controls="content" aria-expanded="false">
            The header
          </button>
          <div id="content">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content inside
      </va-accordion-item>
    `);
  });

  it('fires a custom event when the button is clicked', async () => {
    const { root, doc } = await newSpecPage({
      components: [VaAccordionItem],
      html: '<va-accordion-item header="The header">Content inside</va-accordion-item>',
    });

    const mockListener = jest.fn();
    doc.addEventListener('accordionItemToggled', mockListener);

    const button = root.shadowRoot.querySelector('button');
    button.click();

    expect(mockListener).toHaveBeenCalledTimes(1);
  });
});
