import { combineReducers } from 'redux';

import ApplicationStore from './applicationStore';
import AssetsStore from './assetStore';

const reducers = {
    ApplicationStore,
    AssetsStore,
};

export default combineReducers(reducers);
