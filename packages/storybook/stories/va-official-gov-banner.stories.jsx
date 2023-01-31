import React, { useState, useEffect } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const officialGovBannerDocs = getWebComponentDocs('va-official-gov-banner');

export default {
  title: 'Components/Banner - Official Gov',
  id: 'components/va-official-gov-banner',
  parameters: {
    componentSubtitle: `va-official-gov-banner web component`,
    docs: {
      page: () => <StoryDocs data={officialGovBannerDocs} />,
    },
  }
};

const defaultArgs = {
  'disable-analytics': false
};

const Template = ({
  'disable-analytics': disableAnalytics
}) => {
  return (
    <va-official-gov-banner 
      disable-analytics={disableAnalytics}>
    </va-official-gov-banner>
  );
};

const I18nTemplate = ({
  'disable-analytics': disableAnalytics,
}) => {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);
  return (
    <>
      <button onClick={e => setLang('es')}>Español</button>
      <button onClick={e => setLang('en')}>English</button>
      <div style={{marginTop: '20px'}}>
        <va-official-gov-banner 
          disable-analytics={disableAnalytics}>
        </va-official-gov-banner>
      </div>
    </>
  );
};


export const Default = Template.bind(null);
Default.argTypes = propStructure(officialGovBannerDocs);
Default.args = { ...defaultArgs };

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = { ...defaultArgs };