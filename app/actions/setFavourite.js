import dispatchAction from 'Core/dispatchAction';
import { SET_FAVOURITE } from 'Actions/constants/assets';


const setFavourite = value => dispatch =>
{
    dispatchAction(dispatch, SET_FAVOURITE, value);
};

export default setFavourite;
