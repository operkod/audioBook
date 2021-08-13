import { getLanguage } from 'helpers/token';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ru from './ru.json';

i18n
  .use(backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: getLanguage() || 'ru',
    fallbackLng: ['en', 'ru'],
    debug: process.env.NODE_ENV !== 'production',
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

// изменяем язык в моменте при изменении языка в i18n и загружаем выбранный язык
// i18n.on('languageChanged', (lng) => {
// });
