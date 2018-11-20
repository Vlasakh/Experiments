// @flow
import type { Action } from 'Types/store.flow';
import type { Board, List, Card } from 'Types/trelloStore.flow';
import {
    SET_BOARDS,
    PICK_BOARD,
    SAVE_CARDS,
} from '../constants/trelloConstants';

type StoreProps = {
    boards: Board[],
    loadedLists: {
        [string]: List[]
    },
    loadedCards: {
        [string]: Card[]
    },
}

const initialState: StoreProps = {
    boards: JSON.parse(window.localStorage.getItem('boards')) || [],
    loadedLists: JSON.parse(window.localStorage.getItem('loadedLists')) || {},
    loadedCards: JSON.parse(window.localStorage.getItem('loadedCards')) || {},
};

export default function trelloStore(state: StoreProps = initialState, action: Action)
{
    switch (action.type)
    {
        case SET_BOARDS:
            return { ...state, boards: action.payload };
        case PICK_BOARD:
            const loadedLists = { ...state.loadedLists, [action.payload.id]: action.payload.lists };

            window.localStorage.setItem('loadedLists', JSON.stringify(loadedLists));

            return { ...state, loadedLists };
        case SAVE_CARDS:
            const loadedCards = { ...state.loadedCards, [action.payload.id]: action.payload.cards };

            window.localStorage.setItem('loadedCards', JSON.stringify(loadedCards));

            return { ...state, loadedCards };
        default:
            return state;
    }
}
