import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { AutoSizer, Table, Column, SortDirection } from 'react-virtualized';
import tableStyles from 'react-virtualized/styles.css';

import isFunction from '@tinkoff/utils/is/function';

import GridTitle from 'Components/atoms/gridTitle/GridTitle.jsx';
import FavouritesBtn from 'Components/atoms/favouritesBtn/FavouritesBtn.jsx';
import { unixToDate } from './utils.js';

import styles from './AssetsPage.css';


class AssetsPage extends Component
{
    static propTypes = {
        assets: PropTypes.array.isRequired,
        filters: PropTypes.object,
        sort: PropTypes.object,
        favourites: PropTypes.object,
        setFilter: PropTypes.func,
        setSort: PropTypes.func,
        setFavourite: PropTypes.func,
    };

    renderColumn = ({ name, className, cellRenderer, ...rest }) =>
    {
        const { filters, sort, setFilter, setSort } = this.props;
        const cellRendererGeneral = ({ cellData }) => cellData;

        return <Column
            disableSort
            dataKey={name}
            className={className}
            headerClassName={className}
            headerRenderer={() => <GridTitle
                name={name}
                sort={sort}
                className={className}
                filter={filters[name]}
                onFilterChange={setFilter}
                onSort={setSort}
                {...rest}
            />}
            cellRenderer={isFunction(cellRenderer) ? cellRenderer : cellRendererGeneral}
        />;
    };

    render()
    {
        console.log('rerender',);// eslint-disable-line indent, object-curly-spacing,comma-spacing
        const {
            assets,
            filters,
            sort,
            favourites,
            setFilter,
            setSort,
            setFavourite,
        } = this.props;

                    // {assets.map(({ id, assetName, price, lastUpdate, type }) =>
        return <div className={styles.wrapper}>
            <AutoSizer defaultHeight={500}>
                {({ width, height }) => (
                    <Table
                        disableHeader={false}
                        headerClassName={styles.headerCell}
                        headerHeight={100}
                        height={height}
                        // noRowsRenderer={this._noRowsRenderer}
                        overscanRowCount={10}
                        rowClassName={() => classnames(tableStyles.ReactVirtualized__Table__row, styles.row)}
                        rowHeight={38}
                        rowGetter={({ index }) => assets[index]}
                        rowCount={assets.length}
                        // scrollToIndex={scrollToIndex}
                        // sort={this._sort}
                        sortBy='id'
                        sortDirection={SortDirection.Asc}
                        width={width}
                    >
                        {this.renderColumn({
                            name: 'id',
                            title: 'id',
                            className: styles.colId,
                        })}
                        {this.renderColumn({
                            name: 'assetName',
                            title: 'Asset name',
                            className: styles.colAssetName,
                        })}
                        {this.renderColumn({
                            name: 'price',
                            title: 'Price',
                            className: styles.colPrice,
                        })}
                        {this.renderColumn({
                            name: 'lastUpdate',
                            title: 'Last Update',
                            className: styles.colLastUpdate,
                            noFilter: true,
                            cellRenderer: ({ cellData }) => unixToDate(cellData),
                        })}
                        {this.renderColumn({
                            name: 'type',
                            title: 'Type',
                            className: styles.colType,
                        })}
                        {this.renderColumn({
                            name: 'type',
                            title: 'Fav',
                            className: styles.colFavourites,
                            noFilter: true,
                            noSort: true,
                            cellRenderer: ({ rowData }) => <FavouritesBtn
                                id={rowData.id}
                                favourites={favourites}
                                onSetFavourite={setFavourite}
                            />,
                        })}
                    </Table>
                )}
            </AutoSizer>
        </div>;
    }
}

export default AssetsPage;
