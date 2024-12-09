import { newE2EPage } from '@stencil/core/testing';
import { axeCheck } from '../../../testing/test-helpers';
import { VariantNames } from '../VariantNames';

describe('va-alert-sign-in', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<va-alert-sign-in></va-alert-sign-in>');
    const element = await page.find('va-alert-sign-in');

    expect(element).toEqualHtml(`
      <va-alert-sign-in class="hydrated">
        <mock:shadow-root>
          <div class="usa-alert usa-alert--info va-alert-sign-in--signInRequired">
            <div class="usa-alert__body">
              <div>
                <va-icon class="hydrated va-alert-sign-in__lock-icon"></va-icon>
                <div class="va-alert-sign-in__body">
                  <h2 class="headline">
                    Sign in with a verified account
                  </h2>
                   <p>
                     You'll need to sign in with an identity-verified account through one of our account providers. Identity verification helps us protect all Veterans' information and prevent scammers from stealing your benefits.
                   </p>
                   <p>
                     <strong>
                       Don't yet have a verified account?
                     </strong>
                     Create a
                     <strong>
                       Login.gov
                     </strong>
                     or
                     <strong>
                       ID.me
                     </strong>
                     account. We'll help you verify your identity for your account now.
                   </p>
                   <p>
                     <strong>
                       Not sure if your account is verified?
                     </strong>
                     Sign in here. If you still need to verify your identity, we'll help you do that now.
                   </p>
                   <p>
                     <slot name="SignInButton"></slot>
                   </p>
                   <p>
                     <va-link class="hydrated"></va-link>
                   </p>
                </div>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </va-alert-sign-in>
    `);
  });

  it('renders an empty div with a "polite" aria-live tag when not visible', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<va-alert-sign-in visible="false"></va-alert-sign-in>',
    );
    const element = await page.find('va-alert-sign-in');

    expect(element).toEqualHtml(`
      <va-alert-sign-in class="hydrated" visible="false">
        <mock:shadow-root>
          <div aria-live="polite"></div>
        </mock:shadow-root>
      </va-alert-sign-in>
    `);
  });

  it('passes an axe check', async () => {
    const page = await newE2EPage();
    await page.setContent(`<va-alert-sign-in></va-alert-sign-in>`);

    await axeCheck(page);
  });

  it.skip('fires an analytics event when a link is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-alert-sign-in></va-alert-sign-in>');

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const link = await page.find('va-alert-sign-in >>> va-link');
    await link.click();

    expect(analyticsSpy).toHaveReceivedEventDetail({
      action: 'linkClick',
      componentName: 'va-alert-sign-in',
      details: {
        clickLabel: 'Learn about creating an account',
        variant: VariantNames.signInRequired,
      },
    });
  });

  it.skip('does not fire an analytics event when disableAnalytics is passed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert-sign-in disable-analytics="true"></va-alert-sign-in>',
    );

    const analyticsSpy = await page.spyOnEvent('component-library-analytics');

    const link = await page.find('va-alert-sign-in >>> va-link');
    await link.click();

    expect(analyticsSpy).toHaveReceivedEventTimes(0);
  });

  it('should set variant to "required" if null', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-alert-sign-in></va-alert-sign-in>');

    const element = await page.find('va-alert-sign-in >>> .usa-alert');

    expect(
      element.classList.contains(
        `va-alert-sign-in--${VariantNames.signInRequired}`,
      ),
    ).toBeTruthy();
  });

  it('should set variant to "required" if it is an empty string', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-alert-sign-in variant=""></va-alert-sign-in>');

    const element = await page.find('va-alert-sign-in >>> .usa-alert');

    expect(
      element.classList.contains(
        `va-alert-sign-in--${VariantNames.signInRequired}`,
      ),
    ).toBeTruthy();
  });

  it('should set variant to "required" if value not in pre-defined list', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert-sign-in variant="Fake"></va-alert-sign-in>',
    );

    const element = await page.find('va-alert-sign-in >>> .usa-alert');

    expect(
      element.classList.contains(
        `va-alert-sign-in--${VariantNames.signInRequired}`,
      ),
    ).toBeTruthy();
  });

  it('should set variant to "optional" when specified', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-alert-sign-in variant="${VariantNames.signInOptional}"></va-alert-sign-in>`,
    );

    const element = await page.find('va-alert-sign-in >>> .usa-alert');

    expect(
      element.classList.contains(
        `va-alert-sign-in--${VariantNames.signInOptional}`,
      ),
    ).toBeTruthy();
  });

  it('should set variant to "either" when specified', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-alert-sign-in variant="${VariantNames.signInEither}"></va-alert-sign-in>`,
    );

    const element = await page.find('va-alert-sign-in >>> .usa-alert');

    expect(
      element.classList.contains(
        `va-alert-sign-in--${VariantNames.signInEither}`,
      ),
    ).toBeTruthy();
  });

  it('should set variant to "Verify with ID.me" when specified', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-alert-sign-in variant="${VariantNames.verifyIdMe}"></va-alert-sign-in>`,
    );

    const element = await page.find('va-alert-sign-in >>> .usa-alert');

    expect(
      element.classList.contains(
        `va-alert-sign-in--${VariantNames.verifyIdMe}`,
      ),
    ).toBeTruthy();
  });

  it('should set variant to "Verify with Login.gov" when specified', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<va-alert-sign-in variant="${VariantNames.verifyLoginGov}"></va-alert-sign-in>`,
    );

    const element = await page.find('va-alert-sign-in >>> .usa-alert');

    expect(
      element.classList.contains(
        `va-alert-sign-in--${VariantNames.verifyLoginGov}`,
      ),
    ).toBeTruthy();
  });

  it('should default the heading level to H2', async () => {
    const page = await newE2EPage();
    await page.setContent('<va-alert-sign-in></va-alert-sign-in>');

    const element = await page.find('va-alert-sign-in >>> h2');

    expect(element).not.toBeNull();
  });

  it('should set the heading level if provided', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<va-alert-sign-in heading-level="3"></va-alert-sign-in>',
    );

    const element = await page.find('va-alert-sign-in >>> h3');

    expect(element).not.toBeNull();
  });
});
