import React from 'react';

import AssetsPage from '../../containers/AssetsPage.jsx';

import {
    LOGIN,
} from './constants';

const routesConfig = () => [
    // {
    //     path: LOGIN,
    //     component: LoginPage,
    //     needRedirect: authorized,
    //     redirectTo: HOME,
    // },
    {
        path: '/',
        component: AssetsPage,
        exact: true,
    },
];

export default routesConfig;
