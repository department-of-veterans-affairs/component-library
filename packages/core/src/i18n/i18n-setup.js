import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import mainTag from './language-detector';
import enTranslation from './translations/en';
import esTranslation from './translations/es';

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
  },
});

export { i18next };

window.addEventListener(
  'load',
  event => {
    console.log('DOM fully loaded and parsed');

    const element =
      document.querySelector('main') || document.getElementById('docs-root');
    if (!element) console.log('didnt find main');

    if (element) {
      console.log('found main to attach event listener', element);
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'lang'
          ) {
            console.log('firing changeLanguage');
            i18next.changeLanguage(element.getAttribute('lang'));
          }
        });
      });

      observer.observe(element, {
        attributes: true,
      });
    }
  },
  { once: true },
);
