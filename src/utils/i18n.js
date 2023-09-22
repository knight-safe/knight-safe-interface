import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../lang/en.json";

i18n
  // .use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        main: en,
      },
    },
    // lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    saveMissing: true, // send not translated keys to endpoint
    debug: false,
    whitelist: ["en"],
    react: {
      useSuspense: false,
    },
    defaultNS: "main",
  });
