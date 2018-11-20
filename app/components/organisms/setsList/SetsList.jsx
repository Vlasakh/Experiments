// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { ContextRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';

import type { SetMeta } from 'Stores/SetsStore.flow';

type Props = {
    setsMeta: SetMeta[],
    history: ContextRouter.history
};

class SetsList extends Component<Props>
{
    handleClickWithParam = (id: string) => () =>
    {
        const { history } = this.props;

        history.push(`/set/${id}`);
    };

    render()
    {
        const { setsMeta } = this.props;

        return <List>
            {setsMeta.map(({ id, title, comment }: SetMeta, idx: number) =>
                <ListItem
                    key={idx} button
                    onClick={this.handleClickWithParam(id)}
                >
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                    <ListItemText primary={title} secondary={comment} />
                </ListItem>
            )}
        </List>;
    }
}

function mapStateToProps({ SetsStore: { setsMeta } })
{
    return {
        setsMeta,
    };
}

const styles2 = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

export default connect(mapStateToProps)(withStyles(styles2)(SetsList));
