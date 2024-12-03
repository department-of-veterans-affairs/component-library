import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
} from '@stencil/core';
import classnames from 'classnames';
import { VariantNames } from './VariantNames';

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
   * Determines the text content and border/background color.
   */
  @Prop() variant: VariantNames = VariantNames.signInRequired;

  /**
   * If `true`, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics?: boolean = false;

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
   * Fires when the component has successfully finished rendering for the first
   * time.
   */
  @Event({
    eventName: 'va-component-did-load',
    composed: true,
    bubbles: true,
  })
  vaComponentDidLoad: EventEmitter;

  /**
   * The event used to track usage of the component. This is emitted when an
   * anchor link is clicked and disableAnalytics is not true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private handleAlertBodyClick(e: MouseEvent): void {
    if (!this.disableAnalytics) {
      const target = e.target as HTMLElement;

      // If it's a link being clicked, dispatch an analytics event
      if (target?.tagName === 'VA-LINK') {
        const innerText = target.shadowRoot.querySelector('a').innerText;
        const detail = {
          componentName: 'va-alert-sign-in',
          action: 'linkClick',
          details: {
            clickLabel: innerText,
            variant: this.variant,
          },
        };
        this.componentLibraryAnalytics.emit(detail);
      }
    }
  }

  componentDidLoad() {
    this.vaComponentDidLoad.emit();
  }

  render() {
    const { visible } = this;
    let { variant } = this;

    // Check that the provided variant (or null) matches a known variant name
    if (!Object.values(VariantNames).includes(variant))
      variant = VariantNames.signInRequired;

    if (!visible) return <div aria-live="polite" />;

    const classes = classnames('usa-alert', `va-alert-sign-in--${variant}`, {
      'usa-alert--info':
        variant === VariantNames.signInRequired ||
        variant === VariantNames.signInOptional,
      'usa-alert--warning':
        variant !== VariantNames.signInRequired &&
        variant !== VariantNames.signInOptional,
    });

    /* eslint-disable i18next/no-literal-string */
    const RequiredVariant = () => (
      <div class="va-alert-sign-in__body">
        <h2 class="headline">Sign in with a verified account</h2>
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
            href=""
            text="Learn about creating an account"
            disableAnalytics={true}
          ></va-link>
        </p>
      </div>
    );

    const OptionalVariant = () => (
      <div class="va-alert-sign-in__body">
        <h2 class="headline">Sign in with a verified account</h2>
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
        <h2 class="headline">Verify your identity</h2>
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
            href=""
            text="Learn more about verifying your identity"
            disableAnalytics={true}
          ></va-link>
        </p>
      </div>
    );

    const LoginGovVariant = () => (
      <div class="va-alert-sign-in__body">
        <h2 class="headline">Verify your identity</h2>
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
            href=""
            text="Learn more about verifying your identity"
            disableAnalytics={true}
          ></va-link>
        </p>
      </div>
    );

    const SignInEitherVariant = () => (
      <div class="va-alert-sign-in__body">
        <h2 class="headline">You need to sign in with a different account</h2>
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
            href=""
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
            onClick={this.handleAlertBodyClick.bind(this)}
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
