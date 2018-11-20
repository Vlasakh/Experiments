// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import noop from '@tinkoff/utils/function/noop';

import initLearnSetArraysAction from 'Actions/sets/initLearnSetArrays';
import toggleLanguageAction from 'Actions/sets/toggleLanguage';
import goNextWordAction from 'Actions/sets/goNextWord';
import goPrevWordAction from 'Actions/sets/goPrevWord';
import rememberLaterAction from 'Actions/sets/rememberLater';
import loadRememberLaterAction from 'Actions/sets/loadRememberLater';
import revertToListAction from 'Actions/sets/revertToList';
import shuffleAction from 'Actions/sets/shuffle';
import goToBeginningAction from 'Actions/sets/goToBeginning';

import LearnSet from '../components/organisms/learnSet/LearnSet.jsx';
import RepeatSet from '../components/organisms/repeatSet/RepeatSet.jsx';

export const MODE_LEARN = 'learn';

type Props = {
    match: Object,
    initLearnSetArrays: noop,
    routeProps: {
        mode: string
    }
}

// eslint-disable-next-line react/require-optimization
class PageLearnSet extends Component<Props>
{
    constructor(props)
    {
        super(props);

        const { match: { params: { id } }, initLearnSetArrays } = props;

        initLearnSetArrays(id);
    }

    render()
    {
        const { routeProps: { mode } = {} } = this.props;
        const ModeComponent = mode === MODE_LEARN ? LearnSet : RepeatSet;

        // $FlowFixMe
        return <ModeComponent {...this.props} />;
    }
}

function mapStateToProps({
    SetsStore: {
        language,
        currentSetData,
        currentIterationSet,
        currentIterationSetIndex,
        currentSetRight,
        currentSetWrong,
        setsMeta,
    },
    ApplicationStore: {
        routeMatch,
    },
})
{
    return {
        routeMatch,
        language,
        currentSetData,
        currentIterationSet,
        currentIterationSetIndex,
        currentSetRight,
        currentSetWrong,
        setsMeta,
    };
}

function mapActionsToProps(dispatch)
{
    return bindActionCreators({
        initLearnSetArrays: initLearnSetArraysAction,
        toggleLanguage: toggleLanguageAction,
        goNextWord: goNextWordAction,
        goPrevWord: goPrevWordAction,
        rememberLater: rememberLaterAction,
        loadRememberLater: loadRememberLaterAction,
        revertToList: revertToListAction,
        shuffle: shuffleAction,
        goToBeginning: goToBeginningAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(PageLearnSet);
