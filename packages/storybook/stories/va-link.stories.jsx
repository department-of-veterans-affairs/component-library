import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { VaLink } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

const linkDocs = getWebComponentDocs('va-link');

export default {
  title: 'Components/Link',
  id: 'components/va-link',
  parameters: {
    componentSubtitle: 'va-link web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={linkDocs} />,
    },
  },
};

const defaultArgs = {
  'abbr-title': undefined,
  'active': undefined,
  'back': undefined,
  'calendar': undefined,
  'channel': undefined,
  'disable-analytics': undefined,
  'download': undefined,
  'href': 'https://www.va.gov',
  'filename': undefined,
  'filetype': undefined,
  'pages': undefined,
  'reverse': undefined,
  'external': undefined,
  'text': undefined,
  'video': undefined,
  'label': undefined,
  'icon-name': undefined,
  'icon-size': undefined,
};

const Template = ({
  'abbr-title': abbrTitle,
  active,
  back,
  calendar,
  channel,
  'disable-analytics': disableAnalytics,
  download,
  href,
  filename,
  filetype,
  pages,
  reverse,
  text,
  video,
  label,
}) => {
  return (
    <p>
      If you need help to gather your information or fill out your
      application/form,{' '}
      <va-link
        abbr-title={abbrTitle}
        active={active}
        back={back}
        calendar={calendar}
        channel={channel}
        disable-analytics={disableAnalytics}
        download={download}
        href={href}
        filename={filename}
        filetype={filetype}
        pages={pages}
        reverse={reverse}
        text={text}
        video={video}
        label={label}
      />
    </p>
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
  back,
  calendar,
  channel,
  'disable-analytics': disableAnalytics,
  download,
  href,
  filename,
  filetype,
  pages,
  reverse,
  text,
  external,
  video,
  label,
  'icon-name': iconName,
  'icon-size': iconSize,
}) => {
  return (
    <p>
      <va-link
        abbr-title={abbrTitle}
        active={active}
        back={back}
        calendar={calendar}
        channel={channel}
        disable-analytics={disableAnalytics}
        download={download}
        href={href}
        filename={filename}
        filetype={filetype}
        pages={pages}
        reverse={reverse}
        text={text}
        external={external}
        video={video}
        label={label}
        icon-name={iconName}
        icon-size={iconSize}
      />
    </p>
  );
};

export const Active = VariantTemplate.bind(null);
Active.args = {
  ...defaultArgs,
  active: true,
  text: 'Share your VA medical records',
};

export const Back = VariantTemplate.bind(null);
Back.args = {
  ...defaultArgs,
  back: true,
  text: 'Back to previous page',
};

export const Calendar = VariantTemplate.bind(null);
Calendar.args = {
  ...defaultArgs,
  calendar: true,
  href: 'data:text/calendar;charset=utf-8,BEGIN%3AVCALENDAR%0D%0AVERSION%3A2.0%0D%0APRODID%3AVA%0D%0ABEGIN%3AVEVENT%0D%0AUID%3A1398DD3C-3572-40FD-84F6-BB6F97C79D67%0D%0ASUMMARY%3AAppointment%20at%20Cheyenne%20VA%20Medical%20Center%0D%0ADESCRIPTION%3AYou%20have%20a%20health%20care%20appointment%20at%20Cheyenne%20VA%20Medical%20Cent%0D%0A%09er%0D%0A%09%5Cn%5Cn2360%20East%20Pershing%20Boulevard%5Cn%0D%0A%09Cheyenne%5C%2C%20WY%2082001-5356%5Cn%0D%0A%09307-778-7550%5Cn%0D%0A%09%5CnSign%20in%20to%20https%3A%2F%2Fva.gov%2Fhealth-care%2Fschedule-view-va-appointments%2Fappo%0D%0A%09intments%20to%20get%20details%20about%20this%20appointment%5Cn%0D%0ALOCATION%3A2360%20East%20Pershing%20Boulevard%5C%2C%20Cheyenne%5C%2C%20WY%2082001-5356%0D%0ADTSTAMP%3A20221222T021934Z%0D%0ADTSTART%3A20221222T021934Z%0D%0ADTEND%3A20221222T024934Z%0D%0AEND%3AVEVENT%0D%0AEND%3AVCALENDAR',
  text: `Add to calendar`,
};

export const Channel = VariantTemplate.bind(null);
Channel.args = {
  ...defaultArgs,
  channel: true,
  text: `Veteran's Affairs`,
};

export const Download = VariantTemplate.bind(null);
Download.args = {
  ...defaultArgs,
  download: true,
  text: 'Download VA form 10-10EZ',
  filetype: 'PDF',
  pages: 5,
};

export const External = VariantTemplate.bind(null);
External.args = {
  ...defaultArgs,
  external: true,
  text: `Leave VA.gov`,
  href: 'https://design.va.gov/content-style-guide/links#linking-to-external-sites',
};

export const Icon = VariantTemplate.bind(null);
Icon.args = {
  ...defaultArgs,
  'href': '#',
  'text': `National Cemetery Administration`,
  'icon-name': 'mail',
  'icon-size': 3,
};

export const Video = VariantTemplate.bind(null);
Video.args = {
  ...defaultArgs,
  video: true,
  text: 'Go to the video about VA disability compensation',
};

const ReverseTemplate = ({ filename, filetype, href, reverse, text }) => {
  return (
    <div
      className="vads-u-padding--4"
      style={{
        background:
          'linear-gradient(to left, var(--vads-color-primary) 30%, var(--vads-color-primary-dark) 60%, var(--vads-color-primary-darker))',
      }}
    >
      <h4 className="vads-u-color--white">Default Link</h4>
      <p>
        <va-link
          href={href}
          reverse={reverse}
          text="Contact a local Veterans Service Organization (VSO)"
        />
      </p>

      <h4 className="vads-u-color--white">Active Link</h4>
      <p>
        <va-link
          active={true}
          href={href}
          reverse={reverse}
          text="Share your VA medical records"
        />
      </p>

      <h4 className="vads-u-color--white">Back Link</h4>
      <p>
        <va-link
          back
          href={href}
          reverse={reverse}
          text="Back to previous page"
        />
      </p>

      <h4 className="vads-u-color--white">Calendar Link</h4>
      <p>
        <va-link
          calendar
          href="data:text/calendar;charset=utf-8,BEGIN%3AVCALENDAR%0D%0AVERSION%3A2.0%0D%0APRODID%3AVA%0D%0ABEGIN%3AVEVENT%0D%0AUID%3A1398DD3C-3572-40FD-84F6-BB6F97C79D67%0D%0ASUMMARY%3AAppointment%20at%20Cheyenne%20VA%20Medical%20Center%0D%0ADESCRIPTION%3AYou%20have%20a%20health%20care%20appointment%20at%20Cheyenne%20VA%20Medical%20Cent%0D%0A%09er%0D%0A%09%5Cn%5Cn2360%20East%20Pershing%20Boulevard%5Cn%0D%0A%09Cheyenne%5C%2C%20WY%2082001-5356%5Cn%0D%0A%09307-778-7550%5Cn%0D%0A%09%5CnSign%20in%20to%20https%3A%2F%2Fva.gov%2Fhealth-care%2Fschedule-view-va-appointments%2Fappo%0D%0A%09intments%20to%20get%20details%20about%20this%20appointment%5Cn%0D%0ALOCATION%3A2360%20East%20Pershing%20Boulevard%5C%2C%20Cheyenne%5C%2C%20WY%2082001-5356%0D%0ADTSTAMP%3A20221222T021934Z%0D%0ADTSTART%3A20221222T021934Z%0D%0ADTEND%3A20221222T024934Z%0D%0AEND%3AVEVENT%0D%0AEND%3AVCALENDAR"
          text="Add to calendar"
          reverse
        />
      </p>

      <h4 className="vads-u-color--white">Channel Link</h4>
      <p>
        <va-link
          channel
          href="https://www.va.gov"
          text="Veteran's Affairs"
          reverse
        />
      </p>

      <h4 className="vads-u-color--white">Download Link</h4>
      <p>
        <va-link
          download
          filetype="PDF"
          href="https://www.va.gov"
          pages={5}
          reverse
          text="Download VA form 10-10EZ"
        />
      </p>

      <h4 className="vads-u-color--white">External</h4>
      <p>
        <va-link
          external
          href="https://design.va.gov/content-style-guide/links#linking-to-external-sites"
          text="Leave VA.gov"
          reverse
        />
      </p>

      <h4 className="vads-u-color--white">Icon</h4>
      <p>
        <va-link
          href={href}
          reverse={reverse}
          text="National Cemetery Administration"
          icon-name="mail"
        />
      </p>

      <h4 className="vads-u-color--white">Video Link</h4>
      <p>
        <va-link
          href="https://www.va.gov"
          text="Go to the video about VA disability compensation"
          video
          reverse
        />
      </p>
    </div>
  );
};

export const Reverse = ReverseTemplate.bind(null);
Reverse.args = {
  ...defaultArgs,
  href: 'https://va.gov/',
  text: 'Example Link',
  reverse: true,
};

const WithRouterTemplate = ({
  href: href,
  text: text
}) => {
  return (
    <>
    <p>The <code>va-link</code> web component can be used with a routing framework like react-router using 
    the native <code>click</code> event like in the following example:
    </p>
    <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2">
        <code>
import React from 'react';<br/>
import &#x7b; withRouter &#x7d; from 'react-router';<br/>
import &#x7b; useHistory &#x7d; from 'react-router-dom';<br/>
import &#x7b; VaLink &#x7d; from '@department-of-veterans-affairs/component-library/dist/react-bindings';<br/>
<br/>
const YourComponent &#61; (&#x7b; href, text, router &#x7d;) &#61;&#62;  &#x7b;<br/>
<br/>
&nbsp;function handleRouteChange(event) &#x7b;<br/>
&nbsp;&nbsp;&nbsp;event.preventDefault&#x28;&#x29;;<br/>
&nbsp;&nbsp;&nbsp;history.push(href);<br/>
&nbsp;&#x7d;<br/>
<br/>
  &nbsp;return (<br/>
  &nbsp;&nbsp;&nbsp;&#60;VaLink<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;href=&#x7b;href&#x7d;<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;text=&#x7b;text&#x7d;<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;onClick=&#x7b;handleRouteChange&#x7d;<br/>
  &nbsp;&nbsp;&nbsp;/&#62;<br/>
  &nbsp;);<br/>
&#x7d;;
<br/>
<br/>
export default withRouter(YourComponent);

        </code>
      </pre>
    <p>If you need help to gather your information or fill out your
      application/form,{' '}
      <VaLink
        href={href}
        text={text}
        onClick={(e) => {
          e.preventDefault();
          console.log('Router link clicked');
        }}
      />
    </p>
    </>
  );
};

export const WithRouterLinkSupport = WithRouterTemplate.bind(null);
WithRouterLinkSupport.args = {
  ...defaultArgs,
  href: 'https://va.gov/',
  text: 'example router link'
};
