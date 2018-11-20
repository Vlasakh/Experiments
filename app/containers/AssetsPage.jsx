import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AssetsPage from 'Components/organisms/assetsPage/AssetsPage.jsx';
import filterAssets from 'Stores/selectors/filterAssets';
import sortAssets from 'Stores/selectors/sortAssets';

import setSort from 'Actions/setSort';
import setFilter from 'Actions/setFilter';
import setFavourite from 'Actions/setFavourite';


class AssetsPageContainer extends Component
{
    render()
    {
        return (
            <AssetsPage {...this.props} />
        );
    }
}


const mapStateToProps = state =>
{
    const {
        assets,
        filters,
        sort,
        favourites,
    } = state.AssetsStore;

    return {
        assets: sortAssets(sort, favourites)(filterAssets(filters)(assets)),
        filters,
        sort,
        favourites,
    };
};

export default connect(
    mapStateToProps,
    dispatch => ({
        ...bindActionCreators({
            setFilter,
            setSort,
            setFavourite,
        }, dispatch),
    })
)(AssetsPageContainer);
