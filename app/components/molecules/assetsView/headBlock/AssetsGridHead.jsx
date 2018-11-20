import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import omit from '@tinkoff/utils/object/omit';

import GridTitle from 'Components/atoms/gridTitle/GridTitle.jsx';

import styles from './assetsGridHead.css';

class AssetsGridHead extends PureComponent
{
    static propTypes = {
        filters: PropTypes.object,
        sort: PropTypes.object,
        setFilter: PropTypes.func,
        setSort: PropTypes.func,
    };

    renderTitle = props =>
    {
        const { setFilter, setSort } = this.props;

        return <div className={classnames(styles.td, props.className)}>
            <GridTitle
                {...omit(['className'], props)}
                onFilterChange={setFilter}
                onSort={setSort}
            />
        </div>;
    };

    render()
    {
        const {
            filters,
            sort,
        } = this.props;

        return <div className={styles.wrapper}>
            {this.renderTitle({
                className: styles.colId,
                title: 'id',
                name: 'id',
                filter: filters.id,
                sort,
            })}
            {this.renderTitle({
                className: styles.colAssetName,
                title: 'Asset Name',
                name: 'assetName',
                filter: filters.assetName,
                sort,
            })}
            {this.renderTitle({
                className: styles.colPrice,
                title: 'Price',
                name: 'price',
                filter: filters.price,
                sort,
            })}
            {this.renderTitle({
                className: styles.colLastUpdate,
                title: 'Last Update',
                name: 'lastUpdate',
                noFilter: true,
                sort,
            })}
            {this.renderTitle({
                className: styles.colType,
                title: 'Type',
                name: 'type',
                filter: filters.type,
                sort,
            })}
            {this.renderTitle({
                className: styles.colFavourites,
                title: 'Fav',
                noFilter: true,
                noSort: true,
            })}
        </div>;
    }
}

export default AssetsGridHead;
