// @flow
import type { Dispatch } from 'redux';
import type { ActionProto } from 'Types/common';
import type { SetData } from 'Stores/SetsStore.flow';

import dispatchAction from 'Core/dispatchAction';
import { SHUFFLE_CURRENT_SET_DATA } from 'Actions/constants/readSets';

function shuffleArray(array)
{
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0)
    {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const shuffle: ActionProto<SetData[], null> = () => (dispatch: Dispatch, getState: Function) =>
{
    const currentIterationSet = getState().SetsStore.currentIterationSet;

    dispatchAction(dispatch, SHUFFLE_CURRENT_SET_DATA, shuffleArray([...currentIterationSet]));
};

export default shuffle;
