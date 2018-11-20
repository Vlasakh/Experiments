import {
    ROUTE_MATCH,
} from 'Actions/constants/application';

import dispatchAction from '../core/dispatchAction';

const setRouteMatch: ActionProto = match => dispatch =>
{
    dispatchAction(dispatch, ROUTE_MATCH, match);

    return Promise.resolve(null);
};

export default setRouteMatch;
