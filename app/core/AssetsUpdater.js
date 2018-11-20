import path from '@tinkoff/utils/object/path';

import assetsUpdate from 'App/actions/assetsUpdate';
import assetsUpdateRender from 'App/actions/assetsUpdateRender';

import { mock } from 'Src/mock/mock';

class AssetsUpdater
{
    constructor(context)
    {
        this.context = context;
        this.assetNeedUpdate = path(['AssetsStore', 'assetNeedUpdate'], context.store.getState());
    }

    run()
    {
        const context = this.context;

        mock.subscribe(value => context.executeAction(assetsUpdate, value));
        setInterval(() =>
        {
            const assetNeedUpdate = path(['AssetsStore', 'assetNeedUpdate'], context.store.getState());

            if (this.assetNeedUpdate !== assetNeedUpdate)
            {
                this.assetNeedUpdate = assetNeedUpdate;
                context.executeAction(assetsUpdateRender);
            }
        }, 1000);
    }
}

export default AssetsUpdater;
