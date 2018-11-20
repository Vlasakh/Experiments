// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Types
import type { Dispatch } from 'redux';
import type ContextRouter from 'react-router-dom';
import type { Board, List } from 'Types/trelloStore.flow';

// Utils
import isEmpty from '@tinkoff/utils/is/empty';

// Actions
import setBoards from 'Actions/setBoards';
import pickBoard from 'Actions/pickBoard';
import pickListCards from 'Actions/pickListCards';

// Components
import TrelloBoards from 'Components/organisms/trelloBoards/TrelloBoards.jsx';
import Notification from 'Components/notification/Notification.jsx';

// Services
import getBoard from 'Api/getBoard';
import getBoards from 'Api/getBoards';

export const reactBoardsTypes = {
    boards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        url: PropTypes.string,
        name: PropTypes.string,
    })),
    loadedLists: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
        closed: PropTypes.bool,
        id: PropTypes.string,
        idBoard: PropTypes.string,
        name: PropTypes.string,
        pos: PropTypes.number,
        subscribed: PropTypes.bool,
    }))),
};

type Props = {
    boards: Board[],
    token: string,
    loadedLists: {
        [string]: List[]
    },
    setBoards: (dispatch: Dispatch) => (boards: Board[]) => void,
    pickBoard: (dispatch: Dispatch) => (id: string) => void,
    ...ContextRouter,
}

type State = {
    error: boolean,
}

class TrelloPageLists extends Component<Props, State>
{
    static propTypes = {
        ...reactBoardsTypes,
        token: PropTypes.string.isRequired,
        setBoards: PropTypes.func.isRequired,
        pickBoard: PropTypes.func.isRequired,
    };

    static defaultProps = {
        boards: [],
        loadedLists: {},
    };

    constructor(props)
    {
        super(props);

        this.state = {
            error: false,
        };
    }

    componentDidMount()
    {
        if (isEmpty(this.props.boards))
        {
            getBoards(this.props.token).then((boards: Board[]) =>
            {
                window.localStorage.setItem('boards', JSON.stringify(boards));
                this.props.setBoards(boards);
            });
        }
    }

    onPickBoard = (id: string) => () =>
    {
        const { match, history, loadedLists, pickBoard } = this.props;
        const nextUrl = `/home/${id}`;

        if (match.url !== nextUrl)
        {
            history.push(nextUrl);
        }
        if (isEmpty(loadedLists[id]))
        {
            getBoard(id)
                .then(lists => pickBoard({ id, lists }))
                .catch(() => this.setState({ error: true }));
        }
    };

    onPickList = (id: string) => () =>
    {
        this.props.pickListCards(id);
    };

    handleClose = (event, reason) =>
    {
        if (reason === 'clickaway')
        {
            return;
        }

        this.setState({ error: false });
    };

    render()
    {
        return <div>
            <TrelloBoards
                openedBoard={this.props.match.params.id}
                boards={this.props.boards}
                loadedLists={this.props.loadedLists}
                handleOnPickBoard={this.onPickBoard}
                handleOnPickList={this.onPickList}
            />
            <Notification
                open={!!this.state.error}
                handleClose={this.handleClose}
                type='error'
                message='Internet connection has been lost'
            />
        </div>;
    }
}


const mapStateToProps = ({ TrelloStore: { boards, loadedLists }, UserStore: { token } }) => ({
    token,
    boards,
    loadedLists,
});

const mapActionsToProps = (dispatch: Dispatch) => ({
    setBoards: setBoards(dispatch),
    pickBoard: pickBoard(dispatch),
    ...bindActionCreators({
        pickListCards,
    }, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(TrelloPageLists);
