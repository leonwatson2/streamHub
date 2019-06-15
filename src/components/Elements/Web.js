import React, { Component } from 'react'
import styled from 'styled-components'

const Web = styled.div`
    position: absolute;
    bottom: 50px;
    right: 50px;
    transform: scale(1.5) rotate(90deg);
`
export default class WebComponent extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Web>
                <img className="web-left" src="http://www.scandiafun.com/images/spiderweb-corner-right.png" alt="Spider"></img>
            </Web>
        )
    }
}
