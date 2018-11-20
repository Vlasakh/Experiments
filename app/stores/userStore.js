// @flow

import type { Action, UserStore } from 'Types/store.flow';
import {
    SESSION_AUTHORIZE_SUCCESS,
    SESSION_AUTHORIZE_FAIL,
} from '../constants/loginPageConstants';

const initialState: UserStore = {
    appKey: 'ba448235518a8e58003896aecc9c3b57',
    token: window.localStorage.getItem('trello_token'),
    authorized: Boolean(window.localStorage.getItem('trello_token')),
};

export default function pageStore(state: UserStore = initialState, action: Action)
{
    switch (action.type)
    {
        case SESSION_AUTHORIZE_SUCCESS:
            return { ...state, authorized: true, token: action.payload };
        case SESSION_AUTHORIZE_FAIL:
            return { ...state, authorized: false };
        default:
            return state;
    }
}
