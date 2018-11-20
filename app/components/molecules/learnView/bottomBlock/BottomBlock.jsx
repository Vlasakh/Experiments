// @flow
import React, { PureComponent } from 'react';

import type { Action } from 'Types/common';

import IconHistory from '@material-ui/icons/History';
import IconFastRewind from '@material-ui/icons/FastRewind';

import ButtonHint, { COLOR_PRIMARY } from 'Components/atoms/ButtonHint/ButtonHint.jsx';

import styles from './bottomBlock.css';

type Props = {
    isLast: boolean,
    loadRememberLater: Action,
    goToBeginning: Action,
};

class BottomBlock extends PureComponent<Props>
{
    render()
    {
        const {
            isLast,
            loadRememberLater,
            goToBeginning,
        } = this.props;

        return <div className={styles.wrapper}>
            <ButtonHint
                title='To the beginning'
                onClick={goToBeginning}
                icon={IconFastRewind}
            />
            {isLast && <ButtonHint
                title='Load remember later list'
                color={COLOR_PRIMARY}
                onClick={loadRememberLater}
                value='Load'
                icon={IconHistory}
            />}
        </div>;
    }
}

export default BottomBlock;
