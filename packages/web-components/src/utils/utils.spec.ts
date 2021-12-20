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
  it('returns an array of nodes from a custom element in the shadow dom', async () => {
    // Shadow DOM Custom Element
    class CustomElement extends window.HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<h6>ABC</h6><div>DEF</div><p>GHI</p>`;
      }
    }

    window.customElements.define('custom-element', CustomElement);

    const defaultElement = document.createElement('custom-element');
    const slottedNodes = getSlottedNodes(defaultElement, null);
    expect(slottedNodes[2].nodeName).toEqual('P');
  });

  it('filters nodes from a custom element in the shadow dom based on nodeName', async () => {
    // Shadow DOM Custom Element
    class CustomElement extends window.HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<h6>ABC</h6><div>DEF</div><p>GHI</p>`;
      }
    }

    window.customElements.define('custom-element', CustomElement);

    const defaultElement = document.createElement('custom-element');
    const slottedNodes = getSlottedNodes(defaultElement, 'p');
    expect(slottedNodes[0].nodeName).toEqual('P');
  });

  it('gathers slot nodes in the shadow DOM if slot is used', async () => {
    // Shadow DOM Custom Element
    class CustomElement extends window.HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<div>ABC</div><slot name="headline">Updated Test Headline</slot><p>GHI</p>`;
      }
    }

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
    // Shadow DOM Custom Element
    class CustomElement extends window.HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<div>ABC</div><slot name="headline">Updated Test Headline</slot><p>GHI</p>`;
      }
    }

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

  it('only values set via the shadow DOM should return nodes', async () => {
    // Setting Light DOM
    const documentHTML =
      '<!doctype html><html><body>' +
      '<div>' +
      '<h1>ABC</h1>' +
      '<h2>GHI</h2>' +
      '</div>' +
      '</body></html>';
    document.body.innerHTML = documentHTML;
    const slottedNodesLightDom = getSlottedNodes(
      document.querySelector('div'),
      null,
    );
    expect(slottedNodesLightDom).toBeUndefined();
    class CustomElement extends window.HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<h6>ABC</h6><div>DEF</div><p>GHI</p>`;
      }
    }

    window.customElements.define('custom-element', CustomElement);

    const defaultElement = document.createElement('custom-element');
    const slottedNodesShadowDom = getSlottedNodes(defaultElement, null);
    expect(slottedNodesShadowDom).toBeDefined();
  });
});
