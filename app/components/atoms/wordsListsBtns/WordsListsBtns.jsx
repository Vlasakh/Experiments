// @flow
import * as React from 'react';

import noop from '@tinkoff/utils/function/noop';


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import IconDone from '@material-ui/icons/Done';
import IconList from '@material-ui/icons/List';
import IconHistory from '@material-ui/icons/History';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const COLOR_RIGHT = green[600];
const COLOR_WRONG = red[500];

const theme = createMuiTheme({
    palette: {
        primary: { main: COLOR_RIGHT },
        secondary: { main: COLOR_WRONG },
    },
});

const withBadge = (children: React.Node) => (num: number, color, theme) => num ? <MuiThemeProvider theme={theme}>
    <Badge color={color} badgeContent={num}>
        {children}
    </Badge>
</MuiThemeProvider> : children;

type Props = {
    wordsRight: number,
    wordsWrong: number,
    openWords: Function,
    openWordsRight: Function,
    openWordsWrong: Function,
};

class WordsListsBtns extends React.PureComponent<Props>
{
    static defaultProps = {
        wordsRight: 0,
        wordsWrong: 0,
        openWords: noop,
        openWordsRight: noop,
        openWordsWrong: noop,
    };


    render()
    {
        const {
            wordsRight,
            wordsWrong,
            openWords,
            openWordsRight,
            openWordsWrong,
        } = this.props;

        return <div>
            <Tooltip title='All words'>
                <Button
                    variant='contained'
                    onClick={openWords}
                >
                    <IconList>words</IconList>
                </Button>
            </Tooltip>
            &nbsp;&nbsp;
            {withBadge(<Tooltip title='Remembered words'>
                <Button
                    variant='contained'
                    onClick={openWordsRight}
                >
                    <IconDone>remembered</IconDone>
                </Button>
            </Tooltip>)(wordsRight, 'primary', theme)}
            &nbsp;&nbsp;
            {withBadge(<Tooltip title='Learn later'>
                <Button
                    variant='contained'
                    onClick={openWordsWrong}
                >
                    <IconHistory>later</IconHistory>
                </Button>
            </Tooltip>)(wordsWrong, 'secondary', theme)}
        </div>;
    }
}

export default WordsListsBtns;
