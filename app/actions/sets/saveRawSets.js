// @flow
import type { Dispatch } from 'redux';
import type { Card } from 'Types/trelloStore.flow';
import type { Set } from 'Stores/SetsStore.flow';

import {
    SAVE_RAW_SETS,
} from 'Actions/constants/readSets';
import dispatchAction from 'Core/dispatchAction';

const omitCardsParams = ({ id, name, desc }): Set => ({
    id,
    title: name,
    body: desc,
});

const saveRawSets = (cards: Card[]) => (dispatch: Dispatch): Set[] =>
{
    const rawSets = cards.map(omitCardsParams);

    dispatchAction(dispatch, SAVE_RAW_SETS, rawSets);

    return rawSets;
};

export default saveRawSets;
