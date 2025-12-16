import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es_common from './locales/es/common.json';
import es_header from './locales/es/header.json';
import es_navbar from './locales/es/navbar.json';
import es_home from './locales/es/home.json';
import es_account from './locales/es/account.json';
import es_postDetail from './locales/es/postDetail.json';
import es_statistics from './locales/es/statistics.json';
import es_personalStatistics from './locales/es/personalStatistics.json';
import es_posts from './locales/es/posts.json';
import es_comments from './locales/es/comments.json';
import es_auth from './locales/es/auth.json';

import en_common from './locales/en/common.json';
import en_header from './locales/en/header.json';
import en_navbar from './locales/en/navbar.json';
import en_home from './locales/en/home.json';
import en_account from './locales/en/account.json';
import en_postDetail from './locales/en/postDetail.json';
import en_statistics from './locales/en/statistics.json';
import en_personalStatistics from './locales/en/personalStatistics.json';
import en_posts from './locales/en/posts.json';
import en_comments from './locales/en/comments.json';
import en_auth from './locales/en/auth.json';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    debug: false,
    resources: {
      es: {
        common: es_common,
        header: es_header,
        navbar: es_navbar,
        home: es_home,
        account: es_account,
        postDetail: es_postDetail,
        statistics: es_statistics,
        personalStatistics: es_personalStatistics,
        posts: es_posts,
        comments: es_comments,
        auth: es_auth
      },
      en: {
        common: en_common,
        header: en_header,
        navbar: en_navbar,
        home: en_home,
        account: en_account,
        postDetail: en_postDetail,
        statistics: en_statistics,
        personalStatistics: en_personalStatistics,
        posts: en_posts,
        comments: en_comments,
        auth: en_auth
      }
    },
    ns: [
      'common',
      'header',
      'navbar',
      'home',
      'account',
      'postDetail',
      'statistics',
      'personalStatistics',
      'posts',
      'comments',
      'auth'
    ],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;
