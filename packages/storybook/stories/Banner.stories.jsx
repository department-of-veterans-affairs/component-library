import React from 'react';
import {Banner} from '@department-of-veterans-affairs/component-library';

export default {
  title: 'Components/Banners/Banner',
  component: Banner,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['error', 'undefined'],
      },
    },
  },
};

const Template = args => <Banner {...args} />;

const defaultArgs = {
  visible: true,
  title: 'Coronavirus',
  storage: { getItem: () => {}, setItem: () => {} },
  content: `<div>
      <p>
        For questions about COVID-19 and how it affects VA health care and
        benefit services, visit our
        <a href="/coronavirus-veteran-frequently-asked-questions/">
          coronavirus FAQs
        </a>
        or read
        <a href="https://www.publichealth.va.gov/n-coronavirus/">
          VA’s public health response
        </a>
        .
      </p>
      <p>
        Please contact us first before going to any
        <a href="/find-locations">VA location</a>. Contacting us first helps us
        keep you safe.
      </p>
      <p>
        For the latest coronavirus information, visit the
        <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">
          CDC website
        </a>
        .
      </p>
    </div>`,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  type: 'error',
};

export const Closeable = Template.bind({});
Closeable.args = {
  ...defaultArgs,
  type: 'error',
  showClose: true,
};
