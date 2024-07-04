// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en', // Explicitly set the initial language to Hindi
    debug: true,
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
      parse: (data) => {
        console.log('Loaded translation file:', data);
        return JSON.parse(data);
      },
    },
  });

export default i18n;
