import { createSelector } from 'reselect';
import isString from '@tinkoff/utils/is/string';

const COMP_STRING = 'string';
const COMP_NUMBER = 'number';
const COMP_ASC = 'Asc';
const COMP_DESC = 'Desc';

let favouriteAssets;

const isFavourite = id => favouriteAssets[id];
const compFavourite = (idA, idB) =>
{
    switch (true)
    {
        case !isFavourite(idA) && !!isFavourite(idB): return 1;
        case !!isFavourite(idA) && !isFavourite(idB): return -1;
        default: return 0;
    }
};
const compStrings = (a, b) => a > b ? 1 : a < b ? -1 : 0;
const compNumbers = (a, b) => a - b;

const fieldsComparers = {
    stringAsc: (a, b, field) => compFavourite(a.id, b.id) || compStrings(a[field], b[field]),
    stringDesc: (a, b, field) => compFavourite(a.id, b.id) || compStrings(b[field], a[field]),
    numberAsc: (a, b, field) => compFavourite(a.id, b.id) || compNumbers(a[field], b[field]),
    numberDesc: (a, b, field) => compFavourite(a.id, b.id) || compNumbers(b[field], a[field]),
};

const sortAssets = ({ asc, field }, favourites) => assets =>
{
    favouriteAssets = favourites;

    if (!field)
    {
        return assets;
    }

    return assets.sort((asset, nextAsset) =>
    {
        let comparer = COMP_NUMBER;

        if (isString(asset[field]))
        {
            comparer = COMP_STRING;
        }

        return fieldsComparers[`${comparer}${asc ? COMP_ASC : COMP_DESC}`](asset, nextAsset, field);
    });
};


const itemsSelector = assets => assets;
const sortAssetsSelector = (sort, favourites) => createSelector(
    itemsSelector,
    sortAssets(sort, favourites)
);

export default sortAssetsSelector;
