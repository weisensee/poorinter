import React from 'react';
import Loadable from 'react-loadable';
import getMenuItems from './menuItems';
import LoadingComponent from 'rmw-shell/lib/components/LoadingComponent';
import locales from './locales';
import routes from './routes';
import themes from './themes';
import grants from './grants';

const Loading = () => <LoadingComponent />;

const LPAsync = Loadable({
    loader: () => import('../../src/pages'),
    loading: Loading
});

const config = {
    firebase_config: {
        apiKey: 'AIzaSyCCRjaqd3RM4zqJ0QvEURnbNk1vruDJ4us',
        authDomain: 'poop-rinter.firebaseapp.com',
        databaseURL: 'https://poop-rinter.firebaseio.com',
        projectId: 'poop-rinter',
        storageBucket: 'poop-rinter.appspot.com',
        messagingSenderId: '1026480113680',
        appId: '1:1026480113680:web:8ffefde4ed05b3cb2d2295',
        measurementId: 'G-PWS7M0E8PP'
    },
    firebase_providers: [
        'google.com',
        'facebook.com',
        'twitter.com',
        'github.com',
        'password',
        'phone'
    ],
    initial_state: {
        themeSource: {
            isNightModeOn: false,
            source: 'light'
        },
        locale: 'en'
    },
    drawer_width: 256,
    locales,
    themes,
    grants,
    routes,
    getMenuItems,
    firebaseLoad: () => import('./firebase'),
    landingPage: LPAsync
};

export default config;
