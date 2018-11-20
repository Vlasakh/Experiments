// @flow
export type Set = 'currentSetData' | 'currentIterationSet' | 'currentSetRight' | 'currentSetWrong';

export type DialogConfig = {
    listName: Set,
    dialogHeader: string,
    canRevert: boolean,
};

export type DialogsConfigs = {
    [Set]: DialogConfig
};
