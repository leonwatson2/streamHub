import React, { Component } from 'react'
import TwitchVid from './TwitchVid';
import { uniq } from 'underscore'
export default class TwitchVids extends Component {
    constructor(){
        super()

        this.state = {
            numberOfStreams: 0,
            streams: ['anticss'],
            newStream: ''
        }
    }
    componentWillMount(){
        if(localStorage.getItem('streams')){
            const streams = JSON.parse(localStorage.getItem('streams'))
            this.setState({ streams })
        }
    }
    updateStreams = () => {
        const { newStream, streams } = this.state
        this.setState({ streams:uniq([...streams, newStream]) })
        localStorage.setItem( 'streams', JSON.stringify(uniq([...streams, newStream]) ))
    }
    newStream = (event)=>{
        const { target: { value } } = event
        this.setState({ newStream: value })
    }
    remove = (channel)=> ( ) => {
        const {streams} = this.state
        const newStreams = streams.filter(chan => chan !== channel)
        this.setState({ streams: newStreams })
        localStorage.setItem( 'streams', JSON.stringify(newStreams))
    }
    render() {
        const { streams } = this.state
        return (
            <div style={{ display: 'grid', gridTemplateColumns:`repeat(${streams.length > 2 ? 2 : streams.length}, 1fr)` }}>
                {
                    streams.map(channel=> <TwitchVid key={channel} channel={channel}></TwitchVid>)
                }
                {
                    streams.map(c=><h3>{c} <button className={'btn'} onClick={this.remove(c)}>x</button></h3>)
                }
                <input type="text" onChange={this.newStream}/>
                <button className={'btn-primary'} name={'streamName'} onClick={ this.updateStreams } disabled={this.state.newStream.length < 3}>Add</button>
            </div>
        )
    }
}
