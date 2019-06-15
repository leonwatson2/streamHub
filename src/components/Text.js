import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const fade = keyframes`
    0%{
        opacity: 1;
    }

    100%{
        opacity: 0;
    }
`
const Hac = styled.h1`
    font-family: 'Asap';
    font-size: 7rem;
    color: white;
    animation: ${fade} 3s alternate infinite;
    margin: 0;
`
export default class Text extends Component {
    render() {
        const { text } = this.props
        return (
                <Hac>
                {text}
                </Hac>
        )
    }
}
