import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import mainTag from './language-detector';
import enTranslation from './translations/en';
import esTranslation from './translations/es';
import tlTranslation from './translations/tl';

const languageDetector = new LanguageDetector();
languageDetector.addDetector(mainTag);
i18next.use(languageDetector).init({
  fallbackLng: 'en',
  detection: {
    order: ['mainTag', 'htmlTag'],
  },
  resources: {
    en: { translation: enTranslation },
    es: { translation: esTranslation },
    tl: { translation: tlTranslation },
  },
});

export { i18next };

window.addEventListener('load', event => {
  console.log('DOM fully loaded and parsed');
  const element = document.querySelector('main');

  /**
   * Added for Storybook Docs. This adds a `main` element with a `lang` attribute
   * to the DOM. This is needed for the language detector to work 
   * consistently in Storybook.
   */
  const docsRoot = document.querySelector('#docs-root');
  if (!element && docsRoot) {
    const main = document.createElement('main');
    main.setAttribute('lang', 'en');
    docsRoot.parentNode.insertBefore(main, docsRoot);
    main.appendChild(docsRoot);
  }

  if (element) {
    const langAttr = element.getAttribute('lang');
    if (langAttr) i18next.changeLanguage(langAttr);
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'lang'
        ) {
          console.log('MutationObserver fired!');
          i18next.changeLanguage(element.getAttribute('lang'));
        }
      });
    });

    observer.observe(element, {
      attributes: true,
    });
  }

  /**
   * Storybook specific events.
   */
  // if (!element?.classList.contains('storybook')) return;
  
  /**
   * This custom event fires when when the URL changes.
   * Added for Storybook.
   */
  // window.addEventListener('locationchange', () => {
  //   const element = document.querySelector('main');
  //   const lang = element?.getAttribute('lang', lang);
  //   if (lang) i18next.changeLanguage(lang);
  // });
  /**
   * This handles updating the component language
   * when toggled in Storybook during situations
   * where the MutationObserver was not firing and a page refresh
   * was required.
   */
  // window.addEventListener('langchange', (event) => {
  //   const lang = event.detail?.lang;
  //   console.log('langchange', lang);
  //   if (lang) i18next.changeLanguage(lang);
  // });
});