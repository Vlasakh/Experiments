// @flow
import React, { PureComponent } from 'react';

import find from '@tinkoff/utils/array/find';
import path from '@tinkoff/utils/object/path';

import type { SetData, Language, SetMeta } from 'Stores/SetsStore.flow';
import type { Action, RefObject } from 'Types/common';
import type { Match } from 'Stores/ApplicationStore.flow';

import WordsDialogBlock from 'Components/molecules/wordsDialogBlock/WordsDialogBlock.jsx';
import WordsBlock from 'Components/molecules/repeatView/wordBlock/WordsBlock.jsx';
import CardBlock from 'Components/molecules/cardBlock/CardBlock.jsx';
import BottomBlock from 'Components/molecules/repeatView/bottomBlock/BottomBlock.jsx';
import Card from 'Components/atoms/card/Card.jsx';

import Layout from 'Components/layouts/withSidebar/WithSidebar.jsx';

import styles from './repeatSet.css';

type Props = {
    language: Language,
    routeMatch: Match,
    currentSetData: SetData[],
    currentIterationSet: SetData[],
    currentIterationSetIndex: number,
    currentSetRight: SetData[],
    currentSetWrong: SetData[],
    setsMeta: SetMeta[],
    toggleLanguage: Action,
    goNextWord: Action,
    goPrevWord: Action,
    rememberLater: Action,
    loadRememberLater: Action,
    revertToList: Action,
    shuffle: Action,
    goToBeginning: Action,
};

class RepeatSet extends PureComponent<Props>
{
    wordsDialog: RefObject = React.createRef();

    render()
    {
        const {
            language,
            currentSetData,
            currentIterationSet,
            currentIterationSetIndex,
            currentSetRight,
            currentSetWrong,
            setsMeta,
            toggleLanguage,
            goNextWord,
            goPrevWord,
            rememberLater,
            loadRememberLater,
            revertToList,
            shuffle,
            goToBeginning,
            routeMatch,
            routeMatch: { params: { id } },
        } = this.props;

        return <Layout
            title={`${find(item => item.id === id)(setsMeta).title} (Repeat mode)`}
            routeMatch={routeMatch}
        >
            <div className={styles.wrapper}>
                <WordsDialogBlock
                    ref={this.wordsDialog}
                    words={currentSetData}
                    wordsIteration={currentIterationSet}
                    wordsRight={currentSetRight}
                    wordsWrong={currentSetWrong}
                    revertToList={revertToList}
                />
                <WordsBlock
                    words={currentIterationSet}
                    wordIndex={currentIterationSetIndex}
                    wordsRight={currentSetRight}
                    wordsWrong={currentSetWrong}
                    language={language}
                    toggleLanguage={toggleLanguage}
                    openWords={path(['current', 'openWords'], this.wordsDialog)}
                    openWordsRight={path(['current', 'openWordsRight'], this.wordsDialog)}
                    openWordsWrong={path(['current', 'openWordsWrong'], this.wordsDialog)}
                />
                <CardBlock
                    card={Card}
                    wordsList={this.wordsDialog.current}
                    words={currentIterationSet}
                    index={currentIterationSetIndex}
                    language={language}
                    goNextWord={goNextWord}
                    goPrevWord={goPrevWord}
                    isLast={currentIterationSet.length - 1 === currentIterationSetIndex}
                    noRememberLater={currentIterationSet.length < 2}
                    onWordsListClick={path(['current', 'openWordsIteration'], this.wordsDialog)}
                    onRememberLaterClick={rememberLater}
                />
                <BottomBlock
                    isLast={currentIterationSet.length - 1 === currentIterationSetIndex}
                    loadRememberLater={loadRememberLater}
                    shuffle={shuffle}
                    goToBeginning={goToBeginning}
                />
            </div>;
        </Layout>;
    }
}

export default RepeatSet;
