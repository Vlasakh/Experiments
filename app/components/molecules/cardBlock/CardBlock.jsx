// @flow
import React, { PureComponent } from 'react';
import Swipe from 'react-swipe-component';
import classnames from 'classnames';

import type { SetData, Language } from 'Stores/SetsStore.flow';
import type { Action, Component } from 'Types/common';

import IconButton from '@material-ui/core/IconButton';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography/Typography';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ReplayIcon from '@material-ui/icons/Replay';

import styles from './cardBlock.css';

type Props = {
    words: SetData[],
    card: Component,
    index: number,
    language: Language,
    noRememberLater: boolean,
    onWordsListClick: Function,
    goNextWord: Action,
    goPrevWord: Action,
    onRememberLaterClick: Action,
};

type State = {
    isSwipedUp: boolean,
}

class CardBlock extends PureComponent<Props, State>
{
    _isTransitionStarted: boolean = false;
    state = {
        isSwipedUp: false,
    };

    handleChangeIndex = (nextIndex: number) =>
    {
        const { index, goNextWord, goPrevWord } = this.props;

        if (nextIndex > index)
        {
            goNextWord();
        }
        else
        {
            goPrevWord();
        }
    };

    handleSwipeUp = () =>
    {
        if (this.props.noRememberLater)
        {
            return;
        }

        this.setState({ isSwipedUp: true });
        this._isTransitionStarted = true;
    };

    handleTransitionEnd = () =>
    {
        if (this._isTransitionStarted)
        {
            this.props.onRememberLaterClick();
            this.setState({ isSwipedUp: false });
            this._isTransitionStarted = false;
        }
    };

    render()
    {
        const {
            card: Card,
            words,
            index,
            language,
            goNextWord,
            goPrevWord,
            noRememberLater,
            onWordsListClick,
            onRememberLaterClick,
        } = this.props;
        const { isSwipedUp } = this.state;

        return <div className={styles.wrapper}>
            {words.length ?
                <div className={styles.row}>
                    <div className={styles.nextPrevWrapper}>
                        <IconButton className={classnames(styles.nextPrevBtn, styles.prevBtn)} onClick={goPrevWord}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <div
                        className={classnames(styles.card, { [styles.activeCard]: isSwipedUp })}
                        onTransitionEnd={this.handleTransitionEnd}
                    >
                        <Swipe
                            nodeName='div'
                            mouseSwipe
                            onSwipedUp={this.handleSwipeUp}
                        >
                            <SwipeableViews
                                index={index}
                                axis='x'
                                onChangeIndex={this.handleChangeIndex}
                                enableMouseEvents
                            >
                                {words.map((item: SetData, idx: number) => <Card
                                    key={idx} // eslint-disable-line react/no-array-index-key
                                    word={item}
                                    language={language}
                                    openCurrentIterationSet={onWordsListClick}
                                    rememberLater={onRememberLaterClick}
                                    noRememberLater={noRememberLater}
                                />)}
                            </SwipeableViews>
                        </Swipe>
                    </div>
                    <div className={styles.nextPrevWrapper}>
                        <IconButton className={classnames(styles.nextPrevBtn, styles.nextBtn)} onClick={goNextWord}>
                            <ChevronRightIcon />
                        </IconButton>
                    </div>
                </div> :

                <div>
                    <Typography
                        className={styles.successMessage}
                        color='inherit'
                        variant='title'
                    >
                        All words was processed
                    </Typography>
                    <Typography
                        className={styles.successMessage}
                        color='inherit'
                        variant='title'
                    >
                        Reload all cards ?
                    </Typography>

                    <IconButton className={classnames(styles.nextPrevBtn, styles.nextBtn)} onClick={goNextWord}>
                        <ReplayIcon />
                    </IconButton>
                </div>
            }
        </div>;
    }
}

export default CardBlock;
