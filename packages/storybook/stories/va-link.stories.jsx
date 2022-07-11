import React, { Fragment } from 'react';
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
  active: undefined,
  channel: undefined,
  download: undefined,
  href: 'https://www.va.gov',
  filename: undefined,
  video: undefined,
};

const Template = ({ active, channel, download, href, filename, video }) => {
  return (
    <va-link
      active={active}
      channel={channel}
      download={download}
      href={href}
      filename={filename}
      video={video}
    >
      Find out if you qualify for this program and how to apply
    </va-link>
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(linkDocs);

const ActiveTemplate = ({
  active,
  channel,
  download,
  href,
  filename,
  video,
}) => {
  return (
    <va-link
      active={active}
      channel={channel}
      download={download}
      href={href}
      filename={filename}
      video={video}
    >
      Share your VA medical records
    </va-link>
  );
};

export const Active = ActiveTemplate.bind(null);
Active.args = {
  ...defaultArgs,
  active: true,
};

const DownloadTemplate = ({
  active,
  channel,
  download,
  href,
  filename,
  video,
}) => {
  return (
    <va-link
      active={active}
      channel={channel}
      download={download}
      href={href}
      filename={filename}
      video={video}
    >
      Download VA form 10-10EZ
      <dfn>
        (<abbr title="Portable Document Format">PDF</abbr>, 5 pages)
      </dfn>
    </va-link>
  );
};

export const Download = DownloadTemplate.bind(null);
Download.args = {
  ...defaultArgs,
  download: true,
};

const VideoTemplate = ({
  active,
  channel,
  download,
  href,
  filename,
  video,
}) => {
  return (
    <va-link
      active={active}
      channel={channel}
      download={download}
      href={href}
      filename={filename}
      video={video}
    >
      Go to the video about VA disability compensation <dfn>on YouTube</dfn>
    </va-link>
  );
};

export const Video = VideoTemplate.bind(null);
Video.args = {
  ...defaultArgs,
  video: true,
};

const ChannelTemplate = ({
  active,
  channel,
  download,
  href,
  filename,
  video,
}) => {
  return (
    <va-link
      active={active}
      channel={channel}
      download={download}
      href={href}
      filename={filename}
      video={video}
    >
      Veteran's Affairs <dfn>YouTube</dfn>
    </va-link>
  );
};

export const Channel = ChannelTemplate.bind(null);
Channel.args = {
  ...defaultArgs,
  channel: true,
};
