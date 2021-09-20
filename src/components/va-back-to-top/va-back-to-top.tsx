import { Component, Element, Host, Listen, State, h } from '@stencil/core';

import 'intersection-observer';

@Component({
  tag: 'va-back-to-top',
  styleUrl: 'va-back-to-top.css',
  shadow: true,
})
export class VaBackToTop {
  breakpoint = 600;
  observer = null;
  bttButton!: HTMLButtonElement;
  @State() hasHitBreakpoint = false;
  @State() isDocked = false;

  @Element() el: HTMLElement;

  @Listen('scroll', { target: 'window' })
  handleScroll() {
    if (this.breakpointCheck() !== this.hasHitBreakpoint) {
      this.hasHitBreakpoint = !this.hasHitBreakpoint;
    }
  }

  componentWillLoad() {
    console.log(this.el, this.el.getBoundingClientRect());
    const options = {
      threshold: 1.0,
    };

    const handleDock = (entries, observer) => {
      console.log('Intersection callback', this.isDocked);
      console.log(entries[0].isIntersecting);
      if (entries[0].isIntersecting && !this.isDocked) {
        this.isDocked = true;
      } else if (!entries[0].isIntersecting && this.isDocked) {
        this.isDocked = false;
      }
    };

    this.observer = new IntersectionObserver(handleDock, options);
    this.observer.observe(this.el);
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
    const undockedWidth = this.el.getBoundingClientRect().width;
    this.el.style.setProperty('--undocked-width', `${undockedWidth}px`);

    return (
      <Host>
        <div class={this.isDocked ? 'docked' : ''}>
          <button
            onClick={this.navigateToTop.bind(this)}
            class={this.hasHitBreakpoint ? 'reveal' : ''}
            ref={el => (this.bttButton = el as HTMLButtonElement)}
          >
            <i aria-hidden="true" role="img"></i>
            <span>Back to top</span>
          </button>
        </div>
      </Host>
    );
  }
}
