const dispatchAction = (dispatch, type, payload) =>
{
    dispatch({ type, payload });
};

export default dispatchAction;
