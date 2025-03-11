import {
  format,
  getSlottedNodes,
  isNumeric,
  isInteractiveElement,
} from './utils';

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

    const spy = jest.spyOn(defaultElement.shadowRoot, 'querySelector');
    spy.mockImplementation(selectors => {
      if (selectors === 'slot') {
        return mockObject as unknown as Element;
      }
      return defElement_shadowRoot_querySelector(selectors);
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
          return mockObject as unknown as Element;
        }
        return defElement_shadowRoot_querySelector(selector);
      });

    const slottedNodes = getSlottedNodes(defaultElement, 'a');
    expect(slottedNodes).toEqual([{ nodeName: 'A' }]);
  });
});

describe('isInteractiveElement()', () => {
  const testElement = tag => {
    const el = document.createElement(tag);
    return isInteractiveElement(el);
  };
  it('returns true for an anchor element', () => {
    expect(testElement('va-test')).toEqual(true);
  });
  it('returns true for an anchor element', () => {
    expect(testElement('a')).toEqual(true);
  });

  it('returns true for a button element', () => {
    expect(testElement('button')).toEqual(true);
  });

  it('returns true for an input element', () => {
    expect(testElement('input')).toEqual(true);
  });

  it('returns true for a select element', () => {
    expect(testElement('select')).toEqual(true);
  });

  it('returns true for a textarea element', () => {
    expect(testElement('textarea')).toEqual(true);
  });

  it('returns false for a div element', () => {
    expect(testElement('div')).toEqual(false);
  });
});
