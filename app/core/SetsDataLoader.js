// @flow
import type { Store } from 'redux';

import dispatchAction from 'Core/dispatchAction';
import readSetsMeta from 'Actions/sets/readSetsMeta';
import { SAVE_RAW_SETS } from 'App/actions/constants/readSets';

class SetsDataLoader
{
    store: Store;

    constructor(store: Store)
    {
        this.store = store;
    }

    run()
    {
        const dispatch = this.store.dispatch;
        const rawSets = JSON.parse(window.localStorage.getItem('rawSets'));

        if (rawSets)
        {
            dispatchAction(dispatch, SAVE_RAW_SETS, rawSets);
            readSetsMeta(rawSets)(dispatch);
        }
    }
}

export default SetsDataLoader;
