import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { redirectUri, clientId } from '../config.json';
import PropTypes from 'prop-types'
import queryString from 'query-string';

export default class Login extends Component {
    static propTypes = {
        sendConfirmationCode: PropTypes.func.isRequired,
    }
    componentWillMount() {
		this.checkForRedirect()
    }
    checkForRedirect = () => {
        const parsed = queryString.parse(this.props.location.search)
        if(parsed.code){
            this.props.sendConfirmationCode(parsed.code)
        }
    }
    render() {
        const { loggedIn } = this.props
        return (
            <div>
                 { loggedIn && <Redirect to={'/dashboard'}/>}
                <button>
						<a href={`https://id.twitch.tv/oauth2/authorize
							?client_id=${clientId}
							&redirect_uri=${redirectUri}
							&response_type=code
							&scope=user_read`}> Log in with Twitch
						</a>
					</button>
            </div>
        )
    }
}
