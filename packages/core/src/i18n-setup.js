import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import contentElementTag from './language-detector';
import enTranslation from './translations/en';

const languageDetector = new LanguageDetector();
languageDetector.addDetector(contentElementTag);
i18next.use(languageDetector).init({
  fallbackLng: 'en',
  detection: ['contentElementTag', 'htmlTag'],
  resources: {
    en: { translation: enTranslation },
  },
});

console.log('SETTING IUP');
