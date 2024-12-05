import {
  Component,
  Element,
  // Event,
  // EventEmitter,
  Host,
  Prop,
  h,
} from '@stencil/core';
import classnames from 'classnames';
import { VariantNames } from './VariantNames';
import { getHeaderLevel } from '../../utils/utils';

/**
 * @componentName Alert - Sign In
 * @maturityCategory caution
 * @maturityLevel candidate
 */
@Component({
  tag: 'va-alert-sign-in',
  styleUrl: 'va-alert-sign-in.scss',
  shadow: true,
})
export class VaAlertSignIn {
  @Element() el!: any;

  /**
   * Determines the text content and border/background color. Must be one of "signInRequired", "signInOptional", "signInEither", "verifyIdMe", or "verifyLoginGov".
   */
  @Prop() variant?: string = VariantNames.signInRequired;

  /**
   * Header level for button wrapper. Must be between 1 and 6
   */
  @Prop() headingLevel?: number = 2;

  /**
   * If `true`, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics?: boolean = true;

  /**
   * If `true`, the alert will be visible.
   */
  @Prop() visible?: boolean = true;

  /**
   * For the 'optional' variant, how long the respondent has to submit their form
   */
  @Prop() timeLimit?: string = '15 minutes';

  /**
   * For the 'optional' variant, the link to the form to complete without signing in
   */
  @Prop() noSignInLink?: string;

  /**
   * The event used to track usage of the component. This is emitted when an
   * anchor link is clicked and disableAnalytics is not true.
   */
  // @Event({
  //   eventName: 'component-library-analytics',
  //   composed: true,
  //   bubbles: true,
  // })
  // componentLibraryAnalytics: EventEmitter;

  // private handleAlertBodyClick(e: MouseEvent): void {
  //   if (!this.disableAnalytics) {
  //     const target = e.target as HTMLElement;

  //     // If it's a link being clicked, dispatch an analytics event
  //     if (target?.tagName === 'VA-LINK') {
  //       const innerText = target.shadowRoot.querySelector('a').innerText;
  //       const detail = {
  //         componentName: 'va-alert-sign-in',
  //         action: 'linkClick',
  //         details: {
  //           clickLabel: innerText,
  //           variant: this.variant,
  //         },
  //       };
  //       this.componentLibraryAnalytics.emit(detail);
  //     }
  //   }
  // }

  render() {
    const { visible } = this;
    let { variant } = this;

    // Check that the provided variant (or null) matches a known variant name
    if (!Object.values(VariantNames).includes(variant as VariantNames))
      variant = VariantNames.signInRequired;

    // Return an empty div if visible is set to false
    if (!visible) return <div aria-live="polite" />;

    // Determine background and border colors
    const classes = classnames('usa-alert', `va-alert-sign-in--${variant}`, {
      'usa-alert--info':
        variant === VariantNames.signInRequired ||
        variant === VariantNames.signInOptional,
      'usa-alert--warning':
        variant !== VariantNames.signInRequired &&
        variant !== VariantNames.signInOptional,
    });

    // Create a header element
    const HeaderLevel = getHeaderLevel(this.headingLevel);

    /* eslint-disable i18next/no-literal-string */
    const RequiredVariant = () => (
      <div class="va-alert-sign-in__body">
        <HeaderLevel class="headline">
          Sign in with a verified account
        </HeaderLevel>
        <p>
          You'll need to sign in with an identity-verified account through one
          of our account providers. Identity verification helps us protect all
          Veterans' information and prevent scammers from stealing your
          benefits.
        </p>
        <p>
          <strong>Don't yet have a verified account?</strong> Create a{' '}
          <strong>Login.gov</strong> or <strong>ID.me</strong> account. We'll
          help you verify your identity for your account now.
        </p>
        <p>
          <strong>Not sure if your account is verified?</strong> Sign in here.
          If you still need to verify your identity, we'll help you do that now.
        </p>
        <p>
          <slot name="SignInButton"></slot>
        </p>
        <p>
          <va-link
            href="https://www.va.gov/resources/creating-an-account-for-vagov"
            text="Learn about creating an account"
            disableAnalytics={true}
          ></va-link>
        </p>
      </div>
    );

    const OptionalVariant = () => (
      <div class="va-alert-sign-in__body">
        <HeaderLevel class="headline">
          Sign in with a verified account
        </HeaderLevel>
        <p>
          Here's how signing in with an identity-verified account helps you:
        </p>
        <ul>
          <li>
            We can fill in some of your information for you to save you time.
          </li>
          <li>
            You can save your work in progress. You'll have {this.timeLimit}{' '}
            from when you start or make changes to submit your form.
          </li>
        </ul>
        <p>
          <strong>Don't yet have a verified account?</strong> Create a{' '}
          <strong>Login.gov</strong> or <strong>ID.me</strong> account. We'll
          help you verify your identity for your account now.
        </p>
        <p>
          <strong>Not sure if your account is verified?</strong> Sign in here.
          If you still need to verify your identity, we'll help you do that now.
        </p>
        <p>
          <strong>Note:</strong> You can sign in after you start filling out
          your form. But you'll lose any information you already filled in.
        </p>
        <p>
          <slot name="SignInButton"></slot>
        </p>
        <p>
          <va-link
            href={this.noSignInLink}
            text="Start your form without signing in"
            disableAnalytics={true}
          ></va-link>
        </p>
      </div>
    );

    const IdMeVariant = () => (
      <div class="va-alert-sign-in__body">
        <HeaderLevel class="headline">Verify your identity</HeaderLevel>
        <p>
          We need you to verify your identity for your <strong>ID.me</strong>{' '}
          account. This step helps us protect all Veterans' information and
          prevent scammers from stealing your benefits.
        </p>
        <p>
          This one-time process often takes about 10 minutes. You'll need to
          provide certain personal information and identification.
        </p>
        <p>
          <slot name="IdMeVerifyButton"></slot>
        </p>
        <p>
          <va-link
            href="https://www.va.gov/resources/creating-an-account-for-vagov"
            text="Learn more about verifying your identity"
            disableAnalytics={true}
          ></va-link>
        </p>
      </div>
    );

    const LoginGovVariant = () => (
      <div class="va-alert-sign-in__body">
        <HeaderLevel class="headline">Verify your identity</HeaderLevel>
        <p>
          We need you to verify your identity for your{' '}
          <strong>Login.gov</strong> account. This step helps us protect all
          Veterans' information and prevent scammers from stealing your
          benefits.
        </p>
        <p>
          This one-time process often takes about 10 minutes. You'll need to
          provide certain personal information and identification.
        </p>
        <p>
          <slot name="LoginGovVerifyButton"></slot>
        </p>
        <p>
          <va-link
            href="https://www.va.gov/resources/creating-an-account-for-vagov"
            text="Learn more about verifying your identity"
            disableAnalytics={true}
          ></va-link>
        </p>
      </div>
    );

    const SignInEitherVariant = () => (
      <div class="va-alert-sign-in__body">
        <HeaderLevel class="headline">
          You need to sign in with a different account
        </HeaderLevel>
        <p>
          We need you to sign in with an identity-verified account. This helps
          us protect all Veterans' information and prevent scammers from
          stealing your benefits. You have 2 options: a verified{' '}
          <strong>Login.gov</strong> or a verified <strong>ID.me</strong>{' '}
          account.
        </p>
        <p>
          <strong>If you already have a Login.gov or ID.me account,</strong>{' '}
          sign in with that account. If you still need to verify your identity
          for your account, we'll help you do that now.
        </p>
        <p>
          <strong>If you don't have a Login.gov or ID.me account,</strong>{' '}
          create one now. We'll help you verify your identity.
        </p>
        <p>
          <slot name="LoginGovSignInButton"></slot>
        </p>
        <p>
          <slot name="IdMeSignInButton"></slot>
        </p>
        <p>
          <va-link
            href="https://www.va.gov/resources/creating-an-account-for-vagov"
            text="Learn about creating an account"
            disableAnalytics={true}
          ></va-link>
        </p>
      </div>
    );

    /* eslint-enable i18next/no-literal-string */

    const BodyVariants = {
      [VariantNames.signInEither]: SignInEitherVariant,
      [VariantNames.signInOptional]: OptionalVariant,
      [VariantNames.signInRequired]: RequiredVariant,
      [VariantNames.verifyIdMe]: IdMeVariant,
      [VariantNames.verifyLoginGov]: LoginGovVariant,
    };
    const SignInBody = BodyVariants[variant];

    return (
      <Host>
        <div
          role={this.el.getAttribute('data-role')}
          class={classes}
          aria-label={this.el.getAttribute('data-label')}
        >
          <div
            class="usa-alert__body"
            // onClick={this.handleAlertBodyClick.bind(this)}
          >
            <div>
              <va-icon
                class="va-alert-sign-in__lock-icon"
                icon="lock"
                size={4}
              ></va-icon>
              <SignInBody></SignInBody>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
