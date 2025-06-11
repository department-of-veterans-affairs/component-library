import { getInteriorWidth, manageFlagIcon, handleRerender } from "../utils";

describe('layout utils', () => {
  let originalGetComputedStyle: (elt: Element, pseudoElt?: string | null) => CSSStyleDeclaration;

  beforeEach(() => {
    originalGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = jest.fn();
  });

  afterEach(() => {
    window.getComputedStyle = originalGetComputedStyle;
  });

  it('getInteriorWidth() accurately computes an element\'s interior width', () => {
    const element: HTMLElement = document.createElement('div');

    Object.defineProperty(element, 'clientWidth', {
      configurable: true,
      value: 200
    });
    (window.getComputedStyle as jest.Mock).mockReturnValue({
      paddingLeft: '25px',
      paddingRight: '25px'
    })
    const interiorWidth = getInteriorWidth(element);
    expect(interiorWidth).toBe(150);
  });
});

describe('manageFlagIcon', () => {
  let mockThis;

  beforeEach(() => {
    mockThis = {
      isInVaInputTelephone: true,
      el: {
        shadowRoot: {
          querySelector: jest.fn()
        }
      }
    }
  });

  it('should reset flag class when no country selected', () => {
    const mockFlagSpan = { className: 'dynamic-flag flag-us' };

    mockThis.el.shadowRoot.querySelector
      .mockReturnValueOnce(mockFlagSpan);

    manageFlagIcon.call(mockThis);
    expect(mockFlagSpan.className).toBe('dynamic-flag');
    expect(mockThis.el.shadowRoot.querySelector).toHaveBeenCalledWith('span.dynamic-flag');
  });

  it('should not modify the flag class if country selected', () => {
    const mockInput = { value: 'US' };
    const mockFlagSpan = { className: 'dynamic-flag flag-us' };

    mockThis.el.shadowRoot.querySelector
      .mockReturnValueOnce(mockInput)

    manageFlagIcon.call(mockThis);
    expect(mockFlagSpan.className).toBe('dynamic-flag flag-us');
    expect(mockThis.el.shadowRoot.querySelector).toHaveBeenCalledTimes(1);
  });
});

describe('handleRender', () => {
  it('should should update flag classes to match selected country', () => {
    const mockThis = {
      value: 'US',
      el: {
        shadowRoot: {
          querySelectorAll: jest.fn(),
          querySelector: jest.fn()
        }
      },
      isInVaInputTelephone: true
    }

    const mockOptions = [
      { value: 'US', text: 'United States +1' },
      { value: 'CA', text: 'Canada +1' },
      { value: 'MX', text: 'Mexico +52' }
    ];

    mockThis.el.shadowRoot.querySelectorAll.mockReturnValue(mockOptions);

    const mockInput = { value: '' };

    const mockFlagSpan = {
      className: 'dynamic-flag flag-mx',
      classList: {
        add: jest.fn(),
        forEach: jest.fn().mockImplementation(callback => {
          callback('flag-mx');
          callback('dynamic-flag')
        }),
        remove: jest.fn()
      }
    }

    mockThis.el.shadowRoot.querySelector
      .mockReturnValueOnce(mockInput)
      .mockReturnValueOnce(mockFlagSpan);

    handleRerender.call(mockThis);

    expect(mockThis.el.shadowRoot.querySelectorAll).toHaveBeenCalledWith('option');
    expect(mockThis.el.shadowRoot.querySelector).toHaveBeenCalledWith('span.dynamic-flag');
    expect(mockFlagSpan.classList.remove).toHaveBeenCalledWith('flag-mx');
    expect(mockFlagSpan.classList.add).toHaveBeenCalledWith('flag', 'flag-us');
  });
});
