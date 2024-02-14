import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-summary-box', () => {
  it('renders v1', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-summary-box>
        <h3 slot="headline">
          If I'm a Veteran, can I get VR&E benefits and services?
        </h3>
        <p>You may be eligible for VR&amp;E benefits and services if you're a Veteran, and you meet all of the requirements listed below.</p>
        <p><strong>All of these must be true. You:</strong></p>
        <ul>
          <li>Didn't receive a dishonorable discharge, <strong>and</strong></li>
          <li>Have a service-connected disability rating of at least 10% from VA, <strong>and</strong></li>
          <li><a href="#">Apply for VR&amp;E services</a></li>
        </ul>
      </va-summary-box>
    `);
    const element = await page.find('va-summary-box');

    expect(element).toEqualHtml(`
      <va-summary-box class="hydrated">
        <mock:shadow-root>
          <div class="feature">
            <slot name="headline"></slot>
            <slot></slot>
          </div>
        </mock:shadow-root>
        <h3 slot="headline">If I'm a Veteran, can I get VR&amp;E benefits and services?</h3>
        <p>You may be eligible for VR&amp;E benefits and services if you're a Veteran, and you meet all of the requirements listed below.</p>
        <p><strong>All of these must be true. You:</strong></p>
        <ul>
          <li>Didn't receive a dishonorable discharge, <strong>and</strong></li>
          <li>Have a service-connected disability rating of at least 10% from VA, <strong>and</strong></li>
          <li><a href="#">Apply for VR&amp;E services</a></li>
        </ul>
      </va-summary-box>
    `);
  });

  it("renders the heading passed to the 'headline' slot", async () => {
    const heading = "If I'm a Veteran, can I get VR&E benefits and services?";
    const page = await newE2EPage();
    await page.setContent(`
      <va-summary-box>
        <h3 slot="headline">${heading}</h3>
      </va-summary-box>
    `);
    const element = await page.find('h3');
    expect(element).not.toBeNull();
    expect(element).toEqualText(heading);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-summary-box>
        <h3 slot="headline">
          If I'm a Veteran, can I get VR&E benefits and services?
        </h3>
        <p>You may be eligible for VR&amp;E benefits and services if you're a Veteran, and you meet all of the requirements listed below.</p>
        <p><strong>All of these must be true. You:</strong></p>
        <ul>
          <li>Didn't receive a dishonorable discharge, <strong>and</strong></li>
          <li>Have a service-connected disability rating of at least 10% from VA, <strong>and</strong></li>
          <li><a href="#">Apply for VR&amp;E services</a></li>
        </ul>
      </va-summary-box>
    `);

    await axeCheck(page);
  });

  it('renders v3', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-summary-box uswds>
        <h3 slot="headline">
          If I'm a Veteran, can I get VR&E benefits and services?
        </h3>
        <p>You may be eligible for VR&amp;E benefits and services if you're a Veteran, and you meet all of the requirements listed below.</p>
        <p><strong>All of these must be true. You:</strong></p>
        <ul>
          <li>Didn't receive a dishonorable discharge, <strong>and</strong></li>
          <li>Have a service-connected disability rating of at least 10% from VA, <strong>and</strong></li>
          <li><a href="#">Apply for VR&amp;E services</a></li>
        </ul>
      </va-summary-box>
    `);
    const element = await page.find('va-summary-box');

    expect(element).toEqualHtml(`
      <va-summary-box class="hydrated" uswds="">
        <mock:shadow-root>
          <div class="usa-summary-box" role="region" aria-label="If I'm a Veteran, can I get VR&amp;E benefits and services?">
            <div class="usa-summary-box__body">
              <slot class="usa-summary-box__heading" name="headline"></slot>
              <slot class="usa-summary-box__text"></slot>
            </div>
          </div>
        </mock:shadow-root>
        <h3 slot="headline">If I'm a Veteran, can I get VR&amp;E benefits and services?</h3>
        <p>You may be eligible for VR&amp;E benefits and services if you're a Veteran, and you meet all of the requirements listed below.</p>
        <p><strong>All of these must be true. You:</strong></p>
        <ul>
          <li>Didn't receive a dishonorable discharge, <strong>and</strong></li>
          <li>Have a service-connected disability rating of at least 10% from VA, <strong>and</strong></li>
          <li><a href="#">Apply for VR&amp;E services</a></li>
        </ul>
      </va-summary-box>
    `);
  });

  it("renders the heading passed to the 'headline' slot", async () => {
    const heading = "If I'm a Veteran, can I get VR&E benefits and services?";
    const page = await newE2EPage();
    await page.setContent(`
      <va-summary-box uswds>
        <h3 slot="headline">${heading}</h3>
      </va-summary-box>
    `);
    const element = await page.find('h3');
    expect(element).not.toBeNull();
    expect(element).toEqualText(heading);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-summary-box uswds>
        <h3 slot="headline">
          If I'm a Veteran, can I get VR&E benefits and services?
        </h3>
        <p>You may be eligible for VR&amp;E benefits and services if you're a Veteran, and you meet all of the requirements listed below.</p>
        <p><strong>All of these must be true. You:</strong></p>
        <ul>
          <li>Didn't receive a dishonorable discharge, <strong>and</strong></li>
          <li>Have a service-connected disability rating of at least 10% from VA, <strong>and</strong></li>
          <li><a href="#">Apply for VR&amp;E services</a></li>
        </ul>
      </va-summary-box>
    `);

    await axeCheck(page);
  });
});
