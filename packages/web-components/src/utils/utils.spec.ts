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

describe('getSlottedNodes', () => {
  it('returns an array of nodes from a custom element in the shadow dom', async () => {
    // Light DOM
    const documentHTML =
      '<!doctype html><html><body>' +
      '<custom-element>' +
      '<span slot="slot-test">Finally</span>' +
      '</custom-element>' +
      '</body></html>';
    document.body.innerHTML = documentHTML;
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
    expect(await slottedNodes[2].nodeName).toEqual('P');
  });

  it('it filters nodes from a custom element in the shadow dom based on nodeName', async () => {
    // Light DOM
    const documentHTML =
      '<!doctype html><html><body>' +
      '<custom-element>' +
      '<span slot="slot-test">Finally</span>' +
      '</custom-element>' +
      '</body></html>';
    document.body.innerHTML = documentHTML;
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
    expect(await slottedNodes[0].nodeName).toEqual('P');
  });

  it('it gathers nodes in slot', async () => {
    // Light DOM
    const documentHTML =
      '<!doctype html><html><body>' +
      '<custom-element>' +
      '<h3 slot="headline">Test Headline</h3>' +
      '</custom-element>' +
      '</body></html>';
    document.body.innerHTML = documentHTML;
    // Shadow DOM Custom Element
    class CustomElement extends window.HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = 
        `<slot name="headline">Updated Test Headline</slot>`;
      }
    }

    window.customElements.define('custom-element', CustomElement);

    const defaultElement = document.createElement('custom-element');
    console.log('SHADOW', defaultElement.shadowRoot.childNodes);
    console.log('LIGHT', document.querySelector('custom-element').shadowRoot.childNodes);
    const slottedNodes = getSlottedNodes(defaultElement, null);
    console.log('FUNCTION RESULTS', slottedNodes);
    expect(await slottedNodes[0].nodeName).toEqual('SLOT');
  });
});
