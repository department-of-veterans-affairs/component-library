import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { AlertSignInVariants as ASIVariants } from '@department-of-veterans-affairs/web-components/src/components/va-alert-sign-in/AlertSignInVariants';

const alertSignInDocs = getWebComponentDocs('va-alert-sign-in');

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

const SignInButton = () => <button>Sign In Button goes here</button>;
const IdMeSignInButton = () => (
  <button>Sign In with ID.me Button goes here</button>
);
const IdMeVerifyButton = () => (
  <button>Verify with ID.me Button goes here</button>
);
const LoginGovSignInButton = () => (
  <button>Sign In with Login.gov Button goes here</button>
);
const LoginGovVerifyButton = () => (
  <button>Verify with Login.gov Button goes here</button>
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
