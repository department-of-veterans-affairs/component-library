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

    const link = await page.find('va-sidenav-item >>> a');
    const ariaCurrent = await link.getAttribute('aria-current');
    expect(ariaCurrent).toBe('page');

    const linkClasses = await link.getAttribute('class');
    expect(linkClasses).toContain('va-sidenav-item__current');
    
    await page.close();
  });

  it('currentPage href goes to #content', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <va-sidenav>
          <va-sidenav-item href="/profile" label="Profile" current-page="true"></va-sidenav-item>
        </va-sidenav>`);

    const item = await page.find('va-sidenav-item >>> .va-sidenav-item__current');
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

describe('va-sidenav-item handles different formats of current-page attribute', () => {
  it('handles explict "true" on the current-page attribute', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-sidenav>
        <va-sidenav-item href="#" label="Neutral link"></va-sidenav-item>
        <va-sidenav-item id="explicit-true" current-page="true" href="#" label="Explicit true"></va-sidenav-item>
      </va-sidenav>
    `);

    await page.waitForChanges();
    
    const explicitTrue = await page.find('#explicit-true');
    expect(await explicitTrue.getAttribute('current-page')).not.toBeNull();

    const hasCurrentIndicator = await page.evaluate(() => {
      const explicitTrue = document.querySelector('#explicit-true');
      return !!explicitTrue.shadowRoot.querySelector('.va-sidenav-item__current');
    });
    
    expect(hasCurrentIndicator).toBe(true);
    
    await page.close();
  });

  it('handles an empty string for the current-page attribute', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-sidenav>
        <va-sidenav-item href="#" label="Neutral link"></va-sidenav-item>
        <va-sidenav-item id="empty-string" current-page="" href="#" label="Empty string"></va-sidenav-item>
      </va-sidenav>
    `);

    await page.waitForChanges();
    
    const emptyString = await page.find('#empty-string');
    
    expect(await emptyString.getAttribute('current-page')).not.toBeNull();

    const hasCurrentIndicator = await page.evaluate(() => {
      const emptyString = document.querySelector('#empty-string');
      return !!emptyString.shadowRoot.querySelector('.va-sidenav-item__current');
    });
    
    expect(hasCurrentIndicator).toBe(true);
    
    await page.close();
  });

  it('handles just the attribute current-page (no value)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-sidenav>
        <va-sidenav-item href="#" label="Neutral link"></va-sidenav-item>
        <va-sidenav-item id="no-value" current-page href="#" label="No value"></va-sidenav-item>
      </va-sidenav>
    `);

    await page.waitForChanges();
    
    const noValue = await page.find('#no-value');
    
    expect(await noValue.getAttribute('current-page')).not.toBeNull();

    const hasCurrentIndicator = await page.evaluate(() => {
      const noValue = document.querySelector('#no-value');
      return !!noValue.shadowRoot.querySelector('.va-sidenav-item__current');
    });
    
    expect(hasCurrentIndicator).toBe(true);
    
    await page.close();
  });

  it('handles "TRUE" on the current-page attribute', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-sidenav>
        <va-sidenav-item href="#" label="Neutral link"></va-sidenav-item>
        <va-sidenav-item id="true" current-page="TRUE" href="#" label="True"></va-sidenav-item>
      </va-sidenav>
    `);

    await page.waitForChanges();
    
    const trueItem = await page.find('#true');
    
    expect(await trueItem.getAttribute('current-page')).not.toBeNull();

    const hasCurrentIndicator = await page.evaluate(() => {
      const trueItem = document.querySelector('#true');
      return !!trueItem.shadowRoot.querySelector('.va-sidenav-item__current');
    });
    
    expect(hasCurrentIndicator).toBe(true);
    
    await page.close();
  });

  it('does not show current page indicator when current-page="false"', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <va-sidenav>
        <va-sidenav-item href="#" label="Neutral link"></va-sidenav-item>
        <va-sidenav-item id="false" current-page="false" href="#" label="False"></va-sidenav-item>
      </va-sidenav>
    `);

    await page.waitForChanges();
    
    const hasCurrentIndicator = await page.evaluate(() => {
      const falseItem = document.querySelector('#false');
      return !!falseItem.shadowRoot.querySelector('.va-sidenav-item__current');
    });
    
    expect(hasCurrentIndicator).toBe(false);
    
    await page.close();
  });
});