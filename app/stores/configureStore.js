import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './index';


const composeEnhancers = composeWithDevTools({
    // Specify custom devTools options
});

export default function configureStore(initialState, context)
{
    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk.withExtraArgument(context))));

    window.debugStore = store;

    return store;
}
