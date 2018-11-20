import dispatchAction from 'Core/dispatchAction';
import { SET_ALL_FAVOURITES } from 'Actions/constants/assets';

class LocalStorageDataLoader
{
    constructor(context)
    {
        this.store = context.store;
    }

    run()
    {
        const dispatch = this.store.dispatch;

        try
        {
            const favourites = JSON.parse(window.localStorage.getItem('favourites'));

            if (favourites)
            {
                dispatchAction(dispatch, SET_ALL_FAVOURITES, favourites);
            }
        }
        catch (e)
        {
            console.log('Fail load favourites');// eslint-disable-line no-console
        }
    }
}

export default LocalStorageDataLoader;
