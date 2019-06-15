import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
const animate = keyframes`
    0%{
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }

    100%{
        transform: translateY(-1400px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }
`;
const Page = styled.div`
    // background: linear-gradient(to left, #02601D, #04AD34);
    background: linear-gradient(
        to left,
        ${props => props.theme.main},
        ${props => props.theme.secondary}
    );
    width: 100%;
    height: 100%;
`;
const Circles = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const Circle = styled.div`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    left: ${props => props.offset}%
    position: absolute;
    display: white;
    list-style: none;
    background: rgba(255, 255, 255, 0.2);
    animation: ${animate} 25s linear infinite;
    bottom: -300px;
    animation-delay: ${props => props.delay}s;
    // background-image: url('https://www.clipartmax.com/png/middle/50-505425_black-fall-leaves-icon-image-fall-leaf-icon.png');
    // background-size: contain;
`;

export default class ObsCamScreen extends Component {
    static propTypes = {
        numberOfSquares: PropTypes.number
    };

    static defaultProps = {
        numberOfSquares: 25
    };
    render() {
        const { numberOfSquares } = this.props;
        const circles = Array.apply(null, Array(numberOfSquares)).map(function(
            x,
            i
        ) {
            return i;
        });
        return (
            <Page>
                <Circles>
                    {circles.map(cir => {
                        return (
                            <Circle
                                key={cir}
                                offset={Math.floor(Math.random() * 100)}
                                size={Math.floor(Math.random() * 50) + 30}
                                delay={Math.floor(Math.random() * 20)}
                            />
                        );
                    })}
                </Circles>
            </Page>
        );
    }
}
