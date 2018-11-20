// @flow
import React, { Component } from 'react';

import type Context from 'Core/Context';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import type { MenuItem } from 'Components/atoms/sideBarMenu/sideBarMenu.flow';
import type { Match } from 'Stores/ApplicationStore.flow';

import getMenu from './menu';

type Props = {
    context: Context,
    routeMatch: Match,
};

class SidebarMenu extends Component<Props>
{
    handlerClick = (link: string | Function) => () =>
    {
        const { context: { history }, routeMatch: { params } } = this.props;
        const linkString = typeof link === 'function' ? link(params) : link;

        history.push(linkString);
    };

    render()
    {
        const { routeMatch: { path } } = this.props;

        return getMenu(path).map((item: MenuItem, idx) =>
        {
            const ComponentIcon = item.icon;

            return <ListItem
                key={idx} // eslint-disable-line react/no-array-index-key
                button
                onClick={this.handlerClick(item.link)}
            >
                <ListItemIcon>
                    <ComponentIcon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
            </ListItem>;
        });
    }
}

export default SidebarMenu;
