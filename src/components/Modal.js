import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import MessageForm from '../components/MessageForm';
import * as fontAwesome from 'react-icons/fa';

let Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 18px 7px 0 0;
  transition: 400ms padding ease;
  @media(min-width: 600px) {
    padding: 1rem 1rem 0 0;
  }
`;

let Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #2ab7caf7;
  z-index: 300;
  color: white;
  display: flex;
  opacity: ${props => props.visible ? '1' : '0'};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  flex-direction: column;
  justify-content: center;
  transition: 500ms opacity ease, 500ms visibility ease;
`;

function SubscribeModal({ closeModal }) {
  let [visible, setVisible] = useState(false);

  let handleKeyPress = useCallback((e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  }, [closeModal])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);
    setTimeout(() => setVisible(true), 0);
    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
    }
  }, [handleKeyPress]);

  return (
    <Wrapper visible={visible} onKeyPress={handleKeyPress}>
      <Header>
        <fontAwesome.FaTimes
          size="1.5rem"
          style={{ cursor: 'pointer' }}
          onClick={closeModal}
        />
      </Header>
      <MessageForm />
    </Wrapper>
  )
}
SubscribeModal.defaultProps = {
  visible: true,
}

export default SubscribeModal;
