import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import noop from '@tinkoff/utils/function/noop';
import debounce from '@tinkoff/utils/function/debounce';
import isEmpty from '@tinkoff/utils/is/empty';

import TextField from '@material-ui/core/TextField';
import IconArrowUpward from '@material-ui/icons/ArrowUpward';
import IconArrowDownward from '@material-ui/icons/ArrowDownward';

import styles from './gridTitle.css';


class GridTitle extends PureComponent
{
    static propTypes = {
        title: PropTypes.string.isRequired,
        filter: PropTypes.string,
        name: PropTypes.string,
        sort: PropTypes.object,
        noFilter: PropTypes.bool,
        noSort: PropTypes.bool,
        onFilterChange: PropTypes.func,
        onSort: PropTypes.func,
    };

    static defaultProps = {
        title: '',
        filter: '',
        sort: {},
        noFilter: false,
        noSort: false,
        onFilterChange: noop,
        onSort: noop,
    };

    _inputRef = React.createRef();

    handleInputChange = debounce(300, () =>
    {
        const { name, onFilterChange } = this.props;

        onFilterChange(name, this._inputRef.current.value);
    });

    handleSort = event =>
    {
        event.preventDefault();

        const { name, onSort } = this.props;

        onSort(name);
    };

    render()
    {
        const {
            title,
            name,
            filter,
            noFilter,
            noSort,
            sort,
        } = this.props;
        const Icon = sort.asc ? IconArrowUpward : IconArrowDownward;

        const href = title => <a href='#' onClick={this.handleSort}>{title}</a>;

        return <div className={styles.wrapper}>
            <div>
                <div className={styles.title}>
                    {!noSort ? href(title) : title}
                    {name && sort.field === name && <span className={styles.icon}><Icon /></span>}
                </div>
            </div>

            {!noFilter && <TextField
                inputRef={this._inputRef}
                variant='outlined'
                defaultValue={filter}
                onChange={this.handleInputChange}
            />}
        </div>;
    }
}


export default GridTitle;
