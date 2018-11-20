import dispatchAction from 'Core/dispatchAction';
import { SET_FILTER } from 'Actions/constants/assets';


const setFilter = (name, value) => dispatch =>
{
    dispatchAction(dispatch, SET_FILTER, { name, value });
};

export default setFilter;
