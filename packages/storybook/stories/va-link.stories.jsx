import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const linkDocs = getWebComponentDocs('va-link');

export default {
  title: 'Components/va-link',
  parameters: {
    componentSubtitle: `Link web component`,
    docs: {
      page: () => <StoryDocs data={linkDocs} />,
    },
  },
};

const defaultArgs = {
  'abbr-title': undefined,
  'active': undefined,
  'channel': undefined,
  'disable-analytics': undefined,
  'download': undefined,
  'href': 'https://www.va.gov',
  'filename': undefined,
  'filetype': undefined,
  'pages': undefined,
  'text': undefined,
  'video': undefined,
};

const Template = ({
  'abbr-title': abbrTitle,
  active,
  channel,
  'disable-analytics': disableAnalytics,
  download,
  href,
  filename,
  filetype,
  pages,
  text,
  video,
}) => {
  return (
    <va-link
      abbr-title={abbrTitle}
      active={active}
      channel={channel}
      disable-analytics={disableAnalytics}
      download={download}
      href={href}
      filename={filename}
      filetype={filetype}
      pages={pages}
      text={text}
      video={video}
    />
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
  text: 'Find out if you qualify for this program and how to apply',
};
Default.argTypes = propStructure(linkDocs);

export const Active = Template.bind(null);
Active.args = {
  ...defaultArgs,
  active: true,
  text: 'Share your VA medical records',
};

export const Download = Template.bind(null);
Download.args = {
  ...defaultArgs,
  download: true,
  text: 'Download VA form 10-10EZ',
  filetype: 'PDF',
  pages: 5,
};

export const Video = Template.bind(null);
Video.args = {
  ...defaultArgs,
  video: true,
  text: 'Go to the video about VA disability compensation',
};

export const Channel = Template.bind(null);
Channel.args = {
  ...defaultArgs,
  channel: true,
  text: `Veteran's Affairs`,
};
