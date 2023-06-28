import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../testing/test-helpers';

// **NOTE** Duplicate tests written to handle scenario of both Props and Slot Usage of Component

describe('va-accordion-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-accordion-item></va-accordion-item>');
    const element = await page.find('va-accordion-item');

    expect(element).toEqualHtml(`
    <va-accordion-item class="hydrated">
      <mock:shadow-root>
        <h2>
          <button aria-controls="content" aria-expanded="false" part="accordion-header">
            <span class="header-text">
              <slot name="icon"></slot>
            </span>
          </button>
        </h2>
        <slot name="headline"></slot>
        <div id="content" tabindex="0">
          <slot></slot>
        </div>
      </mock:shadow-root>
    </va-accordion-item>`);
  });

  it('allows the heading level to be changed via prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item header="The header">Content inside</va-accordion-item>',
    );
    const element = await page.find('va-accordion-item');
    let header = element.shadowRoot.childNodes[0];

    expect(header.nodeName).toEqual('H2');

    element.setProperty('level', 4);
    await page.waitForChanges();
    header = element.shadowRoot.childNodes[0];

    expect(header.nodeName).toEqual('H4');
  });

  it('slot usage allows the heading level to be set directly', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item><h6 slot="headline">The header</h6>Content inside</va-accordion-item>',
    );
    const element = await page.find('va-accordion-item');
    let header = element.shadowRoot.childNodes[0];

    expect(header.nodeName).toEqual('H6');
  });

  it('passes an axe check when open', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-accordion-item open header="First item">Some content</va-accordion-item>
      `);

    await axeCheck(page);
  });

  it('slot usage passes an axe check when open', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-accordion-item><h3 slot="headline">First header</h3>Some content</va-accordion-item>
      `);

    await axeCheck(page);
  });

  it('passes an axe check when closed', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-accordion-item header="First item">Some content</va-accordion-item>
      `);

    await axeCheck(page);
  });

  it('slot usage passes an axe check when closed', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-accordion-item><h3 slot="headline">First header</h3>Some content</va-accordion-item>
      `);

    await axeCheck(page);
  });

  it('sets aria-expanded to true based on prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item header="The header">Content inside</va-accordion-item>',
    );
    const component = await page.find('va-accordion-item');
    const button = await page.find('va-accordion-item >>> button');

    expect(button.getAttribute('aria-expanded')).toEqual('false');

    component.setProperty('open', true);
    await page.waitForChanges();

    expect(button.getAttribute('aria-expanded')).toEqual('true');
  });

  it('fires a custom event when the button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item header="The header">Content inside</va-accordion-item>',
    );

    const accordionItemToggled = await page.spyOnEvent('accordionItemToggled');

    const button = await page.find('va-accordion-item >>> button');
    await button.click();

    expect(accordionItemToggled).toHaveReceivedEventTimes(1);
  });

  it('slot usage fires a custom event when the button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item><h3 slot="headline">The header</h3>Content inside</va-accordion-item>',
    );

    const accordionItemToggled = await page.spyOnEvent('accordionItemToggled');

    const button = await page.find('va-accordion-item >>> button');
    await button.click();

    expect(accordionItemToggled).toHaveReceivedEventTimes(1);
  });

  it('adds a subheader when the subheader prop is used', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item header="The header" subheader="The subheader">Content inside</va-accordion-item>',
    );

    const element = await page.find('va-accordion-item');
    let subheader = element.shadowRoot.querySelector('p');

    expect(subheader).toEqualText('The subheader');
  });

  it('slot usage allows for a subheader when the subheader prop is used', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item subheader="The subheader"><h3 slot="headline">The header</h3>Content inside</va-accordion-item>',
    );

    const element = await page.find('va-accordion-item');
    let subheader = element.shadowRoot.querySelector('p');

    expect(subheader).toEqualText('The subheader');
  });

  it("render the sub header icon", async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item header="The header" subheader="The subheader"><i slot="subheader-icon" aria-hidden="true" className="fas fa-envelope"></i>Content inside</va-accordion-item>',
    );
    const element = await page.find('va-accordion-item');
    expect(element).toEqualHtml(
      `<va-accordion-item class="hydrated" header="The header" subheader="The subheader">
        <mock:shadow-root>
        <h2>
          <button aria-controls="content" aria-expanded="false" part="accordion-header">
            <span class="header-text">
              <slot name="icon"></slot>
              The header
            </span>
            <p class="subheader" part="accordion-subheader">
              <slot name="subheader-icon"></slot>
              The subheader
            </p>
          </button>
        </h2>
        <slot name="headline"></slot>
        <div id="content" tabindex="0">
          <slot></slot>
        </div>
      </mock:shadow-root>
      <i aria-hidden="true" classname="fas fa-envelope" slot="subheader-icon"></i>
      Content inside
    </va-accordion-item>`);
  });
  it("does not render the sub header icon if there is no sub header", async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item header="The header"><i slot="subheader-icon" aria-hidden="true" className="fas fa-envelope"></i>Content inside</va-accordion-item>',
    );
    const element = await page.find('va-accordion-item');
    expect(element).toEqualHtml(`
    <va-accordion-item class="hydrated" header="The header">
      <mock:shadow-root>
        <h2>
          <button aria-controls="content" aria-expanded="false" part="accordion-header">
            <span class="header-text">
              <slot name="icon"></slot>
              The header
            </span>
          </button>
        </h2>
        <slot name="headline"></slot>
        <div id="content" tabindex="0">
          <slot></slot>
        </div>
      </mock:shadow-root>
      <i aria-hidden="true" classname="fas fa-envelope" slot="subheader-icon"></i>
      Content inside
    </va-accordion-item>`);
  });
  it('passes axe check with subheader icon', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item header="The header" subheader="The subheader"><i slot="subheader-icon" aria-hidden="true" className="fas fa-envelope"></i>Content inside</va-accordion-item>',
    );

    await axeCheck(page);

  })

  // Skipping Test until fix can be found via ticket 33479
  // Test sometimes succeeds and other times fails
  // Replication is inconsistent and causing other PRs to fail
  it.skip('fires a custom event when the location hash matches the accordion id', async () => {
    const page = await newE2EPage({ url: '/#testing' });

    await page.setContent(
      '<va-accordion-item id="testing" header="The header">Content inside</va-accordion-item>',
    );
    const accordionItemToggled = await page.spyOnEvent('accordionItemToggled');
    await page.waitForChanges();

    expect(accordionItemToggled).toHaveReceivedEventTimes(1);
  });
});



/**
 * 
 * Begin V3 Tests
 * 
 */
describe('va-accordion-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-accordion-item uswds></va-accordion-item>');
    const element = await page.find('va-accordion-item');

    expect(element).toEqualHtml(`
    <va-accordion-item class="hydrated" uswds="">
      <mock:shadow-root>
        <div>
          <h2 class="usa-accordion__heading">
            <button aria-controls="content" aria-expanded="false" class="usa-accordion__button" type="button">
              <span class="usa-accordion__header va-accordion__header">
                <slot name="icon"></slot>
              </span>
            </button>
          </h2>
          <slot name="headline"></slot>
          <div class="usa-accordion__content usa-prose" hidden="" id="content">
            <slot></slot>
          </div>
        </div>
      </mock:shadow-root>
    </va-accordion-item>`);
  });

  it('allows the heading level to be changed via prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item uswds header="The header">Content inside</va-accordion-item>',
    );
    const element = await page.find('va-accordion-item');
    let header = element.shadowRoot.childNodes[0].childNodes[0];

    expect(header.nodeName).toEqual('H2');

    element.setProperty('level', 4);
    await page.waitForChanges();
    header = element.shadowRoot.childNodes[0].childNodes[0];

    expect(header.nodeName).toEqual('H4');
  });

  it('slot usage allows the heading level to be set directly', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item uswds><h6 slot="headline">The header</h6>Content inside</va-accordion-item>',
    );
    const element = await page.find('va-accordion-item');
    let header = element.shadowRoot.childNodes[0].childNodes[0];

    expect(header.nodeName).toEqual('H6');
  });

  it('passes an axe check when open', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-accordion-item uswds open header="First item">Some content</va-accordion-item>
      `);

    await axeCheck(page);
  });

  it('slot usage passes an axe check when open', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-accordion-item uswds><h3 slot="headline">First header</h3>Some content</va-accordion-item>
      `);

    await axeCheck(page);
  });

  it('passes an axe check when closed', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-accordion-item uswds header="First item">Some content</va-accordion-item>
      `);

    await axeCheck(page);
  });

  it('slot usage passes an axe check when closed', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-accordion-item uswds><h3 slot="headline">First header</h3>Some content</va-accordion-item>
      `);

    await axeCheck(page);
  });

  it('sets aria-expanded to true based on prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item uswds header="The header">Content inside</va-accordion-item>',
    );
    const component = await page.find('va-accordion-item');
    const button = await page.find('va-accordion-item >>> button');

    expect(button.getAttribute('aria-expanded')).toEqual('false');

    component.setProperty('open', true);
    await page.waitForChanges();

    expect(button.getAttribute('aria-expanded')).toEqual('true');
  });

  it('fires a custom event when the button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item uswds header="The header">Content inside</va-accordion-item>',
    );

    const accordionItemToggled = await page.spyOnEvent('accordionItemToggled');

    const button = await page.find('va-accordion-item >>> button');
    await button.click();

    expect(accordionItemToggled).toHaveReceivedEventTimes(1);
  });

  it('slot usage fires a custom event when the button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item uswds><h3 slot="headline">The header</h3>Content inside</va-accordion-item>',
    );

    const accordionItemToggled = await page.spyOnEvent('accordionItemToggled');

    const button = await page.find('va-accordion-item >>> button');
    await button.click();

    expect(accordionItemToggled).toHaveReceivedEventTimes(1);
  });

  it('adds a subheader when the subheader prop is used', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item uswds header="The header" subheader="The subheader">Content inside</va-accordion-item>',
    );

    const element = await page.find('va-accordion-item');
    let subheader = element.shadowRoot.querySelector('.va-accordion__subheader');

    expect(subheader.textContent).toEqualText('The subheader');
  });

  it('slot usage allows for a subheader when the subheader prop is used', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item uswds subheader="The subheader"><h3 slot="headline">The header</h3>Content inside</va-accordion-item>',
    );

    const element = await page.find('va-accordion-item');
    let subheader = element.shadowRoot.querySelector('.va-accordion__subheader');
    expect(subheader.textContent).toEqualText('The subheader');
  });

  it("render the sub header icon", async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item uswds header="The header" subheader="The subheader"><i slot="subheader-icon" aria-hidden="true" className="fas fa-envelope"></i>Content inside</va-accordion-item>',
    );
    const element = await page.find('va-accordion-item');
    expect(element).toEqualHtml(
      `<va-accordion-item uswds class="hydrated" header="The header" subheader="The subheader">
        <mock:shadow-root>
          <div>
            <h2 class="usa-accordion__heading">
              <button aria-controls="content" aria-expanded="false" class="usa-accordion__button" type="button">
                <span class="usa-accordion__header va-accordion__header">
                  <slot name="icon"></slot>
                  The header
                </span>
                <span class="va-accordion__subheader">
                  <slot name="subheader-icon"></slot>
                  The subheader
                </span>
              </button>
            </h2>
            <slot name="headline"></slot>
            <div class="usa-accordion__content usa-prose" hidden="" id="content">
              <slot></slot>
            </div>
        </div>
        </mock:shadow-root>
        <i aria-hidden="true" classname="fas fa-envelope" slot="subheader-icon"></i>
        Content inside
      </va-accordion-item>`
    );
  });
  it("does not render the sub header icon if there is no sub header", async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item uswds header="The header"><i slot="subheader-icon" aria-hidden="true" className="fas fa-envelope"></i>Content inside</va-accordion-item>',
    );
    const element = await page.find('va-accordion-item');
    expect(element).toEqualHtml(`
    <va-accordion-item class="hydrated" header="The header" uswds="">
      <mock:shadow-root>
        <div>
          <h2 class="usa-accordion__heading">
            <button aria-controls="content" aria-expanded="false" class="usa-accordion__button" type="button">
              <span class="usa-accordion__header va-accordion__header">
                <slot name="icon"></slot>
                The header
              </span>
            </button>
          </h2>
          <slot name="headline"></slot>
          <div class="usa-accordion__content usa-prose" hidden="" id="content">
            <slot></slot>
          </div>
        </div>
      </mock:shadow-root>
      <i aria-hidden="true" classname="fas fa-envelope" slot="subheader-icon"></i>
      Content inside
    </va-accordion-item>`);
  });
  it('passes axe check with subheader icon', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-accordion-item uswds header="The header" subheader="The subheader"><i slot="subheader-icon" aria-hidden="true" className="fas fa-envelope"></i>Content inside</va-accordion-item>',
    );

    await axeCheck(page);

  })

  // Skipping Test until fix can be found via ticket 33479
  // Test sometimes succeeds and other times fails
  // Replication is inconsistent and causing other PRs to fail
  it.skip('fires a custom event when the location hash matches the accordion id', async () => {
    const page = await newE2EPage({ url: '/#testing' });

    await page.setContent(
      '<va-accordion-item uswds id="testing" header="The header">Content inside</va-accordion-item>',
    );
    const accordionItemToggled = await page.spyOnEvent('accordionItemToggled');
    await page.waitForChanges();

    expect(accordionItemToggled).toHaveReceivedEventTimes(1);
  });
});
