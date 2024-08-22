import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';

describe('va-button-pair', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-pair></va-button-pair>');
    const element = await page.find('va-button-pair');
    expect(element).toEqualHtml(`
    <va-button-pair class="hydrated">
      <mock:shadow-root>
        <ul class="usa-button-group">
          <li class="usa-button-group__item">
            <va-button class="hydrated"></va-button>
          </li>
          <li class="usa-button-group__item">
            <va-button secondary="" class="hydrated"></va-button>
          </li>
        </ul>
      </mock:shadow-root>
    </va-button-pair>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-pair continue></va-button-pair>');
    await axeCheck(page);
  });

  it('fires analytics event when primary button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-pair confirm></va-button-pair>');
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const primaryButton = await page.find('va-button-pair >>> va-button');
    await primaryButton.click();
    expect(analyticsSpy).toHaveReceivedEventDetail({
      componentName: 'va-button-pair',
      action: 'click',
      details: {
        type: 'primary',
        label: 'Yes',
      },
    });
  });

  it('fires analytics event when secondary button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-pair confirm></va-button-pair>');
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const buttons = await page.findAll('va-button-pair >>> va-button');
    await buttons[1].click();
    expect(analyticsSpy).toHaveReceivedEventDetail({
      componentName: 'va-button-pair',
      action: 'click',
      details: {
        type: 'secondary',
        label: 'No',
      },
    })
  });

  it(`doesn't fire analytics event when disableAnalytics is true`, async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-button-pair disable-analytics></va-button-pair>',
    );
    const analyticsSpy = await page.spyOnEvent('component-library-analytics');
    const buttons = await page.findAll('va-button-pair >>> va-button');
    await buttons[1].click();
    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('fires primaryClick event when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-pair confirm></va-button-pair>');
    const primaryClickEvent = await page.spyOnEvent('primaryClick');
    const primaryButton = await page.find('va-button-pair >>> va-button');
    await primaryButton.click();
    expect(primaryClickEvent).toHaveReceivedEventTimes(1);
  });

  it('fires secondaryClick event when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-pair confirm></va-button-pair>');
    const secondaryClickEvent = await page.spyOnEvent('secondaryClick');
    const buttons = await page.findAll('va-button-pair >>> va-button');
    await buttons[1].click();
    expect(secondaryClickEvent).toHaveReceivedEventTimes(1);
  });

  it('renders custom button text when left- and right-button-text props are set', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-button-pair left-button-text="hello" right-button-text="world"></va-button-pair>')
   
    const leftButton = (
      await page.waitForFunction(() =>
        document.querySelector('va-button-pair').shadowRoot.querySelector('va-button').shadowRoot.querySelector('button')
      )
    ).asElement();

    const leftText = await leftButton.evaluate(element => element.innerHTML);
    expect(leftText).toEqual('hello');

    const rightButton = (
      await page.waitForFunction(() => {
        const vaButtons = document.querySelector('va-button-pair').shadowRoot.querySelectorAll('va-button');
        return vaButtons[1].shadowRoot.querySelector('button');
      })
    ).asElement();

    const rightText = await rightButton.evaluate(element => element.innerHTML);
    expect(rightText).toEqual('world');
  })
});
