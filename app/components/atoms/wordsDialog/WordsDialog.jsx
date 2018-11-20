// @flow
import React, { PureComponent } from 'react';

import noop from '@tinkoff/utils/function/noop';

import type { SetData } from 'Stores/SetsStore.flow';
import type { Action } from 'Types/common';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';

import styles from 'Components/atoms/wordsDialog/wordsDialog.css';

const Transition = (props: mixed) => <Slide direction='down' {...props} />;

type OpenProps = {
    header: string,
    canRevert: boolean,
    revertAction: Action,
};

type Props = {
    wordsList: SetData[],
};

type State = {
    open: boolean,
    header: string,
    canRevert: boolean,
    revertAction: Action,
};

class WordsDialog extends PureComponent<Props, State>
{
    state = {
        open: false,
        header: 'Words',
        canRevert: false,
        revertAction: noop,
    };

    handleClose = () =>
    {
        this.setState({ open: false });
    };

    handleRevert = (index: number) => () =>
    {
        this.state.revertAction(index);
    };

    /**
     * @public
     * dialog opener
     */
    open({ header, canRevert, revertAction }: OpenProps)
    {
        this.setState({
            open: true,
            header,
            canRevert,
            revertAction,
        });
    }

    renderWords = (): mixed =>
    {
        const { wordsList } = this.props;
        const { canRevert } = this.state;

        if (!wordsList.length)
        {
            return 'words list is empty';
        }

        return <ol>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {wordsList.map((item: SetData, idx: number) => <li className={styles.li} key={idx}>
                {canRevert && <IconButton
                    className={styles.revertButton}
                    size='small'
                    title='Revert word to the current list'
                    onClick={this.handleRevert(idx)}
                >
                    <ReplayIcon style={{ fontSize: 16 }} />
                </IconButton>}
                <b>{item.foreign}</b> {item.transcription ? ` [${item.transcription}]` : ''} - {item.ru}
            </li>)}
        </ol>;
    };

    render()
    {
        const { wordsList } = this.props;
        const { open, header } = this.state;

        return <Dialog
            className={styles.wrapper}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
        >
            <DialogTitle id='alert-dialog-slide-title'>
                {header}
            </DialogTitle>
            <DialogContent>
                <Typography component='div' align={!wordsList.length ? 'center' : 'left'}>
                    {this.renderWords()}
                </Typography>
            </DialogContent>
        </Dialog>
        ;
    }
}

export default WordsDialog;
