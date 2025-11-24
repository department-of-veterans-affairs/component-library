import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Listen,
  Prop,
  Watch,
} from '@stencil/core';
import classnames from 'classnames';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { hideOthers, Undo } from 'aria-hidden';
import { focusableQueryString } from '../../utils/modal';

/**
 * @click Used to detect clicks outside of modal contents to close modal.
 * @keydown Used to detect Escape key to close modal and Tab key/Shift key to trap focus within the component.
 * @componentName Modal
 * @maturityCategory use
 * @maturityLevel best_practice
 */
@Component({
  tag: 'va-modal',
  styleUrl: 'va-modal.scss',
  shadow: true,
})
export class VaModal {
  // This reference is required to allow focus trap to work properly.
  // Without it, keyboard navigation behavior may break and work unexpectedly.
  alertActions: HTMLDivElement;

  // This reference is used by focus trap to focus the close button on open
  // when initialFocusSelector is not specified.
  closeButton: HTMLButtonElement;

  // This boolean variable is used to determine if componentDidUpdate should
  // set up or tear down the modal.
  isVisibleDirty: boolean;

  // Track cleanup handlers returned by hideOthers so we can restore DOM state on close.
  undoAriaHidden: Undo[] = [];

  // This stores reference to previously focused element
  savedFocus: HTMLElement;

  // Save focusable children within the modal. Populated on setup
  focusableChildren: HTMLElement[] = null;

  @Element() el: HTMLElement;

  /**
   * Click outside modal will trigger closeEvent
   */
  @Prop() clickToClose?: boolean = false;

  /**
   * If true, analytics event won't be fired
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * If `true`, modal will be wider.
   */
  @Prop({ reflect: true }) large?: boolean = false;

  /**
   * Title/header text for the modal
   */
  @Prop() modalTitle?: string;

  /**
   * Whether or not the component will be forced to take action.
   */
  @Prop() forcedModal?: boolean = false;

  /**
   * Whether or not the component will be using the unstyled button.
   */
  @Prop() unstyled?: boolean = false;

  /**
   * Selector to explicitly specify which element should receive
   * focus when the modal is open, if the initially focused element
   * is not the first focusable element in the document
   */
  @Prop() initialFocusSelector?: string;

  /**
   * Primary button text
   */
  @Prop() primaryButtonText?: string;

  /**
   * Secondary button text
   */
  @Prop() secondaryButtonText?: string;

  /*
   * Style of modal alert - info, error, success, warning
   */
  @Prop() status?: 'continue' | 'error' | 'info' | 'success' | 'warning';

  /**
   * If the modal is visible or not
   */
  @Prop({ reflect: true }) visible?: boolean = false;
  // This is a workaround for determining when to call setupModal or teardownModal.
  // Elements are not yet available in the DOM due to `if (!visible) return null;`.
  // See componentDidUpdate.
  @Watch('visible')
  watchVisibleHandler() {
    this.isVisibleDirty = true;
  }


  /**
   * Label for the modal, to be set as aria-label. Will take precedence over modalTitle
   * in settings of aria-label.
   */
  @Prop() label?: string = '';

  /**
   * Fires when modal is closed.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  closeEvent: EventEmitter;

  /**
   * Fires when primary button is clicked.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  primaryButtonClick: EventEmitter;

  /**
   * Fires when secondary button is clicked.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  secondaryButtonClick: EventEmitter;

  /**
   * The event used to track usage of the component. Fires when a
   * a page is selected if enable-analytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  componentDidLoad() {
    if (this.visible) {
      requestAnimationFrame(() => this.setupModal());
    }
  }

  // Stencil's componentDidUpdate doesn't provide us with previous props to compare
  // and determine if we need to setup or destroy the modal. We can use a boolean
  // variable inside a Watch decorator as a workaround to determine if an update needs
  // to occur.
  componentDidUpdate() {
    if (!this.isVisibleDirty) return;

    this.isVisibleDirty = false;
    if (this.visible) {
      requestAnimationFrame(() => this.setupModal());
    } else {
      this.teardownModal();
    }
  }

  disconnectedCallback() {
    this.teardownModal();
  }

  /**
   * Listen for the va-button GA event and capture it so
   * that we can emit a single va-modal GA event that includes
   * the va-button details in handlePrimaryButtonClick and
   * handleSecondaryButtonClick.
   */
  @Listen('component-library-analytics')
  handleButtonClickAnalytics(event) {
    // Prevent va-modal GA event from firing multiple times.
    if (event.detail.componentName === 'va-modal') return;

    // Prevent va-button GA event from firing.
    event.stopPropagation();
  }

  // This click event listener is used to close the modal when clickToClose
  // is true and the user clicks the overlay outside of the modal contents.
  @Listen('click')
  handleClick(e: MouseEvent) {
    if (!this.clickToClose) return;

    // event.target is always the shadow host
    // event.composedPath()[0] returns the node clicked when shadow root is open
    if (this.visible && e.composedPath()[0] === this.el) {
      this.handleClose(e);
    }
  }

  // This keydown event listener is used to close the modal when the user hits
  // the Escape key.
  @Listen('keydown', { target: 'window' })
  handleKeyDown(e: KeyboardEvent) {
    if (!this.visible) return;

    const keyCode = e.key;
    if (keyCode === 'Escape') {
      this.handleClose(e);
    }

    // Stop here if not tab key - we only care about tab for focus trap from this
    // point forward in the function.
    if (keyCode !== 'Tab') return;

    const activeElement = this.getRealActiveElement();
    const firstElement = this.focusableChildren[0] as HTMLElement;
    const lastElement = this.focusableChildren[this.focusableChildren.length - 1] as HTMLElement;

    if (!e.shiftKey && activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    } else if (e.shiftKey && activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
  }

  private handleClose(e: KeyboardEvent | MouseEvent) {
    this.closeEvent.emit(e);
  }

  private handlePrimaryButtonClick(e: MouseEvent) {
    this.primaryButtonClick.emit(e);

    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-modal',
        action: 'click',
        details: {
          clickLabel: this.primaryButtonText,
          status: this.status,
          title: this.modalTitle,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  }

  private handleSecondaryButtonClick(e: MouseEvent) {
    this.secondaryButtonClick.emit(e);

    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-modal',
        action: 'click',
        details: {
          clickLabel: this.secondaryButtonText,
          status: this.status,
          title: this.modalTitle,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  }

  // Pass in an array of focusable elements and return non-hidden and elements
  // inside the shadow DOM; note: when an element inside a web component has
  // focus, document.activeElement will point to the web component itself
  private getFocusableChildren() {
    const modalContent = Array.from(
      this.el?.querySelectorAll(focusableQueryString) || [],
    );

    const actionButtons = Array.from(
      this.alertActions?.querySelectorAll(focusableQueryString) || [],
    );

    // This array will keep track of web component tags that have been expanded
    // to include their shadow DOM children.
    const hydrateElementsToRemove = [];

    // Specific to maintain tab order
    const focusableElms = [
      this.closeButton, // close button first
      ...modalContent,
      ...actionButtons, // action buttons last
    ].reduce((focusableElms, elm: HTMLElement) => {
      // find not-hidden elements
      if (elm && (elm.offsetWidth || elm.offsetHeight)) {
        // hydrated class likely on web components
        if (elm.classList.contains('hydrated')) {
          let focusElms = [];

          // va-radio-option does not have a shadow root, but should still be included in the focusable elements
          if (elm.shadowRoot) {
            // Add the tag name to the list of elements to remove from the final array
            // since we are adding its shadow DOM children instead
            hydrateElementsToRemove.push(elm.tagName);

            focusElms = Array.from(
              elm.shadowRoot.querySelectorAll(focusableQueryString) || [],
            );
          } else {
            focusElms = Array.from(
              elm.querySelectorAll(focusableQueryString) || [],
            );
          }
          if (focusElms.length) {
            // add the web component and focusable shadow elements
            // document.activeElement targets the web component but the event
            // is composed, so crosses shadow DOM and shows up in composedPath
            focusableElms.push(elm);
            return focusableElms.concat(focusElms);
          }
        } else {
          focusableElms.push(elm);
        }
      }
      return focusableElms;
    }, []);

    // Remove any web component tags that have been expanded to include their
    // shadow DOM children; the web component itself is already included in the
    // focusableElms array
    return focusableElms.filter(
      elm => !hydrateElementsToRemove.includes(elm.tagName),
    ) as HTMLElement[];
  }

  /**
   * Traverses the shadow DOM tree to find the actual focused element.
   * This method handles cases where the focused element is inside one or more shadow roots.
   *
   * @returns activeElement - The deepest actively focused element in the shadow DOM tree, or null if no element is focused
   */
  private getRealActiveElement(): HTMLElement | null {
    let activeElement = document.activeElement as HTMLElement;

    // Traverse shadow DOM boundaries to find the actual focused element
    while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
      activeElement = activeElement.shadowRoot.activeElement as HTMLElement;
    }

    return activeElement;
  }

  // This method traps the focus inside our web component, prevents scrolling outside
  // the modal, and adds aria-hidden="true" to all elements outside the web component.
  // Fires analytics event unless disableAnalytics is true.
  private setupModal() {
    // Save previous focus & restore when modal is closed
    this.savedFocus = this.getRealActiveElement();

    // find all focusable children within the modal, but maintain tab order
    this.focusableChildren = this.getFocusableChildren();

    // If an initialFocusSelector is provided, the element will be focused on modal open
    // if it exists. You are able to focus elements in both light and shadow DOM.
    const initialFocus = (this.el.querySelector(this.initialFocusSelector) ||
      this.el.shadowRoot?.querySelector(this.initialFocusSelector) ||
      this.closeButton) as HTMLElement;
    initialFocus?.focus();

    // Prevents scrolling outside modal
    disableBodyScroll(this.el);

    // Reset any previous hide handlers before applying new ones.
    this.undoAriaHidden = [];

    // Collect all elements that should not be hidden (modal + ancestors)
    const { ancestors, shadowRoots } = this.getModalHierarchy();

    // Sets aria-hidden="true" on all elements except the modal and its ancestors
    this.undoAriaHidden.push(hideOthers(ancestors));

    // Additionally set aria-hidden="true" on va-modal siblings that live inside the same shadow root
    shadowRoots.forEach(root => {
      this.undoAriaHidden.push(
        hideOthers([this.el], root as unknown as HTMLElement),
      );
    });

    // Conditionally track the event.
    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-modal',
        action: 'show',
        details: {
          status: this.status,
          title: this.modalTitle,
          primaryButtonText: this.primaryButtonText,
          secondaryButtonText: this.secondaryButtonText,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  }

  // This method removes the focus trap, re-enables scrolling and
  // removes aria-hidden="true" from external elements.
  private teardownModal() {
    clearAllBodyScrollLocks();
    this.undoAriaHidden.forEach(undo => undo?.());
    this.undoAriaHidden = [];
    this.savedFocus?.focus();
  }


  /**
   * Maps the modal's position in nested shadow DOMs by traversing up the DOM tree.
   * Returns both the elements and shadow roots needed for proper aria-hidden handling.
   *
   * Why this matters: When va-modal is nested in another web component (e.g., va-file-input),
   * we need:
   * 1. The element chain to hide everything except the modal's ancestors
   * 2. The shadow roots to separately hide siblings within each root's context
   *
   * @returns Object with:
   *   - ancestors: Array of HTMLElements from modal up the shadow DOM chain
   *   - shadowRoots: Array of ShadowRoots encountered during traversal
   */
  private getModalHierarchy(): { ancestors: HTMLElement[]; shadowRoots: ShadowRoot[] } {
    const ancestors: HTMLElement[] = [];
    const shadowRoots: ShadowRoot[] = [];

    if (!this.el) {
      return { ancestors, shadowRoots };
    }

    // Start with the modal element itself
    ancestors.push(this.el);

    let current: Node | null = this.el;

    // Traverse up the DOM tree through shadow hosts
    while (current) {
      const root = current.getRootNode?.();
      if (!(root instanceof ShadowRoot)) {
        break;
      }
      // if it finds shadow root, store it and move to its host
      shadowRoots.push(root);
      const host = root.host as HTMLElement;
      if (!host) {
        break;
      }
      // store the host and continue up the tree
      ancestors.push(host);
      current = host;
    }

    return { ancestors, shadowRoots };
  }


  render() {
    const {
      label,
      modalTitle,
      primaryButtonClick,
      primaryButtonText,
      secondaryButtonClick,
      secondaryButtonText,
      status,
      visible,
      forcedModal,
      unstyled,
    } = this;

    if (!visible) return null;

    // Conditionally set value to eventually be passed to the aria-label attribute
    // of the modal's inner div wrapper. If label prop is provided, use that. Otherwise
    // if modalTitle prop is provided, use that. If neither is provided, a warning
    // will be logged in the console.
    // The aria label for the close button will also be set based upon the same logic.
    /* eslint-disable i18next/no-literal-string */
    let ariaLabel: string | null = null;
    let btnAriaLabel: string = 'Close modal';

    if (label) {
      ariaLabel = label;
      btnAriaLabel = `Close ${label} modal`;
    }
    else if (modalTitle && modalTitle !== '') {
      ariaLabel = `${modalTitle} modal`;
      btnAriaLabel = `Close ${modalTitle} modal`;
    }
    else {
      console.warn('<va-modal>: An accessible name for the modal is required. Please provide either a label or modalTitle prop value.');
    }

    const wrapperClass = classnames({
      'usa-modal': true,
      'va-modal-alert': status,
      'usa-modal--lg': this.large,
    });
    const contentClass = classnames({
      'usa-modal__content': true,
      'usa-modal-alert': status,
      'va-modal__content': true,
    });
    const bodyClass = classnames({
      'usa-modal__main': true,
      'usa-modal-alert': status,
      'va-modal-alert-body': status,
    });
    const titleClass = classnames({
      'usa-modal__heading': true,
      'va-modal-alert-title': status,
    });

    const closingButton = forcedModal ? (
      ''
    ) : (
      <button
        aria-label={btnAriaLabel}
        class="va-modal-close"
        onClick={e => this.handleClose(e)}
        ref={el => (this.closeButton = el as HTMLButtonElement)}
        type="button"
      >
        <va-icon icon="close" size={4}></va-icon>
      </button>
    );

    /* eslint-disable i18next/no-literal-string */
    // Icons to show for each status type
    const statusIcons = {
      continue: 'lock',
      error: 'error',
      info: 'info',
      success: 'check',
      warning: 'warning',
    };
    const statusIcon = statusIcons[status];

    return (
      <Host>
        <div
          class={wrapperClass}
          role={
            status === 'warning' || status === 'error'
              ? 'alertdialog'
              : 'dialog'
          }
          aria-modal="true"
          aria-label={ariaLabel}
        >
          <div class={contentClass}>
            {closingButton}
            {status && (
              <va-icon
                class="va-modal-alert__icon"
                icon={statusIcon}
                size={4}
              ></va-icon>
            )}
            <div class={bodyClass}>
              <div role="document">
                {modalTitle && (
                  <h2 class={titleClass} tabindex={-1} id="heading">
                    {modalTitle}
                  </h2>
                )}
                <div class="usa-prose" id="description">
                  <slot></slot>
                </div>
              </div>
              {((primaryButtonClick && primaryButtonText) ||
                (secondaryButtonClick && secondaryButtonText)) && (
                <div
                  class="usa-modal__footer"
                  ref={el => (this.alertActions = el as HTMLDivElement)}
                >
                  <ul class="usa-button-group">
                    {primaryButtonClick && primaryButtonText && (
                      <li class="usa-button-group__item">
                        <va-button
                          onClick={e => this.handlePrimaryButtonClick(e)}
                          text={primaryButtonText}
                        />
                      </li>
                    )}
                    {secondaryButtonClick && secondaryButtonText && (
                      <li class="usa-button-group__item">
                        {!unstyled && (
                          <va-button
                            onClick={e => this.handleSecondaryButtonClick(e)}
                            secondary
                            text={secondaryButtonText}
                          />
                        )}
                        {unstyled && (
                          <button
                            onClick={e => this.handlePrimaryButtonClick(e)}
                            type="button"
                            class="usa-button usa-button--unstyled"
                          >
                            {secondaryButtonText}
                          </button>
                        )}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
