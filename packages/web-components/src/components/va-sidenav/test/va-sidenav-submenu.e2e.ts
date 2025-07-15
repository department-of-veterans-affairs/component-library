import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

const vaSidenavSubmenu = () => {
  return `<va-sidenav header="Profile" icon-name="account_circle" icon-background-color="vads-color-primary">
    <va-sidenav-item href="#" label="Personal information"></va-sidenav-item>
    <va-sidenav-item href="#" label="Contact information"></va-sidenav-item>
    <va-sidenav-submenu label="Submenu">
      <va-sidenav-item current-page="true" href="#" label="Submenu item"></va-sidenav-item>
      <va-sidenav-item current-page="true" href="#" label="Submenu item"></va-sidenav-item>
    </va-sidenav-submenu>
  </va-sidenav>`
}

describe('va-sidenav-submenu', () => {
  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(vaSidenavSubmenu());

    await axeCheck(page);
    await page.close();
  });
  
  it('href prop sets the submenu parent to a link', async () => {
    const page = await newE2EPage();
    await page.setContent(vaSidenavSubmenu());
  
    const submenu = await page.find('va-sidenav-submenu');
    await submenu.setProperty('href', '/profile');
    await page.waitForChanges();
  
    const link = await page.find('va-sidenav-submenu >>> a');
    const href = await link.getAttribute('href');
    expect(href).toBe('/profile');
    
    await page.close(); 
  });
  
  // currentPage in self
  it('currentPage prop sets href to #content and aria-current to page', async () => {
    const page = await newE2EPage();
    await page.setContent(vaSidenavSubmenu());
  
    const submenu = await page.find('va-sidenav-submenu');
    await submenu.setProperty('currentPage', true);
    await submenu.setProperty('href', '/profile');
    await page.waitForChanges();
  
    const link = await page.find('va-sidenav-submenu >>> a');
    const href = await link.getAttribute('href');
    expect(href).toBe('#content');
  
    const linkWrapper = await page.find('va-sidenav-submenu >>> a');
    const ariaCurrent = await linkWrapper.getAttribute('aria-current');
    expect(ariaCurrent).toBe('page');
  
    await page.close();
  });
  
  it('active submenu is styled with va-sidenav-submenu__current', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-sidenav header="Profile" icon-name="account_circle" icon-background-color="vads-color-primary">
      <va-sidenav-item href="#" label="Personal information"></va-sidenav-item>
      <va-sidenav-submenu label="Submenu">
        <va-sidenav-item current-page="true" href="#" label="Submenu item"></va-sidenav-item>
        <va-sidenav-item href="#" label="Submenu item"></va-sidenav-item>
      </va-sidenav-submenu>
    </va-sidenav>`);
  
    const submenu = await page.find('va-sidenav-submenu');
  
    expect(submenu).not.toBeNull();
  
    const submenuClasses = await submenu.getAttribute('class');
    expect(submenuClasses).toContain('va-sidenav-submenu__current');
  
    await page.close();
  });
  
  it('allows for only one currentPage item in the submenu', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-sidenav header="Profile" icon-name="account_circle" icon-background-color="vads-color-primary">
      <va-sidenav-item href="#" label="Personal information"></va-sidenav-item>
      <va-sidenav-submenu label="Submenu">
        <va-sidenav-item current-page="true" href="#" label="Submenu item"></va-sidenav-item>
        <va-sidenav-item current-page="true" href="#" label="Submenu item"></va-sidenav-item>
      </va-sidenav-submenu>
    </va-sidenav>`);
  
    const currentPageItems = await page.findAll('[current-page="true"]');
    expect(currentPageItems.length).toBe(1);
  
    await page.close();
  });
  
  it('sends vaRouteChange event when routerLink is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-sidenav header="Profile" icon-name="account_circle" icon-background-color="vads-color-primary">
      <va-sidenav-item href="#" label="Personal information"></va-sidenav-item>
      <va-sidenav-submenu label="Submenu">
        <va-sidenav-item href="#" label="Submenu item"></va-sidenav-item>
        <va-sidenav-item id="router-link-item" router-link="true" href="/profile" label="Submenu item"></va-sidenav-item>
      </va-sidenav-submenu>
    </va-sidenav>`);
  
    const event = await page.spyOnEvent('vaRouteChange');
    const link = await page.find('#router-link-item >>> a');
    await link.click();
  
    expect(event).toHaveReceivedEventTimes(1);
    expect(event).toHaveReceivedEventDetail({ href: '/profile' });
    await page.close();
  });
});