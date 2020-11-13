import React, { useState } from 'react';

import PromoBanner, { PROMO_BANNER_TYPES } from './PromoBanner';

export default {
  title: 'Library/Banners/PromoBanner',
  component: PromoBanner,
};

const Template = args => {
  const [showBanner, setShowBanner] = useState(true);
  const onClose = () => setShowBanner(false);
  return showBanner ? (
    <>
      <PromoBanner {...args} onClose={onClose} />
      <p>See the open banner on the bottom of the page.</p>
    </>
  ) : (
    <button onClick={() => setShowBanner(true)}>Show Banner</button>
  );
};

const defaultArgs = {
  type: PROMO_BANNER_TYPES.announcement,
  text: 'This is an announcement.',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const News = Template.bind({});
News.args = {
  ...defaultArgs,
  type: PROMO_BANNER_TYPES.news,
  text: 'Here is a bit of news.',
};

export const EmailSignup = Template.bind({});
EmailSignup.args = {
  ...defaultArgs,
  type: PROMO_BANNER_TYPES.emailSignup,
  text: 'Please sign up using your email',
};

export const WithLink = Template.bind({});
WithLink.args = {
  ...defaultArgs,
  text: "For more information, check out the VA's Design System website!",
  href: 'https://design.va.gov',
  target: '_blank',
};

export const CustomRender = Template.bind({});
CustomRender.args = {
  ...defaultArgs,
  render: () => (
    <>
      <h4>This is a custom rendered version</h4>
      <span>Some of the things you can do on VA.gov include</span>
      <ul>
        <li>Apply for disability benefits</li>
        <li>Find a VA location</li>
        <li>Compare your GI Bill benefits by school</li>
      </ul>
    </>
  ),
};
