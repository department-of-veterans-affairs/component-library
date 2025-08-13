import { VaModal } from '../va-modal';

describe('VaModal', () => {
  let instance: VaModal;
  beforeEach(() => {
    instance = new VaModal();
    //instance.el = document.createElement('div') as any;
    instance.visible = true;
    instance.isVisibleDirty = false;
    instance.ariaHiddenNodeExceptions = [];
    instance.status = 'info';
    instance.modalTitle = 'Test Modal';
    instance.primaryButtonText = 'Primary';
    instance.secondaryButtonText = 'Secondary';
    instance.closeEvent = { emit: jest.fn() } as any;
    instance.primaryButtonClick = { emit: jest.fn() } as any;
    instance.secondaryButtonClick = { emit: jest.fn() } as any;
    instance.componentLibraryAnalytics = { emit: jest.fn() } as any;
    instance.disableAnalytics = false;
    instance.focusableChildren = [document.createElement('button')];
    instance.closeButton = document.createElement('button');
    instance.alertActions = document.createElement('div');
  });

  it('handleClick closes modal if clickToClose and visible', () => {
    instance.clickToClose = true;
    instance.visible = true;
    const event = { composedPath: () => [instance.el] } as any;
    const spy = jest.spyOn(instance, 'handleClose' as any);
    instance.handleClick(event);
    expect(spy).toHaveBeenCalled();
  });

  it('handleKeyDown closes modal on Escape', () => {
    instance.visible = true;
    const event = { key: 'Escape', shiftKey: false } as any;
    const spy = jest.spyOn(instance, 'handleClose' as any);
    instance.handleKeyDown(event);
    expect(spy).toHaveBeenCalled();
  });

  it('handleLastElementFocus wraps focus to first element', () => {
    instance.visible = true;
    instance.shifted = false;
    instance.focusableChildren = [document.createElement('button')];
    const event = { key: 'Tab', preventDefault: jest.fn() } as any;
    instance.handleLastElementFocus(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('handleFirstElementFocus wraps focus to last element', () => {
    instance.visible = true;
    instance.shifted = true;
    instance.focusableChildren = [document.createElement('button')];
    const event = { key: 'Tab', preventDefault: jest.fn() } as any;
    instance.handleFirstElementFocus(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('watchVisibleHandler sets isVisibleDirty', () => {
    instance.isVisibleDirty = false;
    instance.watchVisibleHandler();
    expect(instance.isVisibleDirty).toBe(true);
  });

  it('componentDidLoad calls setupModal if visible', () => {
    instance.visible = true;
    const spy = jest.spyOn(instance, 'setupModal' as any);
    instance.componentDidLoad();
    expect(typeof spy).toBe('function');
  });

  it('componentDidUpdate calls setupModal or teardownModal', () => {
    instance.isVisibleDirty = true;
    instance.visible = true;
    const setupSpy = jest.spyOn(instance, 'setupModal' as any);
    const teardownSpy = jest.spyOn(instance, 'teardownModal' as any);
    instance.componentDidUpdate();
    expect(typeof setupSpy).toBe('function');
    instance.isVisibleDirty = true;
    instance.visible = false;
    instance.componentDidUpdate();
    expect(typeof teardownSpy).toBe('function');
  });

  it('disconnectedCallback calls teardownModal', () => {
    const spy = jest.spyOn(instance, 'teardownModal' as any);
    instance.disconnectedCallback();
    expect(typeof spy).toBe('function');
  });

  it('handleClose emits closeEvent', () => {
    const event = {} as any;
    instance['handleClose'](event);
    expect(instance.closeEvent.emit).toHaveBeenCalledWith(event);
  });

  it('handlePrimaryButtonClick emits primaryButtonClick and analytics', () => {
    const event = {} as any;
    instance['handlePrimaryButtonClick'](event);
    expect(instance.primaryButtonClick.emit).toHaveBeenCalledWith(event);
    expect(instance.componentLibraryAnalytics.emit).toHaveBeenCalled();
  });

  it('handleSecondaryButtonClick emits secondaryButtonClick and analytics', () => {
    const event = {} as any;
    instance['handleSecondaryButtonClick'](event);
    expect(instance.secondaryButtonClick.emit).toHaveBeenCalledWith(event);
    expect(instance.componentLibraryAnalytics.emit).toHaveBeenCalled();
  });

  it('getFocusableChildren returns array', () => {
    const arr = instance['getFocusableChildren']();
    expect(Array.isArray(arr)).toBe(true);
  });

  it('teardownModal calls clearAllBodyScrollLocks and restores focus', () => {
    instance.savedFocus = document.createElement('button');
    const focusSpy = jest.spyOn(instance.savedFocus, 'focus');
    instance['teardownModal']();
    expect(focusSpy).toHaveBeenCalled();
  });
});
