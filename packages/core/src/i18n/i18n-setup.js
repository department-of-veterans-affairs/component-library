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

// Set up an IIFE so we don't pollute the global scope
(() => {
  const intervalId = setInterval(() => {
    const main = document.querySelector('main');
    console.log('MAIN', main);

    if (main) {
      const langAttr = main.getAttribute('lang');
      if (langAttr) i18next.changeLanguage(langAttr);
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'lang'
          ) {
            i18next.changeLanguage(main.getAttribute('lang'));
            console.log(i18next.language);
          }
        });
      });

      observer.observe(main, {
        attributes: true,
      });
      clearInterval(intervalId);
    }
  });

  setTimeout(() => clearInterval(intervalId), 1000);
})();
