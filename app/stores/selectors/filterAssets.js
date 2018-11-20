import { createSelector } from 'reselect';
import findKey from '@tinkoff/utils/object/findKey';

const fieldsModificators = {
    price: val => val.toFixed(2),
    defaults: val => val,
};

const modify = (value, key) =>
{
    if (fieldsModificators[key])
    {
        return fieldsModificators[key](value);
    }

    return fieldsModificators.defaults(value);
};

const filterAssets = filters => assets =>
{
    return assets.filter(asset => !findKey((val, key) =>
    {
        const preparedAsset = modify(asset[key], key).toString().toLowerCase();

        return val ? preparedAsset.indexOf(val.toLowerCase()) === -1 : false;
    },
    filters));
};

const itemsSelector = assets => assets;
const filterAssetsSelector = filter => createSelector(
    itemsSelector,
    filterAssets(filter)
);

export default filterAssetsSelector;
