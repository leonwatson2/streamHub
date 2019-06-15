import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const Shoutout = styled.div`
  font-size: 80px;
  color: ghostwhite;
  text-align: center;
  margin-bottom: 2em;
`;
const Title = styled.div`
  font-size: 0.75em;
  font-weight: bold;
  text-transform: lowercase;
`;
const GlobalBackground = createGlobalStyle`
    body {
        background: transparent !important;
    }
`;
const Value = styled.div`
  font-size: 1em;
`;
export default class ShoutoutContainer extends Component {
  render() {
    const { labels } = this.props;
    return (
      <div>
        <GlobalBackground />
        {labels
          .filter(label => !label.isGoal)
          .map(label => (
            <Shoutout>
              <Title>{label.title}</Title>
              <Value>{label.value}</Value>
            </Shoutout>
          ))}
      </div>
    );
  }
}
