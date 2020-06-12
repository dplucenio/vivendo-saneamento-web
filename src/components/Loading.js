import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import * as fontAwesome from 'react-icons/fa';

let Header = styled.h1`  
  margin: 0rem 0.2rem 2rem 0.2rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 2.4rem;
  line-height: 2.5rem;
  font-family: 'Pacifico';
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  font-weight: 500;
  color: #fff;
  @media (min-width: 800px) {
    margin-top: 1rem;
    font-size: 2.6rem;
  }
  @media (min-width: 1400px) {
    font-size: 3rem;
  }
  svg {
    margin-left: 1rem;
  }
  svg {
    text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

let LoadingDiv = styled.div`
  margin: 1rem 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 250px;
  ${css`
    svg {
      animation: ${rotate} 1.2s linear infinite
      }
    `}
`;

const Loading = React.forwardRef((props, ref) => {
  return (
    <LoadingDiv ref={ref}>
      <Header><fontAwesome.FaSpinner /></Header>
    </LoadingDiv>
  )
});

export default Loading;