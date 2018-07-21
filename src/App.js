import React, { Component } from 'react';
import io from 'socket.io-client'

const socketUrl = "http://localhost:3231"

export default class App extends Component {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	socket:null
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
		})
		
		this.setState({socket});
	}


	render() {
		const { socket } = this.state
		return (
			<div className="container">
			 
			</div>
		);
	}
}

