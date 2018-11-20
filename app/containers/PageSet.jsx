// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import type { Action } from 'Types/common';

import Set from 'Components/organisms/set/Set.jsx';
import readSetDataAction from 'Actions/sets/readSetData';

type Props = {
    match: Object,
    readSetData: Action,
}

class PageSet extends Component<Props>
{
    constructor(props)
    {
        super(props);

        const { match: { params: { id } }, readSetData } = props;

        readSetData(id);
    }

    render()
    {
        return <Set {...this.props} />;
    }
}

function mapStateToProps({ SetsStore: { currentSetData, setsMeta } })
{
    return {
        currentSetData,
        setsMeta,
    };
}

function mapActionsToProps(dispatch)
{
    return bindActionCreators({
        readSetData: readSetDataAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(PageSet);
