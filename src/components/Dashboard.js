import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'

export default class Dashboard extends Component {
    constructor(){
        super();

        this.state = {
            followers: []
        }
    }
    static propTypes = {
        socket: PropTypes.object,
    }
    getFollowers = () => {
        const { socket } = this.props
        socket.emit('get_followers', this.setFollowers)
    }
    setFollowers = (followers) => {
        console.log(followers)
        this.setState({ followers })
    }
   
    render() {
        const { followers } = this.state
        const { loggedIn } = this.props
        return (
            <div>
                { !loggedIn && <Redirect to={'/'}/>}
                <h2><Link to="/">Dashboard</Link></h2>
                <ul>
                    {
                        followers.map(fl=>{
                            return <li>{fl.display_name}</li>
                        })
                    }
                </ul>
                <button onClick={ this.getFollowers }>Get followers</button>
            </div>
        )
    }
}
