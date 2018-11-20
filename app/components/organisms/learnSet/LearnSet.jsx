// @flow
import React, { PureComponent } from 'react';

import find from '@tinkoff/utils/array/find';
import path from '@tinkoff/utils/object/path';

import type { SetData, Language, SetMeta } from 'Stores/SetsStore.flow';
import type { Action, RefObject } from 'Types/common';
import type { Match } from 'Stores/ApplicationStore.flow';

import { withStyles } from '@material-ui/core/styles';
import WordsDialogBlock from 'Components/molecules/wordsDialogBlock/WordsDialogBlock.jsx';
import WordsBlock from 'Components/molecules/learnView/wordBlock/WordsBlock.jsx';
import CardBlock from 'Components/molecules/cardBlock/CardBlock.jsx';
import BottomBlock from 'Components/molecules/learnView/bottomBlock/BottomBlock.jsx';
import CardBothSides from 'Components/atoms/cardBothSides/CardBothSides.jsx';

import Layout from 'Components/layouts/withSidebar/WithSidebar.jsx';

import styles from './learnSet.css';

const stylesJS = {};

type Props = {
    language: Language,
    routeMatch: Match,
    currentSetData: SetData[],
    currentIterationSet: SetData[],
    currentIterationSetIndex: number,
    currentSetRight: SetData[],
    currentSetWrong: SetData[],
    setsMeta: SetMeta[],
    goNextWord: Action,
    goPrevWord: Action,
    rememberLater: Action,
    loadRememberLater: Action,
    revertToList: Action,
    goToBeginning: Action,
};

class LearnSet extends PureComponent<Props>
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
            goNextWord,
            goPrevWord,
            rememberLater,
            loadRememberLater,
            goToBeginning,
            revertToList,
            routeMatch,
            routeMatch: { params: { id } },
        } = this.props;

        return <Layout
            title={`${find(item => item.id === id)(setsMeta).title} (Learn mode)`}
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
                    openWords={path(['current', 'openWords'], this.wordsDialog)}
                    openWordsRight={path(['current', 'openWordsRight'], this.wordsDialog)}
                    openWordsWrong={path(['current', 'openWordsWrong'], this.wordsDialog)}
                />
                <CardBlock
                    card={CardBothSides}
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
                    goToBeginning={goToBeginning}
                />
            </div>;
        </Layout>;
    }
}

export default withStyles(stylesJS)(LearnSet);
