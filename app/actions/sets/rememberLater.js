// @flow
import type { Dispatch } from 'redux';
import type { SetData, SetsStore } from 'Stores/SetsStore.flow';

import dispatchAction from 'Core/dispatchAction';
import {
    REMEMBER_LATER,
} from 'Actions/constants/words';

const rememberLater = () => (dispatch: Dispatch, getState: Function) =>
{
    const setsStore: SetsStore = getState().SetsStore;
    const {
        currentIterationSetIndex: index,
        currentIterationSet: set,
        currentSetWrong: wrong,
    } = setsStore;

    const currentSetWrong: SetData[] = wrong.concat(set[index]);
    const currentIterationSet: SetData[] = [...set];

    currentIterationSet.splice(index, 1);
    const currentIterationSetIndex = index >= currentIterationSet.length ? currentIterationSet.length - 1 : index;

    dispatchAction(dispatch, REMEMBER_LATER, {
        currentSetWrong,
        currentIterationSet,
        currentIterationSetIndex,
    });
};

export default rememberLater;
