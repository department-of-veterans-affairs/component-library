import React, { useState, Fragment } from 'react';
import { getWebComponentDocs, StoryDocs } from './wc-helpers';
import { VaLanguageToggle } from '@department-of-veterans-affairs/web-components/react-bindings';

const languageToggleDocs = getWebComponentDocs('va-language-toggle');

export default {
  title: 'Components/Language Toggle',
  id: 'components/va-language-toggle',
  parameters: {
    componentSubtitle: 'va-language-toggle web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={languageToggleDocs} />,
    },
  },
};

const defaultArgs = {
  urls: [
    { "href": "#en", "lang": "en", "label": "English" },
    { "href": "#es", "lang": "es", "label": "Español" },
    { "href": "#tl", "lang": "tl", "label": "Tagalog" }
  ],
  routerLinks: false
}

const Template = ({ urls }) => {
  const [lang, setLang] = useState('en');

  function handleLanguageToggle(e) {
    setLang(e.detail.language);
  }

  return (
    <VaLanguageToggle language={lang} urls={urls} onVaLanguageToggle={handleLanguageToggle} />
  );
};

const WithRouterLinksTemplate = ({ urls }) => {
  function handleLanguageToggle(e) {
    console.log(`the language has been toggled to ${e.detail.language}`);
  }

  return (
    <Fragment>
      <div>This example illustrates how to use the component with a router. When <code>router-links</code> is
        set to <code>true</code>, clicking on a link will not navigate to a new page (i.e. <code>event.preventDefault()</code> is called).
        By capturing the <code>language-toggle</code> event the page can be updated as needed to reflect the selected language.
      </div>
      <VaLanguageToggle urls={urls} routerLinks={true} onVaLanguageToggle={handleLanguageToggle}/>
    </Fragment>
  )
}

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };

export const WithRouterLinks = WithRouterLinksTemplate.bind(null);
WithRouterLinks.args = { ...defaultArgs }