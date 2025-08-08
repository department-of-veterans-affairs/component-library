import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-sidenav', () => {
  it('passes an axe check', async () => {
    const page = await newE2EPage();

    // Set viewport to desktop size
    await page.setViewport({
      width: 1024,
      height: 768
    });
    
    await page.setContent(`
    <va-sidenav header="Profile" icon-name="account_circle" icon-background-color="vads-color-primary">
      <va-sidenav-item href="#" label="Personal information"></va-sidenav-item>
      <va-sidenav-item href="#" label="Contact information"></va-sidenav-item>
      <va-sidenav-submenu label="Submenu">
        <va-sidenav-item href="#" label="Submenu item"></va-sidenav-item>
      </va-sidenav-submenu>
    </va-sidenav>`);
  
    await axeCheck(page);

    // Set viewport to mobile web size
    await page.setViewport({
      width: 480,
      height: 768
    });

    await page.waitForChanges();

    await axeCheck(page);
    await page.close();
  });

  it('header property sets the header and aria-labelfor desktop and mobile web', async () => {
    const page = await newE2EPage();

    // Set viewport to desktop size
    await page.setViewport({
      width: 1024,
      height: 768
    });

    await page.setContent('<va-sidenav header="Profile"></va-sidenav>');

    const navMenuHeader = await page.find('va-sidenav >>> .va-sidenav__header');
    const navMenu = await page.find('va-sidenav >>> nav');
    const ariaLabel = await navMenu.getAttribute('aria-label');

    expect(navMenuHeader).toEqualText('Profile');
    expect(ariaLabel).toEqualText('Related pages menu');

    // Set viewport to mobile web size
    await page.setViewport({
      width: 480,
      height: 768
    });

    await page.waitForChanges();

    const sideNavAccordionItem = await page.find('va-sidenav >>> va-accordion-item');
    const sideNavAccordionHeader = await sideNavAccordionItem.getProperty('header');
    
    expect(sideNavAccordionHeader).toEqualText('Related pages menu');

    const navElement = await page.find('va-sidenav >>> nav');
    const ariaLabelMobileWeb = await (await navElement.getAttribute('aria-label'));
    expect(ariaLabelMobileWeb).toEqualText('Related pages menu');
    
    await page.close();
  });

  it('iconName prop sets the icon with a background color - desktop', async () => {
    const page = await newE2EPage();
    // Set viewport to desktop size
    await page.setViewport({
      width: 1024,
      height: 768
    });

    await page.setContent('<va-sidenav header="Profile" icon-name="account_circle" icon-background-color="vads-color-primary"><va-sidenav-item href="#" label="Personal information"></va-sidenav-item></va-sidenav>');

    const iconBackground = await page.find('va-sidenav >>> .va-sidenav__icon-background');
    expect(iconBackground).not.toBeNull();
    
    // Check the background color style using getAttribute
    const style = await iconBackground.getComputedStyle();
    expect(style.backgroundColor).toEqual('rgb(0, 94, 162)'); // vads-color-primary

    const icon = await page.find('va-sidenav >>> va-icon');
    expect(icon).not.toBeNull();
    
    const iconName = await icon.getProperty('icon');
    expect(iconName).toEqual('account_circle');
    
    await page.close();
  });

  it('displays "Menu" when header is not set on mobile web', async () => {
    const page = await newE2EPage();
    // Set viewport to mobile size
    await page.setViewport({
      width: 480,
      height: 320
    });

    await page.setContent('<va-sidenav></va-sidenav>');

    const accordionItem = await page.find('va-sidenav >>> va-accordion-item');
    const accordionItemHeader = await accordionItem.getProperty('header');
    expect(accordionItemHeader).toEqual('Related pages menu');
    
    await page.close();
  });

  it('the aria-label is consistent across desktop and mobile web', async () => {
    const page = await newE2EPage();
    // Set viewport to desktop size
    await page.setViewport({
      width: 1024,
      height: 768
    });

    await page.setContent('<va-sidenav header="Profile"></va-sidenav>');

    const navElement = await page.find('va-sidenav >>> nav');
    const ariaLabel = await navElement.getAttribute('aria-label');
    expect(ariaLabel).toBe('Related pages menu');


    // Set viewport to mobile web size
    await page.setViewport({
      width: 480,
      height: 768
    });

    await page.waitForChanges();

    const navElementMobileWeb = await page.find('va-sidenav >>> nav');
    const ariaLabelMobileWeb = await navElementMobileWeb.getAttribute('aria-label');
    expect(ariaLabelMobileWeb).toBe('Related pages menu');
    
    await page.close();
  });

  it('mobile web markup displays va-accordion and va-accordion-item', async () => {
    const page = await newE2EPage();
    // Set viewport to mobile size
    await page.setViewport({
      width: 480,
      height: 768
    });

    await page.setContent('<va-sidenav header="Profile"></va-sidenav>');

    const accordion = await page.find('va-sidenav >>> va-accordion');
    const accordionItem = await page.find('va-sidenav >>> va-accordion-item');
    expect(accordion).not.toBeNull();
    expect(accordionItem).not.toBeNull();
    
    await page.close();
  });

  it('sets only one current page', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-sidenav><va-sidenav-item current-page="true"></va-sidenav-item><va-sidenav-item current-page="true"></va-sidenav-item></va-sidenav>');

    const currentPageElements = await page.findAll('[current-page="true"]');
    expect(currentPageElements.length).toBe(1);
    
    await page.close();
  });

  it('updates current-page attributes when navigation link is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-sidenav header="Profile" icon-name="account_circle" icon-background-color="vads-color-primary">
        <va-sidenav-item current-page="true" href="#" label="Personal information"></va-sidenav-item>
        <va-sidenav-item id="contact-info" href="#" label="Contact information"></va-sidenav-item>
        <va-sidenav-submenu id="submenu" label="Submenu">
          <va-sidenav-item id="submenu-item" href="#" label="Submenu item"></va-sidenav-item>
        </va-sidenav-submenu>
      </va-sidenav>`);
    const currentPageElements = await page.findAll('[current-page="true"]');
    expect(currentPageElements.length).toBe(1);

    const item = await page.find('#contact-info');
    item.click();

    await page.waitForChanges();

    let currentPageElementsAfterClick = await page.findAll('[current-page="true"]');
    expect(currentPageElementsAfterClick.length).toBe(1);

    const submenuItem = await page.find('#submenu-item');
    submenuItem.click();

    await page.waitForChanges();

    currentPageElementsAfterClick = await page.findAll('[current-page="true"]');
    expect(currentPageElementsAfterClick.length).toBe(1);
    
    const submenu = await page.find('#submenu');
    submenu.setAttribute('href', '#');
    submenu.click();
    
    await page.waitForChanges();
    
    currentPageElementsAfterClick = await page.findAll('[current-page="true"]');
    expect(currentPageElementsAfterClick.length).toBe(1);
    
    await page.close();
  });

  it('desktop header is a span and not an h2', async () => {
    const page = await newE2EPage();

    // Set viewport to desktop size
    await page.setViewport({
      width: 1024,
      height: 768
    });

    await page.setContent('<va-sidenav header="Profile"></va-sidenav>');

    const header = await page.find('va-sidenav >>> .va-sidenav__header');
    expect(header).not.toBeNull();
    expect(header.tagName).toBe('SPAN');
    
    await page.close();
  });

  it('programatically set the current-page attribute on multiple elements', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-sidenav><va-sidenav-item id="item-0"></va-sidenav-item><va-sidenav-item id="item-1" current-page></va-sidenav-item><va-sidenav-item id="item-2"></va-sidenav-item></va-sidenav>');
    
    function hasCurrentStyle(item: any) {
      return !!item.shadowRoot.querySelector('.va-sidenav-item__current');
    }

    let currentPageElements = await page.findAll('va-sidenav-item');

    // expect only the second item to have the current-page attribute on initial load
    expect(currentPageElements[0].getAttribute('current-page')).toBeNull();
    expect(currentPageElements[1].getAttribute('current-page')).not.toBeNull();
    expect(currentPageElements[2].getAttribute('current-page')).toBeNull();

    // The second item has the current-page styling
    expect(hasCurrentStyle(currentPageElements[1] as any)).toBe(true);

    // The others do not have the current-page styling
    expect(hasCurrentStyle(currentPageElements[0] as any)).toBe(false);
    expect(hasCurrentStyle(currentPageElements[2] as any)).toBe(false); 

    // update all of the current-page attributes to "false" except the third element
    currentPageElements.forEach((el) => {
      el.setAttribute('current-page', el.id === 'item-2' ? '' : 'false');
    });

    await page.waitForChanges();

    currentPageElements = await page.findAll('va-sidenav-item');

    // expect only the third item to have the current-page attribute
    expect(currentPageElements[0].getAttribute('current-page')).toBeNull();
    expect(currentPageElements[1].getAttribute('current-page')).toBeNull();
    expect(currentPageElements[2].getAttribute('current-page')).not.toBeNull();

    // The third item has the current-page styling
    expect(hasCurrentStyle(currentPageElements[2] as any)).toBe(true);

    // The others do not
    expect(hasCurrentStyle(currentPageElements[0] as any)).toBe(false);
    expect(hasCurrentStyle(currentPageElements[1] as any)).toBe(false); 
    
    await page.close();
  });
});
