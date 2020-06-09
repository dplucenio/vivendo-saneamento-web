import React from 'react';
import styled from 'styled-components';

let OuterWrapper = styled.div`
  margin: ${props => props.overlay ? '-70px 0 0 0' : 'none'};
  opacity: ${props => props.visible ? '1' : '0'};
  transform: ${props => props.visible ? 'translateY(0px)' : 'translateY(100px)'};
  transition: 500ms opacity ease, 500ms transform ease;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function setupWidths({widths}) {
  return (
    widths.map(e => `
    @media(min-width: ${e.minWidth}) {
      width: ${e.width};
      max-width: ${e.maxWidth};
    }`).join('\n')
  );
}

let InnerWrapper = styled.div`
  width: 100%;
  transition: 500ms max-width ease, 500ms width ease;
  ${setupWidths};
`;

function MyContainer({ children, visible, overlay, widths }) {
  return (
    <OuterWrapper visible={visible} overlay={overlay}>
      <InnerWrapper widths={widths}>
        {children}
      </InnerWrapper>
    </OuterWrapper>
  )
}

MyContainer.defaultProps = {
  visible: true,
  overlay: false,
  widths: [
    {
      minWidth: '800px',
      width: '80%',
      maxWidth: '800px'
    },
    {
      minWidth: '1200px',
      width: '90%',
      maxWidth: '1200px'
    },
    {
      minWidth: '1400px',
      width: '90%',
      maxWidth: '1400px'
    }
  ]
}

export default MyContainer;