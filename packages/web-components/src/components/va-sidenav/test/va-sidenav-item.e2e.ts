import { newE2EPage } from '@stencil/core/testing';

describe('va-sidenav-item', () => {
  it('href prop sets the anchor link href attribute', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-sidenav>
          <va-sidenav-item href="/profile"></va-sidenav-item>
        </va-sidenav>`);
    const link = await page.find('va-sidenav-item >>> a');
    const href = await link.getAttribute('href');
    expect(href).toBe('/profile');
    
    await page.close();
  });

  it('label prop sets the anchor link text', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-sidenav>
          <va-sidenav-item href="/profile" label="Profile"></va-sidenav-item>
        </va-sidenav>`);
    const link = await page.find('va-sidenav-item >>> a');
    const text = await link.innerText;
    expect(text).toBe('Profile');
    
    await page.close(); 
  });

  it('currentPage prop updates aria-current and adds va-sidenav__current class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-sidenav>
          <va-sidenav-item href="/profile" label="Profile" current-page="true"></va-sidenav-item>
        </va-sidenav>`);

    const item = await page.find('va-sidenav-item >>> .va-sidenav__item');
    const ariaCurrent = await item.getAttribute('aria-current');
    expect(ariaCurrent).toBe('page');

    const link = await item.find('a');
    const linkClasses = await link.getAttribute('class');
    expect(linkClasses).toContain('va-sidenav__current');
    
    await page.close();
  });

  it('currentPage href goes to #content', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-sidenav>
          <va-sidenav-item href="/profile" label="Profile" current-page="true"></va-sidenav-item>
        </va-sidenav>`);

    const item = await page.find('va-sidenav-item >>> .va-sidenav__current');
    const href = await item.getAttribute('href');
    expect(href).toBe('#content');
    
    await page.close();
  });

  it('sends a click event when routerLink is not set', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-sidenav>
          <va-sidenav-item href="/profile" label="Profile"></va-sidenav-item>
        </va-sidenav>`);

    const event = await page.spyOnEvent('click');
    const link = await page.find('va-sidenav-item >>> a');
    await link.click();

    expect(event).toHaveReceivedEventTimes(1);
    await page.close();
  });

  it('sends vaRouteChange event when routerLink is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-sidenav>
          <va-sidenav-item id="test-item" href="/profile" label="Profile"></va-sidenav-item>
        </va-sidenav>`);

    // Directly set the routerLink property using JavaScript
    const element = await page.find('#test-item');
    await element.setProperty('routerLink', true);
    await page.waitForChanges();

    // Setup event listener before clicking
    const eventRouteChange = await page.spyOnEvent('vaRouteChange');

    // Click the link
    const link = await page.find('#test-item >>> a');
    await link.click();

    expect(eventRouteChange).toHaveReceivedEventTimes(1);
    expect(eventRouteChange).toHaveReceivedEventDetail({ href: '/profile' });
    await page.close();
  });
});
