// @flow
import type { Dispatch } from 'redux';
import type { Card } from 'Types/trelloStore.flow';

import getCards from 'App/api/getCards';
import saveCards from 'Actions/saveCards';
import saveRawSets from 'Actions/sets/saveRawSets';
import readSetsMetaAction from 'Actions/sets/readSetsMeta';


const pickListCards = (id: string) => (dispatch: Dispatch) =>
{
    getCards(id)
        .then((cards: Card[]) =>
        {
            saveCards(dispatch)({ id, payload: cards });
            return cards;
        })
        .then(cards =>
        {
            return saveRawSets(cards)(dispatch);
        })
        .then(rawSets =>
        {
            readSetsMetaAction(rawSets)(dispatch);
        });
};

export default pickListCards;
