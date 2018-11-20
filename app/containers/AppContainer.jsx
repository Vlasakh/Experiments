import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchPath } from 'react-router';
import { Switch, withRouter } from 'react-router-dom';

import compose from '@tinkoff/utils/function/compose';
import find from '@tinkoff/utils/array/find';

import routesConfig from 'App/core/routes/routesConfig';
import Route from 'App/core/routes/Route.jsx';
import setRouteMatch from 'Actions/setRouteMatch';
import { EMPTY_MATCH } from 'Stores/applicationStore';

import 'App/styles/index.css';

const findRoute = (url, routes) =>
{
    let match = EMPTY_MATCH;

    find(config =>
    {
        match = matchPath(url, config);

        return match;
    })(routes);

    return match;
};

class AppContainer extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            routesConfig: routesConfig({ authorized: props.authorized }),
        };

        const [, url] = window.location.hash.split('#');

        props.context.setHistory(props.history);
        this.setRoute(props.context, url);
    }

    componentDidUpdate(prevProps)
    {
        const { location } = this.props;

        if (location.pathname !== prevProps.location.pathname)
        {
            this.handleRouteChange(location);
        }
    }

    handleRouteChange = (location: Location) =>
    {
        this.setRoute(this.props.context, location.pathname);
    };

    setRoute = (context, url: string) =>
    {
        context.executeAction(setRouteMatch, findRoute(url, this.state.routesConfig));
    };

    render()
    {
        return <Switch>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {this.state.routesConfig.map((route, i) => <Route key={i} {...route} />)}
        </Switch>;
    }
}

export default compose(
    withRouter,
    connect(
        state => ({
        })
    )
)(AppContainer);
