import en_messages from './en';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/lib/supported-locales.generated';
// import '@formatjs/intl-relativetimeformat/dist/locale-data/de';
// import '@formatjs/intl-relativetimeformat/dist/locale-data/en';
// import '@formatjs/intl-relativetimeformat/dist/locale-data/ru';
// import '@formatjs/intl-relativetimeformat/dist/locale-data/bs';
// import '@formatjs/intl-relativetimeformat/dist/locale-data/es';

const locales = [
    {
        locale: 'en',
        messages: en_messages,
    },
];

export default locales;
