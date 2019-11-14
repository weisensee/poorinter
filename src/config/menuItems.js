import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Brightness2 from '@material-ui/icons/Brightness2';
import Brightness7 from '@material-ui/icons/Brightness7';
import DaschboardIcon from '@material-ui/icons/Dashboard';
import LockIcon from '@material-ui/icons/Lock';
import React from 'react';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';

const getMenuItems = props => {
    const {
        switchNightMode,
        intl,
        themeSource,
        auth,
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
