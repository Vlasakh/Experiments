// @flow
import React, { Component } from 'react';

import find from 'Utils/array/find';

import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import Layout from 'Components/layouts/withSidebar/WithSidebar.jsx';

import type { SetData, SetMeta } from 'Stores/SetsStore.flow';
import type { Match } from 'Stores/ApplicationStore.flow';

import stylesDynamic from './stylesDynamic';
import styles from './set.css';

const EMPTY_META: SetMeta = {
    title: '',
    comment: '',
    id: '',
};

const getSetTitle = (setsMeta: SetMeta[], inId: string): SetMeta =>
    find(({ id }) => id === inId)(setsMeta) || EMPTY_META;

type Props = {
    currentSetData: SetData[],
    match: Match,
    setsMeta: SetMeta[],
};
type State = {
    value: number,
    id: string,
    setsMeta: SetMeta[],
    setMeta: {
        title: string,
        comment: string,
    },
}

class Set extends Component<Props, State>
{
    static getDerivedStateFromProps({ setsMeta }, { setsMeta: prevSetsMeta, id })
    {
        if (setsMeta !== prevSetsMeta)
        {
            return {
                setsMeta,
                setMeta: getSetTitle(setsMeta, id),
            };
        }

        return null;
    }

    state = {
        value: 0,
        id: '',
        setsMeta: [],
        setMeta: EMPTY_META,
    };

    constructor(props)
    {
        super(props);

        const { setsMeta, match: { params: { id } } } = this.props;

        Object.assign(this.state, {
            id,
            setsMeta,
            setMeta: getSetTitle(setsMeta, id),
        });
    }

    handleChange = (event, value) =>
    {
        this.setState({ value });
    };

    render()
    {
        const { currentSetData } = this.props;
        const { setMeta: { title, comment } = {} } = this.state;

        return (
            <Layout
                title={title}
                subtitle={comment}
            >
                <div className={styles.pageSet}>
                    <AppBar
                        className={styles.tabsBar} position='static'
                        color='default'
                    >
                        <Tabs
                            className={styles.tabs}
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor='primary'
                            textColor='primary'
                        >
                            <Tab label='Foreign' />
                            <Tab label='Ru' />
                            <Tab label='Foreign - Ru' />
                        </Tabs>
                        <div className={styles.wordsCount} title='Words count'>
                            <Chip label={currentSetData.length} />
                        </div>
                    </AppBar>

                    <div className={styles.tabsContent}>
                        <SwipeableViews
                            index={this.state.value}
                        >
                            <Typography component='div'>
                                {currentSetData.map((item, idx) => <div key={idx}>{/* eslint-disable-line react/no-array-index-key */}
                                    {idx + 1}. <b>{item.foreign}</b>
                                    {item.transcription ? ` [${item.transcription}]` : ''}
                                </div>)}
                            </Typography>
                            <Typography component='div'>
                                {currentSetData.map((item, idx) => <div key={idx}>{/* eslint-disable-line react/no-array-index-key */}
                                    {idx + 1}. {item.ru}
                                </div>)}
                            </Typography>
                            <Typography component='div'>
                                {currentSetData.map((item, idx) => <div key={idx}>{/* eslint-disable-line react/no-array-index-key */}
                                    {idx + 1}. <b>{item.foreign}</b> {item.transcription ? ` [${item.transcription}]` : ''} - {item.ru}
                                </div>)}
                            </Typography>
                        </SwipeableViews>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default withStyles(stylesDynamic, { withTheme: true })(Set);
