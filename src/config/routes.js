/* eslint-disable react/jsx-key */
import React from 'react';
import RestrictedRoute from 'rmw-shell/lib/containers/RestrictedRoute';
import makeLoadable from 'rmw-shell/lib/containers/MyLoadable';

const MyLoadable = (opts, preloadComponents) =>
    makeLoadable({ ...opts, firebase: () => import('./firebase') }, preloadComponents);

const LandingPage = MyLoadable({ loader: () => import('../pages/LandingPage') });
const LettersPage = MyLoadable({ loader: () => import('../pages/Letters') });

const routes = [
    <RestrictedRoute type="private" path="/" exact component={LandingPage} />,
    <RestrictedRoute type="private" path="/letters" exact component={LettersPage} />
];

export default routes;
