import { Component, Element, Host, State, h } from '@stencil/core';
import classnames from 'classnames';

import 'intersection-observer';

/**
 * This component has three main behaviors:
 * 1. Going to the top of the page when the button is clicked
 * 2. "Revealing" after scrolling down far enough
 * 3. "Docking" when the dock becomes visible
 *
 * The span.reveal-point determines when the reveal happens.
 * It is positioned on the page in an absolute manner, and the
 * button will reveal when the span is above the viewport.
 */
@Component({
  tag: 'va-back-to-top',
  styleUrl: 'va-back-to-top.css',
  shadow: true,
})
export class VaBackToTop {
  revealPixel!: HTMLSpanElement;

  @State() hasHitBreakpoint = false;
  @State() isDocked = false;

  @Element() el: HTMLElement;

  componentDidLoad() {
    // Setup observer to handle docking behavior
    const dockObserver = new IntersectionObserver(
      entries => {
        // The second half of the || ensures that the button
        // stays docked even if the viewport is scrolled below the dock
        this.isDocked =
          entries[0].isIntersecting || entries[0].boundingClientRect.y < 0;
      },
      { threshold: 1.0 },
    );
    dockObserver.observe(this.el);

    // Setup observer to handle reveal behavior
    const revealObserver = new IntersectionObserver(entries => {
      this.hasHitBreakpoint = entries[0].boundingClientRect.y < 0;
    });
    revealObserver.observe(this.revealPixel);
  }

  navigateToTop() {
    // Focus the h1 tag on the page.
    const el = document.querySelector('h1');
    if (el) {
      // Prepare the element so that it can accept focus properly.
      el.setAttribute('tabindex', '-1');
      el.focus();

      // Cleanup the tabindex on blur.
      el.addEventListener('blur', () => el.removeAttribute('tabindex'));
    }

    // Scroll to the top.
    return window.scrollTo(0, 0);
  }

  render() {
    // This ensures that when the button is revealed but not docked,
    // its width is the same as its parent.
    const undockedWidth = this.el.getBoundingClientRect().width;
    this.el.style.setProperty('--undocked-width', `${undockedWidth}px`);

    return (
      <Host>
        <span
          class="reveal-point"
          ref={el => (this.revealPixel = el as HTMLSpanElement)}
        ></span>

        <div class={classnames({ docked: this.isDocked })}>
          <button
            onClick={this.navigateToTop.bind(this)}
            class={classnames({ reveal: this.hasHitBreakpoint })}
          >
            <i aria-hidden="true" role="img"></i>
            <span>Back to top</span>
          </button>
        </div>
      </Host>
    );
  }
}
