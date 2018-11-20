// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import type Context from 'Core/Context';
import type { Match } from 'Stores/ApplicationStore.flow';

import { MatchDefault } from 'Stores/constants/applicationStore';
import compose from '@tinkoff/utils/function/compose';

import AppReactContext from 'Core/AppReactContext';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import SideBarMenu from 'Components/atoms/sideBarMenu/SideBarMenu.jsx';

import stylesDynamic from './stylesDynamic';
import styles from './withSidebar.css';

type Props = {
    classes?: Object,
    title: string,
    subtitle?: string,
    children: Node,
    routeMatch?: Match,
};
type State = {
    open: boolean,
}

class WithSidebar extends Component<Props, State>
{
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    state = {
        open: false,
    };

    handleDrawerOpen = () =>
    {
        this.setState({ open: true });
    };

    handleDrawerClose = () =>
    {
        this.setState({ open: false });
    };

    render()
    {
        const { classes = {}, title, subtitle, children, routeMatch = MatchDefault } = this.props;
        const { open } = this.state;

        const drawer = (
            <Drawer
                variant='persistent'
                anchor='left'
                open={open}
                classes={{
                    // vtodo: внутри прим. через classnames переделать на postcss
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classNames(styles.drawerHeader, classes.drawerHeader)}>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <AppReactContext.Consumer>
                    {(context: Context) =>
                        <SideBarMenu context={context} routeMatch={routeMatch} />
                    }
                </AppReactContext.Consumer>
            </Drawer>
        );

        return (
            <div className={styles.wrapper}>
                <div className={styles.appFrame}>
                    <AppBar
                        className={classNames(styles.appBar, classes.appBar, {
                            [styles.appBarShift]: open,
                            [classes.appBarShift]: open,
                            [styles['appBarShift-left']]: open,
                        })}
                    >
                        <Toolbar disableGutters={!open}>
                            <IconButton
                                color='inherit'
                                aria-label='open drawer'
                                onClick={this.handleDrawerOpen}
                                className={classNames(styles.menuButton, open && styles.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant='title' color='inherit'>
                                {title}
                                &nbsp;
                                {subtitle && <span className={styles.titleComment}>({subtitle})</span>}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {drawer}
                    <main
                        className={classNames(classes.content, classes['content-left'], {
                            [classes.contentShift]: open,
                            [classes['contentShift-left']]: open,
                        })}
                    >
                        {children}
                    </main>
                </div>
            </div>
        );
    }
}

function mapStateToProps({
    ApplicationStore: {
        routeMatch,
    },
})
{
    return {
        routeMatch,
    };
}
export default compose(
    withStyles(stylesDynamic, { withTheme: true }),
    connect(mapStateToProps),
)(WithSidebar);
