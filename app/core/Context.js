class Context
{
    store;
    history;
    match;

    setStore(inStore)
    {
        this.store = inStore;
    }

    setHistory(history)
    {
        this.history = history;
    }

    executeAction(action, payload)
    {
        const { dispatch, getState } = this.store;

        return Promise.resolve(action(payload)(dispatch, getState, this));
    }
}

export default Context;
