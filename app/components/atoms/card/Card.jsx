// @flow
import React, { PureComponent } from 'react';

import MCard from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';

import { LANG_FOREIGN, LANG_RU } from 'Stores/constants/setsStore';

import type { Language, SetData } from 'Stores/SetsStore.flow';
import type { Action } from 'Types/common';

import styles from './card.css';

const CARD_STYLES = {
    flexBasis: '325px',
};

type Props = {
    word: SetData,
    language: Language,
    noRememberLater: boolean,
    openCurrentIterationSet: Function,
    rememberLater: Action,
};

type State = {
    word: SetData,
    prevLang: Language,
    language: Language,
    isTranslated: boolean,
};

class Card extends PureComponent<Props, State>
{
    static getInitState = (props: Props) => ({
        word: props.word,
        prevLang: props.language,
        language: props.language,
        isTranslated: false,
    });

    static getDerivedStateFromProps(props: Props, state: State)
    {
        if (props.language !== state.prevLang || props.word !== state.word)
        {
            return Card.getInitState(props);
        }

        return null;
    }

    constructor(props: Props)
    {
        super(props);

        this.state = Card.getInitState(props);
    }

    handleSeeTranslation = () =>
    {
        const language = this.state.language;

        this.setState({
            language: language === LANG_FOREIGN ? LANG_RU : LANG_FOREIGN,
            isTranslated: language === this.props.language,
        });
    };

    render()
    {
        const { word, noRememberLater, openCurrentIterationSet, rememberLater } = this.props;
        const { language, isTranslated } = this.state;

        return <div className={styles.wrapper}>
            <MCard className={styles.card} style={CARD_STYLES}>
                <CardActions className={styles.cardActionsTop}>
                    <Button
                        className={styles.cardActionsButton}
                        size='small'
                        onClick={this.handleSeeTranslation}
                    >
                        see {!isTranslated ? 'translation' : 'word'}
                    </Button>
                    <div className={styles.listBtnWrapper}>
                        <IconButton
                            className={styles.listBtn}
                            title='show current list'
                            onClick={openCurrentIterationSet}
                        >
                            <ListIcon />
                        </IconButton>
                    </div>
                </CardActions>
                <CardContent className={styles.cardContent}>
                    <Typography variant='headline' component='h2'>
                        {word && word[language]}
                    </Typography>
                </CardContent>
                <CardActions className={styles.cardActionsBottom}>
                    {noRememberLater ? null : <Button
                        className={styles.cardActionsButton}
                        size='small'
                        title='move word to remember later list'
                        onClick={rememberLater}
                    >
                        remember later
                    </Button>}
                </CardActions>
            </MCard>
        </div>;
    }
}

export default Card;
