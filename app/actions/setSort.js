import dispatchAction from 'Core/dispatchAction';
import { SET_SORT } from 'Actions/constants/assets';

import path from '@tinkoff/utils/object/path';


const setSort = field => (dispatch, getState) =>
{
    const store = getState().AssetsStore;
    const asc = !path(['sort', 'asc'], store);
    const prevField = path(['sort', 'field'], store);

    dispatchAction(dispatch, SET_SORT, { asc: prevField !== field ? true : asc, field });
};

export default setSort;
