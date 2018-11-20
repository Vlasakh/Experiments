import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import AppReactContext from 'App/core/AppReactContext';
import AppContainer from 'Containers/AppContainer.jsx';
import LocalStorageDataLoader from './LocalStorageDataLoader';
import AssetsUpdater from './AssetsUpdater';


class ApplicationController
{
    context;

    constructor(context)
    {
        this.context = context;
    }

    initialize()
    {
        (new LocalStorageDataLoader(this.context)).run();
        (new AssetsUpdater(this.context)).run();
    }

    render(rootElement)
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
