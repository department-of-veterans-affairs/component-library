import { Component, Host, h } from '@stencil/core';

/**
 * @componentName Footer
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-footer',
  styleUrl: 'va-footer.scss',
  shadow: true,
})
export class VaFooter {

  render() {
    return (
      <Host>
        <div class="footer-content">
          <div class="link-column">
            <h2>Veteran programs and services</h2>
            <ul>
              <li>
                <va-link
                  href="https://www.va.gov/womenvet/"
                  text="Women Veterans"
                />
              </li>
            </ul>
          </div>
        </div>
      </Host>
    );
  }

}
