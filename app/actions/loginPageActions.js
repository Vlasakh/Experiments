// @flow
import type { Dispatch } from 'redux';

import dispatchAction from '../core/dispatchAction';
import {
    SESSION_AUTHORIZE_SUCCESS,
    SESSION_AUTHORIZE_FAIL,
} from '../constants/loginPageConstants';


const setLoggedIn = (authorized: boolean, token?: string) => (dispatch: Dispatch) =>
{
    dispatchAction(dispatch, authorized ? SESSION_AUTHORIZE_SUCCESS : SESSION_AUTHORIZE_FAIL, token);
};

export default setLoggedIn;
