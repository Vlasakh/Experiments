import dispatchAction from 'Core/dispatchAction';
import { ASSETS_UPDATE_RENDER } from 'Actions/constants/assets';


const assetsUpdateRender = value => dispatch =>
{
    dispatchAction(dispatch, ASSETS_UPDATE_RENDER, value);
};

export default assetsUpdateRender;
