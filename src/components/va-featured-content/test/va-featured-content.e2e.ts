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

  it('renders when level prop is 3', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-featured-content
        level=3
        header="If I'm a Veteran, can I get VR&E benefits and services?"
      >
      />
    `);
    const element = await page.find('va-featured-content >>> h3');
    expect(element).not.toBeNull();
  });

  it('renders when level prop is 4', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-featured-content
        level=4
        header="If I'm a Veteran, can I get VR&E benefits and services?"
      />
    `);
    const element = await page.find('va-featured-content >>> h4');
    expect(element).not.toBeNull();
  });

  it('does not render the header when level prop is 1', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-featured-content
        level=1
        header="If I'm a Veteran, can I get VR&E benefits and services?"
      />
    `);
    const element = await page.find('va-featured-content >>> h1');
    expect(element).toBeNull();
  });

  it('does not render the header when level prop is 2', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-featured-content
        level=2
        header="If I'm a Veteran, can I get VR&E benefits and services?"
      />
    `);
    const element = await page.find('va-featured-content >>> h2');
    expect(element).toBeNull();
  });

  it('does not render the header when level prop is 5', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-featured-content
        level=5
        header="If I'm a Veteran, can I get VR&E benefits and services?"
      />
    `);
    const element = await page.find('va-featured-content >>> h5');
    expect(element).toBeNull();
  });

  it('does not render the header when level prop is 6', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-featured-content
        level=6
        header="If I'm a Veteran, can I get VR&E benefits and services?"
      />
    `);
    const element = await page.find('va-featured-content >>> h6');
    expect(element).toBeNull();
  });

  it('sents the header to the value of the header prop', async () => {
    const header = "Testing";
    const page = await newE2EPage();
    await page.setContent(`
      <va-featured-content
        level=3
        header=${header}
      />
    `);
    const element = await page.find('va-featured-content >>> h3');
    expect(element).toEqualText(header);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-featured-content />');

    await axeCheck(page);
  });
});
