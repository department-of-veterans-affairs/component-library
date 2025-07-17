import { useState } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const loaderDocs = getWebComponentDocs('va-loader');

export default {
  title: 'Components/Loader',
  id: 'components/va-loader',
  parameters: {
    componentSubtitle: 'va-loader web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={loaderDocs} />,
    },
  },
};

const defaultArgs = {
  'center-label': 'Loading',
  'loader-role': 'status',
  'aria-live-region': 'polite',
  'busy': 'true',
  'align-left': '0px',
  'align-top': '0px',
};

const Template = ({
  'center-label': centerLabel,
  'loader-role': loaderRole,
  'aria-live-region': ariaLiveRegion,
  'busy': busy,
  'align-left': alignLeft,
  'align-top': alignTop,
}) => {
  return (
    <div>
      <va-loader
        center-label={centerLabel}
        loader-role={loaderRole}
        aria-live-region={ariaLiveRegion}
        busy={busy}
        align-left={alignLeft}
        align-top={alignTop}
      ></va-loader>
    </div>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(loaderDocs);

export const AccessibleLoader = Template.bind(null);
AccessibleLoader.args = { ...defaultArgs, 'aria-live-region': 'assertive' };

export const CustomPositionLoader = Template.bind(null);
CustomPositionLoader.args = {
  ...defaultArgs,
  'center-label': 'Calculating',
  'align-left': '-13px',
  'align-top': '0px',
};
