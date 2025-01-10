import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { AlertSignInVariants as ASIVariants } from '@department-of-veterans-affairs/web-components/src/components/va-alert-sign-in/AlertSignInVariants';

const alertSignInDocs = getWebComponentDocs('va-alert-sign-in');

const buttonStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
};

const svgStyles = {
  height: '1em',
};

const IdMeLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-labelledby="idme-title"
    viewBox="0 0 30 12"
    style={svgStyles}
  >
    <path
      fill="#FFF"
      d="M1.5 0H1C.3 0 0 .2 0 .7v10c0 .5.3.7 1 .7h.5c.6 0 1-.2 1-.6V.7c0-.5-.4-.7-1-.7m6.2 9.1H6V2.3h1.6c1.9 0 2.3 1.9 2.3 3.4s-.4 3.4-2.3 3.4zm2.9 1c0-1.2.7-2.2 1.7-2.5l.2-1.9c0-3.6-1.7-5.7-4.8-5.7H4.4c-.5 0-.7.3-.7.8v9.9c0 .5.2.7.7.7h3.3c1.2 0 2.1-.3 2.9-.9v-.3z"
    />
    <path
      fill="#2EC777"
      d="M14.2 10.2c0 .6-.5 1.2-1.1 1.2-.6 0-1.2-.6-1.2-1.2 0-.7.6-1.3 1.2-1.3s1.1.6 1.1 1.3"
    />
    <path
      fill="#FFF"
      d="M27.3 6a1.3 1.3 0 0 1 0 .2l-.1.5c-.3.8-1 1-1.6 1 0-.4.2-.7.4-1 .3-.7.6-1.1 1-1.1h.1v.1h.1V6zm2.1 2.4c-.2 0-.3 0-.4.2l-.2.3a4 4 0 0 1-.7 1c-.5.5-1 .6-1.6.5-.3 0-.5-.3-.7-.5-.2-.3-.3-.8-.3-1.4.8 0 3.1-.4 3.3-2.3 0-.4 0-.7-.3-1-.3-.3-.7-.5-1.2-.5-1.6 0-3.2 1.8-3.3 3.8-.1.5 0 1 .1 1.5l-.3.3h-.4l-.1-.3V8.8l.3-.8c.2-.7.3-1.4.3-2.2 0-.7-.5-1.1-1.2-1.1-1 0-1.6.7-2 1.3 0-.4 0-.8-.3-1-.2-.2-.4-.3-.8-.3-1 0-1.5.7-2 1.3l.1-.2c0-.3 0-.6-.2-.9 0 0-.2-.2-.5-.2a2 2 0 0 0-.4 0l-.3.2c-.2.1-.1.3 0 .4v.4c0 .8-.2 1.5-.3 2.1l-.2 1a22.6 22.6 0 0 0-.4 2.5h.2c.6.1 1 0 1.2-.2l.2-1.2v-.1l.6-2.3c.1-.4.4-.7.6-1 .2-.3.5-.6.8-.7.1 0 .2 0 .3.2.2.4-.1 1.7-.3 2.3v.3l-.2.4-.4 2a7.7 7.7 0 0 0 0 .2v.1c.2.2 1.1 0 1.2 0 .3-.1.4-.5.4-.6l.2-.9.3-1.7c.4-1 .8-1.8 1.3-2.1.2-.2.4-.2.5 0 .2.2 0 .8 0 1l-.2 1.2-.2.7c-.1.7-.2 1.6.1 2.1.2.3.5.4 1 .4a2 2 0 0 0 1.2-.5l.3-.3c.5.6 1 .9 1.9.9 1.7 0 2.6-1.3 3-2.3l.2-.3c0-.2 0-.4-.2-.5z"
    />
  </svg>
);

const LoginGovLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-labelledby="logingov-title"
    viewBox="0 0 114 15"
    style={svgStyles}
  >
    <g fill="#fff" clipPath="url(#a)">
      <path d="M10.4 0H1.7C.7 0 0 .7 0 1.6v8.1a1 1 0 0 0 .1.5c.4.7 1.8 3 6 4.8 4-1.8 5.5-4.1 5.9-4.8a1 1 0 0 0 0-.5v-8c0-.5-.1-1-.4-1.2a1.7 1.7 0 0 0-1.2-.5ZM7.7 9.6a9.8 9.8 0 0 1-3.3 0L5 6.5a1.6 1.6 0 0 1-.7-1.3 1.7 1.7 0 0 1 1.3-1.7 1.7 1.7 0 0 1 2 1 1.6 1.6 0 0 1-.5 2l.6 3.1Z" />
      <path
        fillRule="evenodd"
        d="M19.8 2.2h-2.4v10.6h7v-2.1h-4.6V2.2Z"
        clipRule="evenodd"
      />
      <path d="M32 2.1c-3.3 0-5.8 2.3-5.8 5.4 0 3 2.5 5.4 5.8 5.4s5.7-2.4 5.7-5.4c0-3-2.4-5.4-5.7-5.4Zm0 8.7a3.3 3.3 0 0 1-3.3-3.3 3.2 3.2 0 0 1 1-2.3 3.4 3.4 0 0 1 2.3-1 3.3 3.3 0 0 1 2.3 1c.6.6 1 1.4 1 2.3 0 .9-.4 1.7-1 2.3a3.3 3.3 0 0 1-2.3 1Z" />
      <path
        fillRule="evenodd"
        d="M46 4.2a4.6 4.6 0 0 1 2.9 1.2l1.4-1.7A6.9 6.9 0 0 0 45.9 2c-3.3 0-5.8 2.3-5.8 5.4 0 3 2.4 5.4 5.7 5.4a8.1 8.1 0 0 0 4.4-1.4V7h-4v1.8H48v1.4a5 5 0 0 1-2.1.6 3.4 3.4 0 0 1-3-1.6 3.2 3.2 0 0 1 0-3.4 3.4 3.4 0 0 1 3-1.6Z"
        clipRule="evenodd"
      />
      <path d="M56.1 2.2h-2.4v10.6H56V2.2Z" />
      <path
        fillRule="evenodd"
        d="m67.3 9-5.2-6.8h-2.2v10.6h2.3V6l5.2 6.8h2.2V2.2h-2.3V9Zm7 1a1.4 1.4 0 0 0-1 .5c-.3.2-.5.6-.5 1 0 .5.3 1 .7 1.2.4.2 1 .2 1.4 0 .4-.3.7-.7.7-1.2a1.3 1.3 0 0 0-.4-1 1.3 1.3 0 0 0-1-.4Zm9-5.8a4.6 4.6 0 0 1 3 1.2l1.4-1.7A6.9 6.9 0 0 0 83.3 2c-3.3 0-5.8 2.3-5.8 5.4 0 3 2.4 5.4 5.7 5.4a8.1 8.1 0 0 0 4.4-1.4V7h-4v1.8h1.9v1.4a5 5 0 0 1-2.1.6 3.4 3.4 0 0 1-3-1.6 3.2 3.2 0 0 1 0-3.4 3.4 3.4 0 0 1 3-1.6Z"
        clipRule="evenodd"
      />
      <path d="M96 2.1c-3.2 0-5.7 2.3-5.7 5.4 0 3 2.5 5.4 5.8 5.4s5.8-2.4 5.8-5.4c0-3-2.5-5.4-5.8-5.4Zm.1 8.7a3.3 3.3 0 0 1-3.3-3.3 3.2 3.2 0 0 1 1-2.3 3.4 3.4 0 0 1 2.3-1c.9 0 1.7.4 2.3 1 .6.6 1 1.4 1 2.3a3.2 3.2 0 0 1-1 2.3 3.3 3.3 0 0 1-2.3 1Z" />
      <path
        fillRule="evenodd"
        d="m111.5 2.2-3 8-3-8H103l4.2 10.6h2.5L114 2.2h-2.5Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h114v15H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default {
  title: 'Components/Alert - Sign-in',
  id: 'components/va-alert-sign-in',
  parameters: {
    componentSubtitle: 'va-alert-sign-in web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={alertSignInDocs} />,
    },
  },
};

const defaultArgs = {
  'variant': ASIVariants.signInRequired,
  'disable-analytics': true,
  'visible': true,
  'time-limit': null,
  'no-sign-in-link': null,
  'heading-level': null,
};

const SignInButton = () => (
  <a href="#">
    <va-button text="Sign in or create an account" />
  </a>
);
const IdMeSignInButton = () => (
  <button
    style={{
      ...buttonStyles,
      backgroundColor: 'var(--vads-color-success-dark)',
    }}
  >
    Sign in with <IdMeLogo />
  </button>
);
const IdMeVerifyButton = () => (
  <button
    style={{
      ...buttonStyles,
      backgroundColor: 'var(--vads-color-success-dark)',
    }}
  >
    Verify with <IdMeLogo />
  </button>
);
const LoginGovSignInButton = () => (
  <button
    style={{
      ...buttonStyles,
      backgroundColor: 'var(--vads-color-secondary)',
    }}
  >
    Sign in with <LoginGovLogo />
  </button>
);
const LoginGovVerifyButton = () => (
  <button
    style={{
      ...buttonStyles,
      backgroundColor: 'var(--vads-color-secondary)',
    }}
  >
    Verify with <LoginGovLogo />
  </button>
);

const SlotVariants = {
  [ASIVariants.signInRequired]: {
    slotNames: ['SignInButton'],
    buttons: [SignInButton],
  },
  [ASIVariants.signInOptional]: {
    slotNames: ['SignInButton'],
    buttons: [SignInButton],
  },
  [ASIVariants.signInEither]: {
    slotNames: ['LoginGovSignInButton', 'IdMeSignInButton'],
    buttons: [LoginGovSignInButton, IdMeSignInButton],
  },
  [ASIVariants.verifyIdMe]: {
    slotNames: ['IdMeVerifyButton'],
    buttons: [IdMeVerifyButton],
  },
  [ASIVariants.verifyLoginGov]: {
    slotNames: ['LoginGovVerifyButton'],
    buttons: [LoginGovVerifyButton],
  },
};

const Template = ({
  variant,
  'disable-analytics': disableAnalytics,
  visible,
  'time-limit': timeLimit,
  'no-sign-in-link': noSignInLink,
  'heading-level': headingLevel,
}) => {
  return (
    <va-alert-sign-in
      variant={variant}
      disable-analytics={disableAnalytics}
      visible={visible}
      time-limit={timeLimit}
      no-sign-in-link={noSignInLink}
      heading-level={headingLevel}
    >
      {SlotVariants[variant].slotNames.map((name, i) => {
        const ButtonToRender = SlotVariants[variant].buttons[i];
        return (
          <span key={i} slot={name}>
            <ButtonToRender></ButtonToRender>
          </span>
        );
      })}
    </va-alert-sign-in>
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(alertSignInDocs);

export const WithCustomHeadingLevel = Template.bind(null);
WithCustomHeadingLevel.args = {
  ...defaultArgs,
  'heading-level': 3,
};

export const RequiredSignInVerified = Template.bind(null);
RequiredSignInVerified.args = {
  ...defaultArgs,
  variant: ASIVariants.signInRequired,
};

export const OptionalSignInVerified = Template.bind(null);
OptionalSignInVerified.args = {
  ...defaultArgs,
  'variant': ASIVariants.signInOptional,
  'no-sign-in-link': 'https://example.com/',
  'time-limit': '20 minutes',
};

export const VerifyWithIdMe = Template.bind(null);
VerifyWithIdMe.args = {
  ...defaultArgs,
  variant: ASIVariants.verifyIdMe,
};

export const VerifyWithLoginGov = Template.bind(null);
VerifyWithLoginGov.args = {
  ...defaultArgs,
  variant: ASIVariants.verifyLoginGov,
};

export const SignInWithAnotherAccount = Template.bind(null);
SignInWithAnotherAccount.args = {
  ...defaultArgs,
  variant: ASIVariants.signInEither,
};
