// @flow
import type { Dispatch } from 'redux';

import find from '@tinkoff/utils/array/find';

import type { Set, SetData } from 'Stores/SetsStore.flow';
import type { ActionProto } from 'Types/common';

import dispatchAction from 'Core/dispatchAction';
import { PARSE_CURRENT_SET_DATA } from '../constants/readSets';

function parseSetData(dataString: string): SetData[]
{
    const wordsStrings = dataString.trim().split('\u000A');

    wordsStrings.shift();

    return wordsStrings.map(item =>
    {
        const words = item.trim().split('|');
        const ruIdx = words.length > 2 ? 2 : 1;
        const transcription = words.length > 2 ? words[1].trim() : '';

        return {
            foreign: words[0].trim(),
            transcription,
            ru: words[ruIdx].trim(),
        };
    });
}


const readSetData: ActionProto<string, SetData[]> = (inId: string) => (dispatch: Dispatch, getState: Function): Promise<SetData[]> =>
{
    const sets: Set[] = getState().SetsStore.sets;
    const data: Set = find(({ id }) => inId === id)(sets);
    const payload: SetData[] = data && parseSetData(data.body);

    data && dispatchAction(dispatch, PARSE_CURRENT_SET_DATA, payload);

    return Promise.resolve(payload);
};

export default readSetData;
