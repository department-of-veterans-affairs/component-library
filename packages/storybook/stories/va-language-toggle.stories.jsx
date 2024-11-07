import React, { Fragment } from 'react';
import { getWebComponentDocs, StoryDocs, propStructure } from './wc-helpers';
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

const url = new URL(window.parent.location.href);
url.searchParams.set('path', '/docs/components-va-language-toggle--docs');

const Template = ({}) => {
  let lang = sessionStorage.getItem('va-language-toggle-lang') ?? 'en';
  function handleLanguageToggle(e) {
    const { language } = e.detail;
    sessionStorage.setItem('va-language-toggle-lang', language)
  }

  return (
    <VaLanguageToggle
      language={lang}
      enHref={url.href}
      esHref={url.href}
      tlHref={url.href}
      onVaLanguageToggle={handleLanguageToggle}
    />
  );
};

const WithRouterLinksTemplate = ({}) => {

  function handleLanguageToggle(e) {
    console.log(`the language has been toggled to ${e.detail.language}`);
  }

  return (
    <Fragment>
      <div>This example illustrates how to use the component with a router. When <code>router-links</code> is
        set to <code>true</code>, clicking on a link will not navigate to a new page (i.e. <code>event.preventDefault()</code> is called).
        By capturing the <code>language-toggle</code> event page content can be updated as needed to reflect the selected language.
      </div>
      <br/>
      <VaLanguageToggle
        enHref={url.href}
        esHref={url.href}
        tlHref={url.href}
        routerLinks={true}
        onVaLanguageToggle={handleLanguageToggle}
      />
    </Fragment>
  )
}

export const Default = Template.bind(null);
Default.argTypes = propStructure(languageToggleDocs);

export const WithRouterLinks = WithRouterLinksTemplate.bind(null);
