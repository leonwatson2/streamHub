import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
const wobble = keyframes`
    0%{
        transform:scale(.6) rotate(9deg);
    }

    100%{
        transform:scale(.6) rotate(-12deg);
    }
`
const Pumpkin = styled.div`
    animation: ${wobble} 3s alternate infinite;
    transform-origin: bottom center;
    border-radius: 50%;
    height: 20rem;
    width: 23rem;
    background: orange;
    margin-top: 6rem;
    position: absolute;
    bottom: 20px;
    left: 40px;
.pumpkin {
    &__root {
        border-radius: 25%;
        width: 2.1rem;
        height: 4rem;
        background: brown;
        position: absolute;
        left: 10rem;
        top: -3rem;
        z-index: 1;
        
        &::before {
            content: '';
            height: 3rem;
            width: 2.1rem;
            background: brown;
            position: absolute;
            transform: rotate(75deg);
            top: -0.8rem;
            left: 0.6rem;
            border-radius: 25%;
        }
    }

    &__stripe {
        height: inherit;
        width: 20rem;
        background: darkorange;
        border-radius: 50%;
        position: absolute;
        left: 1.3rem;
        z-index: 1;
        
        &-inner {
            background: orange;
            width: 12rem;
            height: inherit;
            border-radius: 50%;
            z-index: 2;
            position: absolute;
            left: 5rem;
        }
    }

    &__eyes {
    height: 4rem;
    width: 9rem;
    position: absolute;
    left: 6.9rem;
    z-index: 3;
    top: 5rem;
    
        &-eye {
            background: white;
            height: 4rem;
            width: 4rem;
            border-radius: 50%;
            position: absolute;
            
            &.-left {
            left: 0;
            
            &::after {
                content: '';
                height: 3rem;
                width: 3rem;
                background: black;
                position: absolute;
                border-radius: 50%;
                left: 0.5rem;
                top: 0.5rem;
            }
            }
            
            &.-right {
            right: 0;
            
            &::after {
                content: '';
                height: 3rem;
                width: 3rem;
                background: black;
                position: absolute;
                border-radius: 50%;
                left: 0.5rem;
                top: 0.5rem;
            }
            }
        }
    }

    &__mouth {
    height: 3rem;
    width: 10rem;
    overflow: hidden;
    position: relative;
    
    &::after {
        content: '';
        background: white;
        height: 1rem;
        width: 1rem;
        position: absolute;
        right: 2rem;
    }
    
    &-inner {
        border: 70px solid transparent;
        border-bottom-color: black;
        border-right-color: black;
        border-radius: 50%;
        height: 4rem;
        width: 4rem;
        transform: rotate(45deg);
        box-sizing: border-box;
        position: absolute;
        left: 1.5rem;
        bottom: 0;
    }
    
    &-container {
        position: absolute;
        left: 5.8rem;
        z-index: 5;
        bottom: 6.5rem;
    }
    }

    &__cheeks {
        position: relative;
        
        &-cheek {
            background: orange;
            height: 3rem;
            width: 3rem;
            border-radius: 50%;
            position: absolute;
            
            &.-left {
            left: 1.7rem;
            top: 8rem;
            z-index: 6;
            }
            
            &.-right {
            right: 2.2rem;
            top: 8rem;
            z-index: 6;
            }
        }
    }
}
`
export default class PumpkinComponent extends Component {
    render() {
        return (
        <Pumpkin>
            <div className="pumpkin__root"></div>
                <div className="pumpkin__stripe"></div>
                <div className="pumpkin__stripe-inner"></div>
                <div className="pumpkin__eyes">
                <div className="pumpkin__eyes-eye -left"></div>
                <div className="pumpkin__eyes-eye -right"></div>
            </div>
            <div className="pumpkin__mouth-container">
                <div className="pumpkin__mouth">
                    <div className="pumpkin__mouth-inner"></div>
                </div>
            </div>
            <div className="pumpkin__cheeks-container">
                <div className="pumpkin__cheeks">
                    <div className="pumpkin__cheeks-cheek -left"></div>
                    <div className="pumpkin__cheeks-cheek -right"></div>
                </div>
            </div>
        </Pumpkin>
        )
    }
}
