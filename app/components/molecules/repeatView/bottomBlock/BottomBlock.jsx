// @flow
import React, { PureComponent } from 'react';

import type { Action } from 'Types/common';

import IconHistory from '@material-ui/icons/History';
import IconShuffle from '@material-ui/icons/Shuffle';
import IconFastRewind from '@material-ui/icons/FastRewind';

import ButtonHint, { COLOR_PRIMARY } from 'Components/atoms/ButtonHint/ButtonHint.jsx';

import styles from './bottomBlock.css';

type Props = {
    isLast: boolean,
    loadRememberLater: Action,
    shuffle: Action,
    goToBeginning: Action,
};

class BottomBlock extends PureComponent<Props>
{
    render()
    {
        const {
            isLast,
            loadRememberLater,
            shuffle,
            goToBeginning,
        } = this.props;

        return <div className={styles.wrapper}>
            <ButtonHint
                title='To the beginning'
                onClick={goToBeginning}
                icon={IconFastRewind}
            />
            <ButtonHint
                title='Shuffle words cards'
                onClick={shuffle}
                value='Shuffle'
                icon={IconShuffle}
            />
            {isLast && <ButtonHint
                title='Load remember later list'
                color={COLOR_PRIMARY}
                value='Load'
                icon={IconHistory}
                onClick={loadRememberLater}
            />}
        </div>;
    }
}

export default BottomBlock;
