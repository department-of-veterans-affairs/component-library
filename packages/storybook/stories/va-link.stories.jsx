import React, { Fragment } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const linkDocs = getWebComponentDocs('va-link');

export default {
  title: 'V1 Components/Link',
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
  href: 'data:text/calendar;charset=utf-8,BEGIN%3AVCALENDAR%0D%0AVERSION%3A2.0%0D%0APRODID%3AVA%0D%0ABEGIN%3AVEVENT%0D%0AUID%3A1398DD3C-3572-40FD-84F6-BB6F97C79D67%0D%0ASUMMARY%3AAppointment%20at%20Cheyenne%20VA%20Medical%20Center%0D%0ADESCRIPTION%3AYou%20have%20a%20health%20care%20appointment%20at%20Cheyenne%20VA%20Medical%20Cent%0D%0A%09er%0D%0A%09%5Cn%5Cn2360%20East%20Pershing%20Boulevard%5Cn%0D%0A%09Cheyenne%5C%2C%20WY%2082001-5356%5Cn%0D%0A%09307-778-7550%5Cn%0D%0A%09%5CnSign%20in%20to%20https%3A%2F%2Fva.gov%2Fhealth-care%2Fschedule-view-va-appointments%2Fappo%0D%0A%09intments%20to%20get%20details%20about%20this%20appointment%5Cn%0D%0ALOCATION%3A2360%20East%20Pershing%20Boulevard%5C%2C%20Cheyenne%5C%2C%20WY%2082001-5356%0D%0ADTSTAMP%3A20221222T021934Z%0D%0ADTSTART%3A20221222T021934Z%0D%0ADTEND%3A20221222T024934Z%0D%0AEND%3AVEVENT%0D%0AEND%3AVCALENDAR',
  text: `Add to calendar`,
};
