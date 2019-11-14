import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Brightness2 from '@material-ui/icons/Brightness2';
import Brightness7 from '@material-ui/icons/Brightness7';
import ChatIcon from '@material-ui/icons/Chat';
import DaschboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import LanguageIcon from '@material-ui/icons/Language';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import StyleIcon from '@material-ui/icons/Style';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import allLocales from './locales';
import allThemes from './themes';

const getMenuItems = props => {
    const {
        locale,
        updateTheme,
        switchNightMode,
        updateLocale,
        intl,
        themeSource,
        auth,
        isGranted,
        deferredPrompt,
        isAppInstallable,
        isAppInstalled,
        isAuthMenu,
        handleSignOut
    } = props;

    const isAuthorised = auth.isAuthorised;

    if (isAuthMenu) {
        return [
            {
                value: '/my_account',
                primaryText: intl.formatMessage({ id: 'my_account' }),
                leftIcon: <AccountBoxIcon />
            },
            {
                value: '/signin',
                onClick: handleSignOut,
                primaryText: intl.formatMessage({ id: 'sign_out' }),
                leftIcon: <LockIcon />
            }
        ];
    }

    return [
        {
            value: '/',
            visible: isAuthorised,
            primaryText: intl.formatMessage({ id: 'dashboard' }),
            leftIcon: <DaschboardIcon />
        },
        {
            value: '/letters',
            visible: isAuthorised,
            primaryText: intl.formatMessage({ id: 'letters' }),
            leftIcon: <DaschboardIcon />
        },
        {
            onClick: () => {
                switchNightMode(!themeSource.isNightModeOn);
            },
            primaryText: intl.formatMessage({
                id: themeSource.isNightModeOn ? 'day_mode' : 'night_mode'
            }),
            leftIcon: themeSource.isNightModeOn ? <Brightness7 /> : <Brightness2 />
        },
        {
            visible: isAppInstallable && !isAppInstalled,
            onClick: () => {
                deferredPrompt.prompt();
            },
            primaryText: intl.formatMessage({ id: 'install' }),
            leftIcon: <VerticalAlignBottomIcon />
        }
    ];
};

export default getMenuItems;
