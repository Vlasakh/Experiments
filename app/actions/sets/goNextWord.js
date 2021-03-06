// @flow
import type { Dispatch } from 'redux';
import type { SetsStore } from 'Stores/SetsStore.flow';

import dispatchAction from 'Core/dispatchAction';
import {
    SET_CURRENT_ITERATION_SET_INDEX,
} from 'Actions/constants/words';

const goNextWord = () => (dispatch: Dispatch, getState: Function) =>
{
    const setsStore: SetsStore = getState().SetsStore;
    const { currentIterationSetIndex: index, currentIterationSet: set } = setsStore;
    const nextIndex = index + 1 !== set.length ? index + 1 : index;

    dispatchAction(dispatch, SET_CURRENT_ITERATION_SET_INDEX, nextIndex);
};

export default goNextWord;
