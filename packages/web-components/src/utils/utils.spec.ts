import {
  format,
  getSlottedNodes,
  isNumeric,
  isInteractiveLinkOrButton,
  isMessageSet,
  deepEquals,
  truncate
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

describe('isInteractiveLinkOrButton()', () => {
  const testElement = tag => {
    const el = document.createElement(tag);
    return isInteractiveLinkOrButton(el);
  };

  it('returns true for a va-button element', () => {
    expect(testElement('va-button')).toEqual(true);
  });
  it('returns true for a va-link element', () => {
    expect(testElement('va-link')).toEqual(true);
  });
  it('returns true for a button element', () => {
    expect(testElement('button')).toEqual(true);
  });
  it('returns true for an anchor element', () => {
    expect(testElement('a')).toEqual(true);
  });

  it('returns false for a label element', () => {
    expect(testElement('label')).toEqual(false);
  });
  it('returns false for a div element', () => {
    expect(testElement('div')).toEqual(false);
  });
  it('returns false for a span element', () => {
    expect(testElement('span')).toEqual(false);
  });
});

describe('isMessageSet()', () => {
  it('returns true if message is set', () => {
    expect(isMessageSet('test')).toEqual(true);
    expect(isMessageSet(' ')).toEqual(true);
  });

  it('returns false if message is not set', () => {
    expect(isMessageSet('')).toEqual(false);
    expect(isMessageSet(null)).toEqual(false);
    expect(isMessageSet(undefined)).toEqual(false);
  });
  it('returns false if message is set to "false"', () => {
    expect(isMessageSet('false')).toEqual(false);
  });
});

describe('deepEquals()', () => {
  it('returns true for identical primitive values', () => {
    expect(deepEquals(1, 1)).toEqual(true);
    expect(deepEquals('test', 'test')).toEqual(true);
    expect(deepEquals(true, true)).toEqual(true);
    expect(deepEquals(undefined, undefined)).toEqual(true);
    expect(deepEquals(null, null)).toEqual(true);
  });

  it('returns false for different primitive values', () => {
    expect(deepEquals(1, 2)).toEqual(false);
    expect(deepEquals('test', 'different')).toEqual(false);
    expect(deepEquals(true, false)).toEqual(false);
    expect(deepEquals(undefined, null)).toEqual(false);
    expect(deepEquals(0, null)).toEqual(false);
    expect(deepEquals('', null)).toEqual(false);
  });

  it('returns true for identical empty objects and arrays', () => {
    expect(deepEquals({}, {})).toEqual(true);
    expect(deepEquals([], [])).toEqual(true);
  });

  it('returns true for functions (considers all functions equivalent)', () => {
    const func1 = () => 'hello';
    const func2 = () => 'world';
    expect(deepEquals(func1, func2)).toEqual(true);
  });

  it('returns true for identical simple objects', () => {
    const obj1 = { a: 1, b: 'test', c: true };
    const obj2 = { a: 1, b: 'test', c: true };
    expect(deepEquals(obj1, obj2)).toEqual(true);
  });

  it('returns false for objects with different values', () => {
    const obj1 = { a: 1, b: 'test', c: true };
    const obj2 = { a: 1, b: 'test', c: false };
    expect(deepEquals(obj1, obj2)).toEqual(false);
  });

  it('returns false for objects with different keys', () => {
    const obj1 = { a: 1, b: 'test', c: true };
    const obj2 = { a: 1, b: 'test', d: true };
    expect(deepEquals(obj1, obj2)).toEqual(false);
  });

  it('returns true for identical nested objects', () => {
    const obj1 = { a: 1, b: { c: 2, d: { e: 3 } } };
    const obj2 = { a: 1, b: { c: 2, d: { e: 3 } } };
    expect(deepEquals(obj1, obj2)).toEqual(true);
  });

  it('returns false for different nested objects', () => {
    const obj1 = { a: 1, b: { c: 2, d: { e: 3 } } };
    const obj2 = { a: 1, b: { c: 2, d: { e: 4 } } };
    expect(deepEquals(obj1, obj2)).toEqual(false);
  });

  it('returns true for identical arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(deepEquals(arr1, arr2)).toEqual(true);
  });

  it('returns false for arrays with different values', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 4];
    expect(deepEquals(arr1, arr2)).toEqual(false);
  });

  it('returns false for arrays with different lengths', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2];
    expect(deepEquals(arr1, arr2)).toEqual(false);
  });

  it('returns true for identical complex arrays', () => {
    const arr1 = [1, { a: 2 }, [3, 4]];
    const arr2 = [1, { a: 2 }, [3, 4]];
    expect(deepEquals(arr1, arr2)).toEqual(true);
  });

  it('returns false for different complex arrays', () => {
    const arr1 = [1, { a: 2 }, [3, 4]];
    const arr2 = [1, { a: 2 }, [3, 5]];
    expect(deepEquals(arr1, arr2)).toEqual(false);
  });

  it('returns true for identical Date objects', () => {
    const date1 = new Date('2023-01-01');
    const date2 = new Date('2023-01-01');
    expect(deepEquals(date1, date2)).toEqual(true);
  });

  it('returns false for different Date objects', () => {
    const date1 = new Date('2023-01-01');
    const date2 = new Date('2023-01-02');
    expect(deepEquals(date1, date2)).toEqual(false);
  });

  it('returns true for identical RegExp objects', () => {
    const regex1 = /test/gi;
    const regex2 = /test/gi;
    expect(deepEquals(regex1, regex2)).toEqual(true);
  });

  it('returns false for different RegExp objects', () => {
    const regex1 = /test/gi;
    const regex2 = /test/g;
    expect(deepEquals(regex1, regex2)).toEqual(false);
  });

  it('returns false for objects with different constructors', () => {
    class TestClass1 {}
    class TestClass2 {}
    const obj1 = new TestClass1();
    const obj2 = new TestClass2();
    expect(deepEquals(obj1, obj2)).toEqual(false);
  });

  it('handles circular references correctly', () => {
    const obj1: any = { a: 1 };
    const obj2: any = { a: 1 };
    obj1.self = obj1;
    obj2.self = obj2;
    expect(deepEquals(obj1, obj2)).toEqual(true);

    const obj3: any = { a: 1 };
    const obj4: any = { a: 2 };
    obj3.self = obj3;
    obj4.self = obj4;
    expect(deepEquals(obj3, obj4)).toEqual(false);
  });

  it('handles arguments objects correctly', () => {
    // Using rest parameters with underscore prefix to indicate intentionally unused
    function getArgs1(..._params: number[]) {
      return arguments;
    }
    function getArgs2(..._params: number[]) {
      return arguments;
    }
    const args1 = getArgs1(1, 2, 3);
    const args2 = getArgs2(1, 2, 3);
    expect(deepEquals(args1, args2)).toEqual(true);

    const args3 = getArgs1(1, 2, 3);
    const args4 = getArgs2(1, 2, 4);
    expect(deepEquals(args3, args4)).toEqual(false);
  });
});

describe('truncate()', () => {
  let originalGetContext: any;
  beforeAll(() => {
    originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = jest.fn().mockImplementation(() => ({
    measureText: (text) => ({
      // Return a width proportional to text length for testing
      width: text.length * 5
    }),
    font: ''
  }));
  })

  afterAll(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext;
  });

  const FONT = '16.96px "Source Sans Pro Web", "Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans';
  it.only('should truncate text that is too long', async () => {
  
  
    const startingText = 'This text is too long and needs to be truncated';
    const truncatedText = truncate(startingText, 100, FONT);
  
    // Verify text was actually truncated
    expect(truncatedText.length).toBeLessThan(startingText.length);
    expect(truncatedText).toContain('...');
  });

  it('should not truncate text that is shorter than limit', () => {
    const startingText = 'This text is short';
    const truncatedText = truncate(startingText, 200, FONT);
    expect(truncatedText).toEqual(startingText);
  })
})
