import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-featured-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-featured-content
        level=3
        header="If I'm a Veteran, can I get VR&E benefits and services?"
      >
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
      <va-featured-content level="3" header="If I'm a Veteran, can I get VR&amp;E benefits and services?" class="hydrated">
        <mock:shadow-root>
          <div class="feature">
            <h3>If I'm a Veteran, can I get VR&amp;E benefits and services?</h3>
            <slot></slot>
          </div>
        </mock:shadow-root>
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

  // it("has a class of 'feature", () => {

  // });

  // it('renders when level prop is 3', () => {

  // });

  // it('renders when level prop is 4', () => {

  // });

  // it('throws an error when level prop is not 3 or 4', () => {

  // });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-featured-content />');

    await axeCheck(page);
  });
});
