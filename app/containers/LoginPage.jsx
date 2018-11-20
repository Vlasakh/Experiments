// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import type { AuthResponse } from 'Types/types.flow';
import type { Action } from 'Types/common';

// Services
import authenticationService from '../api/authenticationService';

// Actions
import setLoggedIn from '../actions/loginPageActions';

// Components
import LoginPage from 'Components/organisms/loginPage/LoginPage.jsx';


type Props = {
    authorized: boolean,
    setLoggedIn: Action,
}

type WindowPopup = {
    close: Function
};

class LoginPageContainer extends Component<Props>
{
    _windowInstance: WindowPopup;

    componentDidMount()
    {
        window.addEventListener('message', this.getAuthToken, false);
    }

    componentWillUnmount()
    {
        window.removeEventListener('message', this.getAuthToken);
    }

    /**
     * Получает access token от Trello
     * @param payload
     */
    getAuthToken = (payload: AuthResponse) =>
    {
        if (payload.origin !== 'https://trello.com')
        {
            return;
        }

        // проверяем правильность формата токена
        if (/[0-9a-f]{64}/.test(payload.data))
        {
            window.localStorage.setItem('trello_token', payload.data);
            this._windowInstance.close();
            this.props.setLoggedIn(true, payload.data);
        }
        else
        {
            console.error('Не удалось получить accessToken'); // eslint-disable-line no-console
        }
    };

    /**
     * Открывает попап окно для верификации на Trello
     */
    handleLogIn = () =>
    {
        authenticationService().then(windowInstance => this._windowInstance = windowInstance);
    };

    render()
    {
        return (
            <LoginPage onLogIn={this.handleLogIn} />
        );
    }
}

LoginPageContainer.propTypes = {
    authorized: PropTypes.bool.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
};

LoginPageContainer.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default connect(
    state => ({
        authorized: state.UserStore.authorized,
    }),
    dispatch => ({
        ...bindActionCreators({
            setLoggedIn,
        }, dispatch),
    })
)(LoginPageContainer);
