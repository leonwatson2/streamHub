import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(${props=>`${props.count}`}, 1fr);
    align-items: end; 
    height:100%;
    font-family: 'Asap', sans-serif;
`
const Section = styled.div`
    position: relative;
    background: linear-gradient(to top, #000, transparent 90%);
    text-align: center;
    height: 7%;
    color: white;
    width: 100%;
    border: solid 1px linear-gradient(white, transparent 90%);
    border-bottom-width: 0;
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
`
const Title = styled.div`
    color: #fff;
    padding: 0px 20px;
    background: transparent;
    height: 20%;
    width: 100%;
    z-index: 2;
    margin-bottom: 10px
`
const FollowerGoal = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    height: 80%;
`
const Number = styled.div`
    position: relative;
    display: inline-block;
    color: #04AD34;
    font-size: 36px;
    bottom: 10px;
    letter-spacing: 4px;
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
    background: linear-gradient(#fff, transparent 95%);
    height: ${props=>`${props.percentage*100}%`};
    width: 4px;
    transition: 2s;
    z-index: 1;
`

function Label(props){
    if(props.isGoal){
        return (<Section> <Title>{props.title}</Title> 
            <FollowerGoal>
                <Number>{props.count}</Number><span>of</span>
                <Number>{props.goal}</Number>
                <ProgressBar percentage={props.count/props.goal} />
            </FollowerGoal>
        </Section> )
    }else {
        return (<Section> <Title>{props.title}</Title> <Name>{props.value}</Name></Section>)
    }
    
}
export default class ObsScreen extends Component {
    static propTypes = {
        count: PropTypes.number,
    }

    render() {
        const { labels, wins } = this.props
        return (
                <Container count={labels.length}>
                {
                    labels.map(label=> <Label {...label} />)
                }
                <Section>
                    <Title>Wins</Title>
                    <Name>{wins}</Name>
                </Section>
                </Container>         
        )
    }
}

