import {
    ROUTE_MATCH,
} from '../actions/constants/application';

export const EMPTY_MATCH = {
    path: '',
    params: {
        id: '',
    },
};

const initialState = {
    routeMatch: EMPTY_MATCH,
};

export default function pageStore(state = initialState, action)
{
    switch (action.type)
    {
        case ROUTE_MATCH:
            return { ...state, routeMatch: action.payload };

        default: return state;
    }
}
