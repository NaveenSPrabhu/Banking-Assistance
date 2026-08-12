import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import kn from "./locales/kn.json";
import hi from "./locales/hi.json";
import ta from "./locales/ta.json";
import te from "./locales/te.json";
import ml from "./locales/ml.json";
import mr from "./locales/mr.json";

export const LANGUAGE_MAP = {
  English: "en",
  Kannada: "kn",
  Hindi: "hi",
  Tamil: "ta",
  Telugu: "te",
  Malayalam: "ml",
  Marathi: "mr",
};

export const LANGUAGE_NAMES = Object.keys(LANGUAGE_MAP);

const savedLanguage =
  localStorage.getItem("languageCode") ||
  LANGUAGE_MAP[localStorage.getItem("language")] ||
  "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      kn: { translation: kn },
      hi: { translation: hi },
      ta: { translation: ta },
      te: { translation: te },
      ml: { translation: ml },
      mr: { translation: mr },
    },
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export async function setApplicationLanguage(languageName) {
  const languageCode =
    LANGUAGE_MAP[languageName] || languageName || "en";

  await i18n.changeLanguage(languageCode);

  localStorage.setItem("languageCode", languageCode);
  localStorage.setItem(
    "language",
    LANGUAGE_NAMES.includes(languageName)
      ? languageName
      : Object.keys(LANGUAGE_MAP).find(
          (name) => LANGUAGE_MAP[name] === languageCode
        ) || "English"
  );

  return languageCode;
}

export default i18n;
