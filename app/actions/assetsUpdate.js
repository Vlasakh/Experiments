import dispatchAction from 'Core/dispatchAction';
import { ASSETS_UPDATE } from 'Actions/constants/assets';


const assetsUpdate = value => dispatch =>
{
    dispatchAction(dispatch, ASSETS_UPDATE, value);
};

export default assetsUpdate;
