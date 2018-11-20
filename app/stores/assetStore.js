import merge from '@tinkoff/utils/object/merge';
import omit from '@tinkoff/utils/object/omit';
import findIndex from '@tinkoff/utils/array/findIndex';

import { ASSETS_COUNT, getAllAssets } from 'Src/mock/mock';

import {
    SET_FILTER,
    SET_SORT,
    ASSETS_UPDATE,
    ASSETS_UPDATE_RENDER,
    SET_FAVOURITE,
    SET_ALL_FAVOURITES,
} from 'Actions/constants/assets';

export const initialState = {
    assets: getAllAssets(ASSETS_COUNT),
    assetNeedUpdate: Symbol(),
    filters: {},
    sort: { asc: true, field: 'id' },
    favourites: {},
};

// eslint-disable-next-line max-statements
export default function assetsStore(state = initialState, action)
{
    switch (action.type)
    {
        case SET_FILTER:
        {
            state.filters[action.payload.name] = action.payload.value;
            return { ...state, filter: { ...state.filter } };
        }

        case SET_SORT:
        {
            const { asc, field } = action.payload;

            return merge(state, { sort: { asc, field } });
        }

        case ASSETS_UPDATE:
        {
            const { id } = action.payload;
            const { assets } = state;
            const idx = findIndex(item => item.id === id)(state.assets);

            if (idx === -1)
            {
                assets.push(action.payload);
            }
            else
            {
                assets[idx] = action.payload;
            }


            state.assetNeedUpdate = Symbol();
            return state; // no render, just accumulate changes
        }

        case ASSETS_UPDATE_RENDER:
        {
            return merge(state, { assets: [...state.assets] });
        }

        case SET_FAVOURITE:
        {
            const id = action.payload;
            let favourites = state.favourites;

            favourites = favourites[id] ?
                omit([id.toString()], favourites) :
                merge(favourites, { [id]: true });

            window.localStorage.setItem('favourites', JSON.stringify(favourites));
            return merge(state, { favourites });
        }

        case SET_ALL_FAVOURITES:
        {
            return merge(state, { favourites: action.payload });
        }

        default:
            return state;
    }
}
