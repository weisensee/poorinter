/* eslint-disable react/jsx-key */
import React from 'react';
import RestrictedRoute from 'rmw-shell/lib/containers/RestrictedRoute';
import makeLoadable from 'rmw-shell/lib/containers/MyLoadable';

const MyLoadable = (opts, preloadComponents) =>
	makeLoadable({ ...opts, firebase: () => import('./firebase') }, preloadComponents);

// const AsyncDashboard = MyLoadable({ loader: () => import('../pages/Dashboard') });

const routes = [
	// <RestrictedRoute type="private" path="/" exact component={AsyncDashboard} />,
	// <RestrictedRoute type="private" path="/dashboard" exact component={AsyncDashboard} />,
];

export default routes;
