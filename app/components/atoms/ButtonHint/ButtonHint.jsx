// @flow
import React from 'react';
import classnames from 'classnames';

import noop from '@tinkoff/utils/function/noop';

import type { Component } from 'Types/common';

import Button from '@material-ui/core/Button';
import { PropTypes } from '@material-ui/core/index';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';

import styles from './buttonHint.css';


export const LEFT_ICON = Symbol();
export const COLOR_PRIMARY = 'primary';
export const COLOR_DEFAULT = 'default';
export const VARIANT_CONTAINED = 'contained';

type Variant = typeof VARIANT_CONTAINED;

type Props = {
    variant?: Variant,
    color?: PropTypes.Color,
    title?: string,
    onClick: Function,
    value?: string,
    icon?: Component,
    iconPos?: Symbol,
};

function ButtonHint(props: Props)
{
    const {
        variant,
        color,
        title,
        onClick,
        value,
        icon: Icon,
        iconPos,
    } = props;
    const exBtnProps = {};

    if (color)
    {
        exBtnProps.color = color;
    }

    return <div className={styles.wrapper}>
        <Tooltip title={title}>
            <Button
                variant={variant}
                onClick={onClick}
                {...exBtnProps}
            >
                {iconPos === LEFT_ICON ?
                    <React.Fragment>
                        {Icon && <Icon className={classnames({ [styles.iconLeft]: value })} />}
                        {' '}
                        {value}
                    </React.Fragment> :
                    <React.Fragment>
                        {value}
                        {' '}
                        {Icon && <Icon className={classnames({ [styles.iconRight]: value })} />}
                    </React.Fragment>
                }
            </Button>
        </Tooltip>
    </div>;
}

ButtonHint.defaultProps = {
    title: '',
    value: '',
    variant: VARIANT_CONTAINED,
    color: COLOR_DEFAULT,
    onClick: noop,
    iconPos: Symbol(),
};

export default React.memo(ButtonHint);
