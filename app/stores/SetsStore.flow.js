// @flow
import { LANG_FOREIGN, LANG_RU } from './constants/setsStore';

export type SetMeta = {
    comment: string,
    id: string,
    title: string,
};

export type Set = {
    id: string,
    title: string,
    body: string,
}

export type SetData = {
    foreign: string,
    transcription: string,
    ru: string,
};

export type Language = LANG_FOREIGN | LANG_RU;

export type CurrentSetRight = SetData[];
export type CurrentSetWrong = SetData[];

export type SetsStore = {|
    sets: Set[],
    setsMeta: SetMeta[],
    setsData: Array<SetData[]>,
    language: Language,
    currentSetData: SetData[],
    currentIterationSet: SetData[],
    currentIterationSetIndex: number,
    currentSetRight: CurrentSetRight,
    currentSetWrong: CurrentSetWrong,
|}
