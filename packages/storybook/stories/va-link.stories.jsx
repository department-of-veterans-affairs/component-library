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
  href: undefined,
  filename: undefined,
  video: undefined,
};

const Template = ({
  active,
  channel,
  children,
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
      {children}
    </va-link>
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
  children: 'Find out if you qualify for this program and how to apply',
};
Default.argTypes = propStructure(linkDocs);

export const Active = Template.bind(null);
Active.args = {
  ...defaultArgs,
  active: true,
  children: 'Share your VA medical records',
};

export const Download = Template.bind(null);
Download.args = {
  ...defaultArgs,
  download: true,
  children: (
    <Fragment>
      Download VA form 10-10EZ
      <dfn>
        (<abbr title="Portable Document Format">PDF</abbr>, 5 pages)
      </dfn>
    </Fragment>
  ),
};

export const Video = Template.bind(null);
Video.args = {
  ...defaultArgs,
  video: true,
  children: (
    <Fragment>
      Go to the video about VA disability compensation <dfn>on YouTube</dfn>
    </Fragment>
  ),
};

export const Channel = Template.bind(null);
Channel.args = {
  ...defaultArgs,
  channel: true,
  children: (
    <Fragment>
      Veteran's Affairs <dfn>YouTube</dfn>
    </Fragment>
  ),
};
