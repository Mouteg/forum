import i18n from "i18next"
import detector from "i18next-browser-languagedetector"
//import XHR from "i18next-xhr-backend"
import {initReactI18next} from 'react-i18next'

import enTrans from "./en/locale.json"
import ruTrans from "./ru/locale.json"
i18n
  .use(detector)
  //.use(XHR)
  .use(initReactI18next)
  .init({
    debug: true,
    //lng: "en",
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: ".",
    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },

    resources: {
      en: {
        translations: enTrans
      },
      ru: {
        translations: ruTrans
      }
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    },

    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"]
    }/*,
	
    backend: {
      loadPath: '/locale/{{lng}}/{{ns}}.json'
    }*/
  })

export default i18n