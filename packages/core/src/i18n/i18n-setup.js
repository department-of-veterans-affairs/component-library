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
  const THREE_SECONDS = 3000;
  let mainNotFound = true;
  let main = null;

  // Exit the loop that searches for main after
  // a given amount of time
  setTimeout(() => {
    mainNotFound = false;
  }, THREE_SECONDS);

  // Look for main until it is found
  // or until we timeout looking for it
  while (mainNotFound) {
    main = document.querySelector('main');
    mainNotFound = !!main;
  }

  if (main) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'lang'
        ) {
          i18next.changeLanguage(main.getAttribute('lang'));
        }
      });
    });

    observer.observe(main, {
      attributes: true,
    });
  }
})();
