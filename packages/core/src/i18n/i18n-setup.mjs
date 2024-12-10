import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import mainTag from './language-detector.mjs';
import enTranslation from './translations/en.mjs';
import esTranslation from './translations/es.mjs';
import tlTranslation from './translations/tl.mjs';

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

  if (element) {
    const langAttr = element.getAttribute('lang');
    if (langAttr) i18next.changeLanguage(langAttr);
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'lang'
        ) {
          i18next.changeLanguage(element.getAttribute('lang'));
        }
      });
    });

    observer.observe(element, {
      attributes: true,
    });
  }
});
