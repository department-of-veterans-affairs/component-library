import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-featured-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-featured-content>
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
      </va-featured-content>
    `);
    const element = await page.find('va-featured-content');

    expect(element).toEqualHtml(`
      <va-featured-content class="hydrated">
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
      </va-featured-content>
    `);
  });

  it("renders the heading passed to the 'headline' slot", async () => {
    const heading = "If I'm a Veteran, can I get VR&E benefits and services?";
    const page = await newE2EPage();
    await page.setContent(`
      <va-featured-content>
        <h3 slot="headline">${heading}</h3>
      </va-featured-content>
    `);
    const element = await page.find('h3');
    expect(element).not.toBeNull();
    expect(element).toEqualText(heading);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-featured-content>
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
      </va-featured-content>
    `);

    await axeCheck(page);
  });
});
