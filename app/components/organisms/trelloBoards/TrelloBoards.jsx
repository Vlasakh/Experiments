import React from 'react';
import PropTypes from 'prop-types';

import type { Board, List } from 'App/flowTypes/trelloStore.flow';

// Utils
import isEmpty from '@tinkoff/utils/is/empty';
import getClassForMaterial from 'Utils/getClassForMaterial';

// Components
import Lists from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from 'Components/layouts/withSidebar/WithSidebar.jsx';

import { reactBoardsTypes } from 'Containers/TrelloPageLists.jsx';

// Styles
import styles from './trelloLists.css';

type Props = {
    openedBoard?: string,
    loadedLists: {
        [string]: List[]
    },
    boards: Board[],
    handleOnPickBoard: (id: string) => () => void,
    handleOnPickList: (id: string) => () => void,
}

const TrelloBoards = (props: Props) => (
    <Layout
        title='Trello boards'
    >
        {
            isEmpty(props.boards) ?
                <div className={styles.loaderWrapper}><CircularProgress /></div> :
                <Lists classes={getClassForMaterial(styles.list)}>
                    {
                        props.boards.map(({ id, name }: Board) =>
                            <li
                                key={id}
                            >
                                <ListItem
                                    classes={getClassForMaterial({
                                        [styles.listItem]: true,
                                        active: true,
                                    })}
                                    button
                                    onClick={props.handleOnPickBoard(id)}
                                >
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={name}
                                    />
                                    {props.openedBoard === id ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse
                                    in={props.openedBoard === id} timeout='auto'
                                    unmountOnExit
                                >
                                    <Lists disablePadding>
                                        {
                                            props.loadedLists[id] ?
                                                props.loadedLists[id].map(({ id: listId, name: listTitle }: Board) =>
                                                    <ListItem key={listId} classes={getClassForMaterial(styles.subListItem)}>
                                                        <ListItemText inset primary={listTitle} />
                                                        <Tooltip title='Covert to cards'>
                                                            <IconButton onClick={props.handleOnPickList(listId)} >
                                                                <GetAppIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </ListItem>
                                                ) :
                                                <div className={styles.loaderWrapper}><CircularProgress /></div>
                                        }
                                    </Lists>
                                </Collapse>
                            </li>
                        )
                    }
                </Lists>
        }

    </Layout>
);

TrelloBoards.propTypes = {
    ...reactBoardsTypes,
    id: PropTypes.string,
    openedBoard: PropTypes.string,
};

TrelloBoards.defaultProps = {
    openedBoard: '',
    id: '',
};

export default TrelloBoards;
