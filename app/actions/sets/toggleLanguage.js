// @flow
import type { Dispatch } from 'redux';
import type { SetsStore, Language } from 'Stores/SetsStore.flow';

import { LANG_FOREIGN, LANG_RU } from 'Stores/constants/setsStore';

import dispatchAction from 'Core/dispatchAction';
import {
    TOGGLE_LANGUAGE,
} from 'Actions/constants/words';

const toggleLanguage = () => (dispatch: Dispatch, getState: Function) =>
{
    const setsStore: SetsStore = getState().SetsStore;
    const language: Language = setsStore.language;

    dispatchAction(dispatch, TOGGLE_LANGUAGE, language === LANG_FOREIGN ? LANG_RU : LANG_FOREIGN);
};

export default toggleLanguage;
