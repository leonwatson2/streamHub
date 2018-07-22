import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import io from 'socket.io-client'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ObsScreen from './components/ObsScreen';
import { REVERIFY, FOLLOWER_COUNT, NEW_FOLLOWER } from './Events'
const socketUrl = "http://localhost:3231"

export default class App extends Component {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
		  socket:null,
		  socketBacklog:[], 
		  loggedIn: false, 
		  followerCount: 0,
		  lastestFollower: ""
	  };
	}

	componentWillMount() {
		this.initSocket()
	}

	/*
	*	Connect to and initializes the socket.
	*/
	initSocket = ()=>{
		const socket = io(socketUrl)

		socket.on('connect', ()=>{
			console.log("Connected");
			this.doSocketBackLog()
		})
		socket.on('disconnect', ()=>{
			this.setState({ loggedIn: false })
		})
		socket.on(REVERIFY, () => {
			this.setState({ loggedIn: false })
		})
		socket.on(NEW_FOLLOWER, (follower) => {
			this.setState({ lastestFollower: follower })
		})
		socket.on(FOLLOWER_COUNT, (value)=>{
			this.setState({ followerCount: +value })
		})
		this.setState({socket});
	}

	doSocketBackLog = () =>{
		const { socket, socketBacklog } = this.state
		socketBacklog.forEach(({ ev, payload })=>{ 
			socket.emit(ev, payload)
		})
	} 

	sendConfirmationCode = (code) => {
		const { socket, socketBacklog } = this.state
		if(socket) {
			socket.emit('verification_code', code)
			this.setState({loggedIn: true})
		}else {
			const newSocketBacklog = [...socketBacklog, {ev:'verification_code', payload: code }]
			this.setState({ socketBacklog:newSocketBacklog })
		}
	}

	render() {
		const { loggedIn, socket, followerCount, lastestFollower } = this.state
		
		return (
			<div className="container">
				<Route exact path="/" render={(props)=>(
					<Login {...props} sendConfirmationCode={this.sendConfirmationCode} loggedIn={loggedIn}/>
				)} />
				<Route exact path="/dashboard" render={ props=>(<Dashboard {...props} socket={socket} loggedIn={loggedIn} />) } />
				<Route exact path="/obs" 
						render={ props=>(<ObsScreen {...props} socket={socket} 
						loggedIn={loggedIn} 
						count={followerCount} 
						goal={10}
						follower={lastestFollower}/>) } />
			</div>
		);
	}
}

