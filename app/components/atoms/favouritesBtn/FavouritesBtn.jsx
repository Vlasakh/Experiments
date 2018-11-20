import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import noop from '@tinkoff/utils/function/noop';

import IconStar from '@material-ui/icons/Star';

import styles from './favouritesBtn.css';

export const COLOR_DISABLED = 'disabled';
export const COLOR_DEFAULT = 'default';


class FavouritesBtn extends PureComponent
{
    static propTypes = {
        id: PropTypes.number.isRequired,
        favourites: PropTypes.object,
        onSetFavourite: PropTypes.func,
    };

    static defaultProps = {
        favourites: {},
        onSetFavourite: noop,
    };

    handleSetFav = event =>
    {
        event.preventDefault();

        const { id, onSetFavourite } = this.props;

        onSetFavourite(id);
    };

    render()
    {
        const { id, favourites } = this.props;

        return <a href='#' onClick={this.handleSetFav}>
            <IconStar color={favourites[id] ? COLOR_DEFAULT : COLOR_DISABLED} />
        </a>;
    }
}


export default FavouritesBtn;
