/**
 * i18n.ts
 *
 * This file configures the i18next library for internationalization.
 * It sets up the language detector, resources, fallback language, and other options.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from '../locales/en/translation.json';
import tr from '../locales/tr/translation.json';

// Define the resources for each language
const resources = {
  en: { translation: en },
  tr: { translation: tr },
};

i18n
  // LanguageDetector: Detects user language from browser settings, localStorage, etc.
  .use(LanguageDetector)
  // initReactI18next: Passes i18n instance to react-i18next.
  .use(initReactI18next)
  // init: Initializes i18next with configuration options.
  .init({
    resources,
    // fallbackLng: The language to use if the detected language is not available.
    fallbackLng: 'en',
    // interpolation: Configuration for value interpolation.
    interpolation: {
      // escapeValue: false is needed for React as it already escapes values.
      escapeValue: false,
    },
    // detection: Options for the language detector.
    detection: {
      // order: The order in which to detect the language.
      order: ['localStorage', 'navigator'],
      // caches: Where to cache the detected language.
      caches: ['localStorage'],
    },
  });

export default i18n;
