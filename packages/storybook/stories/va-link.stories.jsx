import React, { Fragment } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const linkDocs = getWebComponentDocs('va-link');

export default {
  title: 'Components/Link',
  id: 'components/va-link',
  parameters: {
    componentSubtitle: `va-link web component`,
    docs: {
      page: () => <StoryDocs data={linkDocs} />,
    },
  },
};

const defaultArgs = {
  'abbr-title': undefined,
  'active': undefined,
  'calendar': undefined,
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
  calendar,
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
    <Fragment>
      If you need help to gather your information or fill out your
      application/form,{' '}
      <va-link
        abbr-title={abbrTitle}
        active={active}
        calendar={calendar}
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
    </Fragment>
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
  href: 'https://va.gov/vso/',
  text: 'contact a local Veterans Service Organization (VSO)',
};
Default.argTypes = propStructure(linkDocs);

const VariantTemplate = ({
  'abbr-title': abbrTitle,
  active,
  calendar,
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
      calendar={calendar}
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

export const Active = VariantTemplate.bind(null);
Active.args = {
  ...defaultArgs,
  active: true,
  text: 'Share your VA medical records',
};

export const Download = VariantTemplate.bind(null);
Download.args = {
  ...defaultArgs,
  download: true,
  text: 'Download VA form 10-10EZ',
  filetype: 'PDF',
  pages: 5,
};

export const Video = VariantTemplate.bind(null);
Video.args = {
  ...defaultArgs,
  video: true,
  text: 'Go to the video about VA disability compensation',
};

export const Channel = VariantTemplate.bind(null);
Channel.args = {
  ...defaultArgs,
  channel: true,
  text: `Veteran's Affairs`,
};

export const Calendar = VariantTemplate.bind(null);
Calendar.args = {
  ...defaultArgs,
  calendar: true,
};
