import { Component, Host, Listen, State, h } from '@stencil/core';

@Component({
  tag: 'va-back-to-top',
  styleUrl: 'va-back-to-top.css',
  shadow: true,
})
export class VaBackToTop {
  breakpoint = 600;
  @State() hasHitBreakpoint = false;

  @Listen('scroll', { target: 'window' })
  handleScroll(ev) {
    if (this.breakpointCheck() !== this.hasHitBreakpoint) {
      this.hasHitBreakpoint = !this.hasHitBreakpoint;
    }
  }

  breakpointCheck() {
    return (window.scrollY || window.pageYOffset) > this.breakpoint;
  }

  navigateToTop() {
    console.log('Clicking button');
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
    return (
      <Host>
        <div>
          <button
            onClick={this.navigateToTop.bind(this)}
            class={this.hasHitBreakpoint ? 'reveal' : ''}
          >
            <span>
              <i aria-hidden="true" class="fa-arrow-up" role="img"></i>
            </span>
            <span>Back to top</span>
          </button>
        </div>
      </Host>
    );
  }
}
