// @flow
import type { Action } from './store.flow';
import type { ApplicationStore, Match } from './ApplicationStore.flow';

import {
    ROUTE_MATCH,
} from '../actions/constants/application';

export const EMPTY_MATCH: Match = {
    path: '',
    params: {
        id: '',
    },
};

const initialState: ApplicationStore = {
    routeMatch: EMPTY_MATCH,
};

export default function pageStore(state: ApplicationStore = initialState, action: Action)
{
    switch (action.type)
    {
        case ROUTE_MATCH:
            return { ...state, routeMatch: action.payload };

        default: return state;
    }
}
