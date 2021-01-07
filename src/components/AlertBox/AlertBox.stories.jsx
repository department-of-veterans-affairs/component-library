import React from 'react';

import AlertBox, { ALERT_TYPE } from './AlertBox';

export default {
  title: 'Components/AlertBox',
  component: AlertBox,
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: Object.values(ALERT_TYPE),
      },
    },
    content: { control: 'text' },
    headline: { control: 'text' },
    level: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6],
      },
    },
  },
};

const Template = (args) => <AlertBox {...args} />;

const defaultArgs = {
  status: ALERT_TYPE.INFO,
  // isVisible: true,
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  headline: 'Alert title',
  // closeBtnAriaLabel: undefined,
  // onCloseAlert: undefined,
  // scrollOnShow: undefined,
  // scrollPosition: undefined,
  // className: undefined,
  // backgroundOnly: undefined,
  // level: 1,
};

/**
 * Use this for informational purposes.
 */
export const Info = Template.bind({});
Info.args = {
  ...defaultArgs,
  status: ALERT_TYPE.INFO,
};

/**
 * Huzzah! Your action completed successfully!
 */
export const Continue = Template.bind({});
Continue.args = {
  ...defaultArgs,
  status: ALERT_TYPE.CONTINUE,
};

export const Success = Template.bind({});
Success.args = {
  ...defaultArgs,
  status: ALERT_TYPE.SUCCESS,
};

export const Warning = Template.bind({});
Warning.args = {
  ...defaultArgs,
  status: ALERT_TYPE.WARNING,
};

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  status: ALERT_TYPE.ERROR,
};

export const BackgroundOnly = Template.bind({});
BackgroundOnly.args = {
  ...defaultArgs,
  backgroundOnly: true,
};
