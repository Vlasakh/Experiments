// @flow
import type { Dispatch } from 'redux';
import type { ActionProto } from 'Types/common';
import type { SetData } from 'Stores/SetsStore.flow';

import dispatchAction from 'Core/dispatchAction';
import { SET_CURRENT_ITERATION_SET_INDEX } from 'Actions/constants/words';

const goToBeginning: ActionProto<SetData[], null> = () => (dispatch: Dispatch) =>
{
    dispatchAction(dispatch, SET_CURRENT_ITERATION_SET_INDEX, 0);
};

export default goToBeginning;
