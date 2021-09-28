import { newE2EPage } from '@stencil/core/testing';

const pageContent = `
      <p>Lorem ipsum</p>
      <p>Some more</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Lorem ipsum</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>Some more</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <p>Some more</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <p>Some more</p>
      <p>Some more</p>
      `;

describe('va-back-to-top', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-back-to-top></va-back-to-top>');

    const element = await page.find('va-back-to-top');
    expect(element).toHaveClass('hydrated');
  });

  it('reveals when the viewport is below the reveal pixel', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <main>
    ${pageContent}
    <va-back-to-top></va-back-to-top>
    </main>
    `);
    const button = await page.find('va-back-to-top >>> button');

    // Button shouldn't be revealed initially
    expect(button).not.toHaveClass('reveal');

    await page.mouse.wheel({ deltaY: 100 });
    await page.waitForChanges();

    // Button _still_ shouldn't be revealed after a bit of scrolling
    expect(button).not.toHaveClass('reveal');

    await page.mouse.wheel({ deltaY: 1000 });
    await page.waitForChanges();

    // We've scrolled a lot - button should be revealed
    expect(button).toHaveClass('reveal');
  });

  it('docks when the "dock" is scrolled into view', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <main>
    ${pageContent}
    <va-back-to-top></va-back-to-top>
    <footer style="height: 100px">The footer</footer>
    </main>
    `);
    const wrapper = await page.find('va-back-to-top >>> div');

    expect(wrapper).not.toHaveClass('docked');

    await page.mouse.wheel({ deltaY: 1400 });
    await page.waitForChanges();

    // We've scrolled a lot - button should be revealed
    expect(wrapper).toHaveClass('docked');
  });
});
