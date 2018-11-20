// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import AppReactContext from 'App/core/AppReactContext';
import AppContainer from 'Containers/AppContainer.jsx';
import SetsDataLoader from 'Core/SetsDataLoader';
import parseUrl from 'Actions/parseUrl';

import type Context from 'Core/Context';

class ApplicationController
{
    context: Context;

    constructor(context: Context)
    {
        this.context = context;
    }

    initialize()
    {
        this.context.executeAction(parseUrl);

        const DataLoader = new SetsDataLoader(this.context.store);

        DataLoader.run();
    }

    render(rootElement: Element)
    {
        if (rootElement !== null)
        {
            const { store } = this.context;

            render(
                <Provider store={store}>
                    <AppReactContext.Provider value={this.context}>
                        <HashRouter>
                            <AppContainer
                                context={this.context}
                            />
                        </HashRouter>
                    </AppReactContext.Provider>
                </Provider>,
                rootElement
            );
        }
    }
}

export default ApplicationController;
