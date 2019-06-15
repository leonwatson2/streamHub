import React, { Component } from 'react'

var Twitch = window.Twitch;
export default class TwitchVid extends Component {
    constructor(){
        super()
        this.state = {
            player: null
        }
    }
    setRatio = () => {
        const { channel } = this.props

        var mapElement = document.getElementById(`${channel}-vid`);
        const newH =  mapElement.offsetWidth * .75;
        mapElement.style.height = `${newH}px`
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.setRatio)
    }
    componentDidMount(){
        const { channel } = this.props
        window.addEventListener("resize", this.setRatio);
        const options = {
            width: '100%',
            height: '100%',
            channel,
            allowfullscreen: true,
            layout: 'video'
        }
        const player = new Twitch.Player(`${channel}-vid`, options)
        console.log(Twitch.Player.PLAY);
        
        player.addEventListener(Twitch.Player.PLAY, this.setRatio)
        player.setVolume(0.1);
        console.log(player, channel);
        
        this.setState({ player })
    }
    render() {
        const { channel } = this.props
        return (
            <div id={`${channel}-vid`}>

            </div>
        )
    }
}
