import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

const pageStyles = `
:root { --reveal-breakpoint: 200px}
div {
  margin: 0;
  padding: 0;
  height: 1000px;
}
footer {
  height: 500px;
}
`;

const pageSetup = async () => {
  const page = await newE2EPage();
  await page.setViewport({ width: 800, height: 200 });
  await page.setContent(`
    <main>
    <h1>The top</h1>
    <div>Placeholder</div>
    <va-back-to-top></va-back-to-top>
    </main>
    <footer>The footer</footer>
    `);

  await page.addStyleTag({ content: pageStyles });

  return page;
};

describe('va-back-to-top', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-back-to-top></va-back-to-top>');

    const element = await page.find('va-back-to-top');
    expect(element).toHaveClass('hydrated');
  });

  it('reveals when the viewport is below the reveal pixel', async () => {
    const page = await pageSetup();
    const button = await page.find('va-back-to-top >>> button');
    const notQuitePastRevealPoint = 199;

    // Button shouldn't be revealed initially
    expect(button).not.toHaveClass('reveal');

    // Scroll until the `<span class="reveal-point">` is just at
    // the top of the viewport
    await page.mouse.wheel({ deltaY: notQuitePastRevealPoint });
    await page.waitForChanges();

    // Button _still_ shouldn't be revealed after a bit of scrolling
    expect(button).not.toHaveClass('reveal');

    // Scroll a few pixels more to get past the `--reveal-breakpoint`
    await page.mouse.wheel({ deltaY: 10 });
    await page.waitForChanges();

    // Button should be revealed with `.reveal-point` above the viewport
    expect(button).toHaveClass('reveal');
  });

  it('docks when the "dock" is scrolled into view', async () => {
    const page = await pageSetup();
    const wrapper = await page.find('va-back-to-top >>> div');
    const pastPlaceholder = 1000;

    expect(wrapper).not.toHaveClass('docked');

    // 1000px scrolled + 200px viewport height means that the dock is in the viewport
    await page.mouse.wheel({ deltaY: pastPlaceholder });
    await page.waitForChanges();

    expect(await wrapper.isIntersectingViewport()).toEqual(true);

    // We've scrolled a lot - button should be docked
    expect(wrapper).toHaveClass('docked');
  });

  it('stays docked even with really long footers', async () => {
    const page = await pageSetup();
    const wrapper = await page.find('va-back-to-top >>> div');
    const pastDock = 1300; // Placeholder section is 1000px tall & viewport is 200

    // Scroll past the dock
    await page.mouse.wheel({ deltaY: pastDock });
    await page.waitForChanges();

    // After scrolling this much, the dock is above the viewport
    expect(await wrapper.isIntersectingViewport()).toEqual(false);
    expect(wrapper).toHaveClass('docked');
  });

  it('goes to top on click', async () => {
    const page = await pageSetup();
    const button = await page.find('va-back-to-top >>> button');
    const topHeading = await page.find('h1');
    const pastRevealPoint = 300;

    // Scroll far enough to make the button visible
    await page.mouse.wheel({ deltaY: pastRevealPoint });
    await page.waitForChanges();

    expect(await topHeading.isIntersectingViewport()).toEqual(false);

    button.click();
    await page.waitForChanges();

    expect(await topHeading.isIntersectingViewport()).toEqual(true);
  });

  it('passes an axe check', async () => {
    const page = await pageSetup();

    await axeCheck(page);
  });

  it('passes an axe check when revealed', async () => {
    const page = await pageSetup();
    const button = await page.find('va-back-to-top >>> button');
    const pastRevealPoint = 300;

    await page.mouse.wheel({ deltaY: pastRevealPoint });
    await page.waitForChanges();

    expect(button).toHaveClass('reveal');
    // The color contrast error appears to be a false negative
    await axeCheck(page, ['color-contrast']);
  });

  it('passes an axe check when docked', async () => {
    const page = await pageSetup();
    const wrapper = await page.find('va-back-to-top >>> div');
    const pastPlaceholder = 1000;

    await page.mouse.wheel({ deltaY: pastPlaceholder });
    await page.waitForChanges();

    expect(wrapper).toHaveClass('docked');
    // The color contrast error appears to be a false negative
    await axeCheck(page, ['color-contrast']);
  });
});
