import { format, getSlottedNodes } from './utils';

describe('format', () => {
  it('returns empty string for no names defined', () => {
    expect(format(undefined, undefined, undefined)).toEqual('');
  });

  it('formats just first names', () => {
    expect(format('Joseph', undefined, undefined)).toEqual('Joseph');
  });

  it('formats first and last names', () => {
    expect(format('Joseph', undefined, 'Publique')).toEqual('Joseph Publique');
  });

  it('formats first, middle and last names', () => {
    expect(format('Joseph', 'Quincy', 'Publique')).toEqual(
      'Joseph Quincy Publique',
    );
  });
});

describe('getSlottedNodes()', () => {
  class CustomElement extends window.HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `<div>ABC</div><slot name="headline">Updated Test Headline</slot><p>GHI</p>`;
    }
  }

  it('gathers slot nodes in the shadow DOM if slot is used', async () => {
    var mockObject = {
      assignedNodes: () => {
        return ['h2', 'a', 'a'];
      },
    };
    window.customElements.define('custom-element', CustomElement);

    const defaultElement = document.createElement('custom-element');

    const defElement_shadowRoot_querySelector =
      defaultElement.shadowRoot.querySelector;
    jest
      .spyOn(defaultElement.shadowRoot, 'querySelector')
      .mockImplementation(selector => {
        if (selector === 'slot') {
          return mockObject;
        }
        return defElement_shadowRoot_querySelector(selector);
      });

    const slottedNodes = getSlottedNodes(defaultElement, null);
    expect(slottedNodes).toEqual(['h2', 'a', 'a']);
  });

  it('gathers specific slot nodes in the shadow DOM if slot is used and nodeName is specified', async () => {
    var mockObject = {
      assignedNodes: () => {
        return [{ nodeName: 'DIV' }, { nodeName: 'A' }, { nodeName: 'P' }];
      },
    };
    window.customElements.define('custom-element', CustomElement);

    const defaultElement = document.createElement('custom-element');

    const defElement_shadowRoot_querySelector =
      defaultElement.shadowRoot.querySelector;
    jest
      .spyOn(defaultElement.shadowRoot, 'querySelector')
      .mockImplementation(selector => {
        if (selector === 'slot') {
          return mockObject;
        }
        return defElement_shadowRoot_querySelector(selector);
      });

    const slottedNodes = getSlottedNodes(defaultElement, 'a');
    expect(slottedNodes).toEqual([{ nodeName: 'A' }]);
  });
});
