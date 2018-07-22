import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 20%;
    height:100%;
    
`
const Section = styled.div`
    position: relative;
    background: linear-gradient(#02601D, transparent 90%);
    text-align: center;
    height: 20%;
    color: white;
    width: 100%;
    border: solid 1px linear-gradient(white, transparent 90%);
    border-bottom-width: 0;
`
const Title = styled.div`
    color: #fff;
    padding: 0px 20px;
    background: transparent;
    height: 20%;
    width: 100%;
    z-index: 2;
`
const FollowerGoal = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    height: 80%;
`
const Number = styled.div`
    display: inline-block;
    color: white;
    font-size: 40px;
`
const Name = styled.div`
    display: grid;
    align-items: center;
    color: white;
    font-size: 30px;
    height: 80%;

`
const ProgressBar = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(#fff, transparent 90%);
    height: ${props=>`${props.percentage*100}%`};
    width: 4px;
    transition: 2s;
    z-index: 1;
`

export default class ObsScreen extends Component {
    static propTypes = {
        count: PropTypes.number,
    }

    render() {
        const { count, follower, goal } = this.props
        return (
                <Container>
                <Section> <Title>Push Ups Today</Title> <Name>10</Name></Section> 
                <Section> <Title>Lastest Follower</Title> <Name>{follower}</Name></Section> 
                <Section> <Title>Follower Goal</Title> 
                    <FollowerGoal>
                        <Number>{count}</Number><span>of</span>
                        <Number>{goal}</Number>
                        <ProgressBar percentage={count/goal} />
                    </FollowerGoal>
                </Section> 
                </Container>         
        )
    }
}
