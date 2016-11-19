import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import root from '../utils/root';
const resources = require('i18next-resource-store-loader!../langs/index.js');

root.i18next = i18next;


i18next
  .use(LngDetector)
  .init({
    // lng: 'it', // not setted 'cause of LngDetector
    fallbackLng: 'en',
    resources: {
      en: resources.en,
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // order and from where user language should be detected
      order: ['querystring', 'localStorage', 'cookie', 'navigator'],

      // keys or params to lookup language from
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',

      // cache user language on
      caches: ['localStorage', 'cookie'],

      // optional expire and domain for set cookie
      cookieMinutes: 1500,
    },
  });

if (module.hot) {
  module.hot.accept('i18next-resource-store-loader!../langs/index.js', () => {
    const res = require('i18next-resource-store-loader!../langs/index.js');
    Object
      .keys(res)
      .forEach((lang) => {
        Object
          .keys(res[lang])
          .forEach((namespace) => {
            i18next.addResourceBundle(lang, namespace, res[lang][namespace], true, true);
          })
        ;
      })
    ;

    i18next.emit('loaded');
  });
}
