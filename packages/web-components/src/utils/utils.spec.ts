import { format, getSlottedNodes, isNumeric } from './utils';

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

describe('isNumeric', () => {
  it('returns true for an int as a string', () => {
    expect(isNumeric('2')).toEqual(true);
  });
  it('returns true for a float as a string', () => {
    expect(isNumeric('2.5')).toEqual(true);
  });
  it('returns true for a string which begins with a number', () => {
    expect(isNumeric('5 pounds')).toEqual(true);
  });
  it('returns false for a string which does not start with a number', () => {
    expect(isNumeric('dog')).toEqual(false);
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

  it('gathers all slot nodes in the shadow DOM if slot is used', async () => {
    var mockObject = [{
      assignedNodes: () => {
        return ['h2', 'a', 'a'];
      },
    }];
    window.customElements.define('custom-element', CustomElement);

    const defaultElement = document.createElement('custom-element');

    const defElement_shadowRoot_querySelectorAll =
      defaultElement.shadowRoot.querySelectorAll;
    jest
      .spyOn(defaultElement.shadowRoot, 'querySelectorAll')
      .mockImplementation(selector => {
        if (selector === 'slot') {
          return mockObject;
        }
        return defElement_shadowRoot_querySelector(selector);
      });

    const slottedNodes = getSlottedNodes(defaultElement, null, true);
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

  it('gathers all specific slot nodes in the shadow DOM if slot is used and nodeName is specified', async () => {
    var mockObject = [{
      assignedNodes: () => {
        return [{ nodeName: 'DIV' }, { nodeName: 'A' }, { nodeName: 'P' }];
      },
    }];
    window.customElements.define('custom-element', CustomElement);

    const defaultElement = document.createElement('custom-element');

    const defElement_shadowRoot_querySelectorAll =
      defaultElement.shadowRoot.querySelectorAll;
    jest
      .spyOn(defaultElement.shadowRoot, 'querySelectorAll')
      .mockImplementation(selector => {
        if (selector === 'slot') {
          return mockObject;
        }
        return defElement_shadowRoot_querySelectorAll(selector);
      });

    const slottedNodes = getSlottedNodes(defaultElement, 'a', true);
    expect(slottedNodes).toEqual([{ nodeName: 'A' }]);
  });

  class CustomElement2Slots extends window.HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `<div>ABC</div><slot name="hint"><span>Hint text</span></slot><p>GHI</p><slot><span>test</span></slot>`;
    }
  }

  it('gathers slot nodes in the shadow DOM if slot is used', async () => {
    var mockObject = [{
      assignedNodes: () => {
        return ['span', 'span'];
      },
    }];
    window.customElements.define('custom-element', CustomElement2Slots);

    const defaultElement = document.createElement('custom-element');

    const defElement_shadowRoot_querySelectorAll =
      defaultElement.shadowRoot.querySelectorAll;
    jest
      .spyOn(defaultElement.shadowRoot, 'querySelectorAll')
      .mockImplementation(selector => {
        if (selector === 'slot') {
          return mockObject;
        }
        return defElement_shadowRoot_querySelectorAll(selector);
      });

    const slottedNodes = getSlottedNodes(defaultElement, null, true);
    expect(slottedNodes).toEqual(['span', 'span']);
  });
});
