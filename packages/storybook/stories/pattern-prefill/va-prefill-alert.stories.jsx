import React from 'react';
import { VaAlert } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from '../wc-helpers';

const alertDocs = getWebComponentDocs('va-alert');
// Remove backgroundOnly prop, this code and prop should be removed with the v1 version
alertDocs.props = alertDocs.props.filter(
  prop => prop.name !== 'backgroundOnly',
);

export default {
  title: 'Patterns/Prefill/Components/Prefill Alert',
  id: 'patterns/components/prefill-alert',
  argTypes: {
    headline: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    componentSubtitle: 'va prefill alert',
    docs: {
      page: () => (
        <StoryDocs storyDefault={SignedInPrefillAlert} data={alertDocs} />
      ),
    },
  },
};

// Fix for displaying component name when using bindings in 'Show code'
VaAlert.displayName = 'VaAlert';

const defaultArgs = {
  'slim': false,
  'status': 'info',
  headline: (
    <h3 slot="headline">
      We've prefilled some of your information
    </h3>
  ),
  'children': (
    <p className="vads-u-margin-y--0">
      Since you’re signed in, we can
      prefill part of your application based on your profile details. You can also save
      your application in progress and come back later to finish filling it out.
    </p>
  ),
};

const Template = ({
  slim,
  status,
  headline,
  children,
}) => {
  return (
    <va-alert
      slim={slim}
      status={status}
    >
      {headline}
      {children}
    </va-alert>
  );
};


export const SignedInPrefillAlert = Template.bind(null);
SignedInPrefillAlert.args = {
  ...defaultArgs,
};
SignedInPrefillAlert.argTypes = propStructure(alertDocs);

export const UnauthenticatedPrefillAlert = Template.bind(null);
UnauthenticatedPrefillAlert.args = {
  ...defaultArgs,
  headline: (
    <h2 slot="headline">
      Sign in now to save time and save your work in progress
    </h2>
  ),
  children: (
    <div>
      <p className="vads-u-margin-top--2">
        Here’s how signing in now helps you:
      </p>
      <ul>
        <li>
          We can fill in some of your information for you to save you time.
        </li>
        <li>
          You can save your work in progress. You’ll have 60 days from when you
          start or make updates to your application to come back and finish it.
        </li>
      </ul>
      <p>
        <strong>Note:</strong> You can sign in after you start your application.
        But you'll lose any information you already filled in.
      </p>
      <va-button text="Sign in to start your application" />
      <p>
        <va-link
          href="#start"
          text="Start your application without signing in"
        />
      </p>
    </div>
  ),
};

