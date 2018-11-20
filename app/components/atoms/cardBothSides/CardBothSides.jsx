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

import styles from './cardBothSides.css';

const CARD_STYLES = {
    flexBasis: '325px',
};

type Props = {
    word: SetData,
    noRememberLater: boolean,
    openCurrentIterationSet: Function,
    rememberLater: Action,
};

class CardBothSides extends PureComponent<Props>
{
    render()
    {
        const { word, noRememberLater, openCurrentIterationSet, rememberLater } = this.props;

        return <div className={styles.wrapper}>
            <MCard className={styles.card} style={CARD_STYLES}>
                <CardActions className={styles.cardActionsTop}>
                    <div />
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
                        {word && word.foreign}
                    </Typography>
                    <div className={styles.hr} />
                    {word.transcription && <Typography variant='headline' component='h2'>
                        [{word && word.transcription}]
                    </Typography>}
                    {word.transcription && <div className={styles.hr} />}
                    <Typography variant='headline' component='h2'>
                        {word && word.ru}
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

export default CardBothSides;
