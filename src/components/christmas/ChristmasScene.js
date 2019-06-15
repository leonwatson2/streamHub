import React, { Component } from 'react'
import './index.css'
import styled from 'styled-components'

const Christmas = styled.div`
    left: ${props=> props.isBig ? '15%': '10%'};
    top: ${props=> props.isBig ? '25%': '88%'};
    transform: translate3d(-50%, -50%, 0) scale(${props=> props.isBig ? '2': '1'});
`

export default class ChristmasScene extends Component {
    componentDidMount(){
        setTimeout(() => {
            Array.from(document.getElementsByClassName('preload')).forEach((el)=>{
                el.classList.remove('preload') 
            })
        }, 3000)
    }
    render() {
        return (
            <div className="christmas-container preload">
                <Christmas id="christmas" isBig={this.props.isBig}>
                    <div className="flake large f-1"></div>
                    <div className="flake large f-2"></div>
                    <div className="flake large f-3"></div>
                    <div className="flake large f-4"></div>
                    <div className="flake large f-5"></div>
                    <div className="flake large f-6"></div>
                    <div className="flake large f-7"></div>
                    <div className="flake large f-8"></div>
                    <div className="flake large f-9"></div>
                    <div className="flake large f-10"></div>
                    <div className="flake large f-11"></div>
                    <div className="flake large f-12"></div>
                    <div className="flake large f-13"></div>
                    <div className="flake large f-14"></div>
                    <div className="flake large f-15"></div>
                    <div className="flake large f-16"></div>
                    <div className="flake large f-17"></div>
                    <div className="flake f-18"></div>
                    <div className="flake f-19"></div>
                    <div className="flake f-20"></div>
                    <div className="flake f-21"></div>
                    <div className="flake f-22"></div>
                    <div className="flake f-23"></div>
                    <div className="flake f-24"></div>
                    <div className="flake f-25"></div>
                    <div className="flake f-26"></div>
                    <div className="flake f-27"></div>
                    <div className="flake f-28"></div>
                    <div className="flake f-29"></div>
                    <div className="flake f-30"></div>
                    <div className="flake f-31"></div>
                    <div className="tree left">
                        <div className="snow"></div>
                    </div>
                    <div className="tree right">
                        <div className="snow"></div>
                    </div>
                    <div className="ground"></div>
                </Christmas>
            </div>

        )
    }
}
