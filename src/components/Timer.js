import React, { Component } from 'react'
import styled from 'styled-components'

const TimerWrap = styled.div`
    font-size: 8em;
    font-family: 'Asap', sans-serif;
    color: white
    
`
export default class Timer extends Component {
    constructor(){
        super()
        this.state = {
            endDate :new Date().getTime() + 60000*5, 
            time: null
        }
    }
    componentDidMount(){
        this.reset()
        this.start()
    }
    reset = () => {
        this.setState({ endDate: new Date().getTime() + 60000*5})
    }
    start = () => {
        setInterval(()=>{
            this.setState({ time: this.calculate() })
        }, 1000)
    }
    calculate = ()=> {
        const { endDate } = this.state
        let startDate = new Date();
        startDate = startDate.getTime();
        let minutes, seconds
        let timeRemaining = parseInt((endDate - startDate) / 1000);
        
        if (timeRemaining >= 0) {
          
          minutes = parseInt(timeRemaining / 60);
          timeRemaining = (timeRemaining % 60);
          
          seconds = parseInt(timeRemaining);
          return  `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`
        } else {
          return;
        }
      }
    render() {
        return (
            <TimerWrap>
                {this.state.time}
            </TimerWrap>
        )
    }
}
