import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { shade, tint } from 'polished';
import * as fontAwesome from 'react-icons/fa';
import * as yup from 'yup';
import MyContainer from '../components/MyContainer';
import api from '../api';
import axios from 'axios';

let Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 90%;
  left: 50%;
  transition: 300ms transform ease, 300ms opacity ease;
  opacity: ${props => props.visible ? '1' : '0'};
  transform: translateX(-50%) ${props => props.visible ? 'translateY(0px)' : 'translateY(-10px)'};
`;

let Arrow = styled.div`
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;  
  border-bottom: 5px solid #fb6376ff;
`;

let TooltipWrapper = styled.div`    
    font-family: 'Open Sans';
    padding: 0.5rem;
    background-color: #fb6376ff;
    border-radius: 8px;
    p {
      text-align: center;
    }
`;

function ToolTip({ children }) {
  let [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 0);
  })
  return (
    <Outer visible={visible}>
      <Arrow />
      <TooltipWrapper>
        {children}
      </TooltipWrapper>
    </Outer>
  )
}

let InnerWrapper = styled.div`
  flex-grow: 1;
  background-color: 'transparent';
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem 4rem 1rem;
  h1 {
    margin: 0 0 0.5rem 0;
    text-align: center;
    font-size: 2.4rem;
    line-height: 2.5rem;
    font-family: 'Pacifico';
    text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
    font-weight: 500;
    color: #fff;
    @media (min-width: 800px) {
      font-size: 3rem;
      margin: 1rem 0;
    }
    @media (min-width: 1400px) {
      font-size: 3rem;
    }
  }
  
  form {
    display: flex;
    flex-direction: column;
    input, textarea {
      font-size: 1rem;
      font-family: 'Open Sans';
      color: #333;
      border: none;
      border-radius: 8px;
      background-color: ${props => tint(0.9, props.color)};
      outline: none;
      margin: 0.25rem 0;
      height: 2.6rem;
      padding: 0.5rem 1.4rem;
      ::placeholder {
        color: ${props => tint(0, props.color)};
        opacity: 1;
      }
      @media(min-width: 800px) {
        margin: 0.25rem 0;
        font-size: 1.2rem;
        height: 3rem;
    }
  }

  button {
    font-size: 1.2rem;
    font-family: 'Open Sans';
    font-weight: 700;
    color: #fff;
    border: none;
    border-radius: 8px;
    background-color: ${props => shade(0.2, props.color)};
    border-bottom: 4px solid ${props => shade(0.25, props.color)};
    outline: none;    
    height: 2.6rem;
    padding: 0.2rem 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    transition: 300ms background-color ease;
    svg {
      margin: 0 6px 0 0;
    }
    &:hover {
      background-color: ${props => shade(0.25, props.color)};
    }
    @media(min-width: 800px) {        
        font-size: 1.2rem;
        height: 3rem;
    }
  }
  textarea {
    resize: none;
    height: 5rem;
    }
  }
`;

let ButtonWrapper = styled.div`
  margin: 0.25rem 0;
  position: relative;
`;

let ThankYouWrapper = styled.div`
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  transition: 500ms transform ease, 500ms opacity ease;
  opacity: ${props => props.visible ? '1' : '0'};
  transform: ${props => props.visible ? 'translateY(0px)' : 'translateY(40px)'};
  h1 {
    margin: 1rem 0 2rem 0;
    text-align: center;
    font-size: 2.4rem;
    line-height: 2.4rem;
    font-family: 'Pacifico';
    text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
    font-weight: 500;
    color: #ffffff;
    @media (min-width: 800px) {
      font-size: 3rem;
    }
  }
  p {
    color: #ffffff;
    text-align: center;
    font-weight: 600;
    text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
    font-size: 1.4rem;
  }
  svg {
    margin: 0 10px 0 0;
  }
`;

function ThankYou({ children }) {
  let [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 0);
  })
  return (
    <>
      <ThankYouWrapper visible={visible}>
        {children}
      </ThankYouWrapper>
    </>
  )
}

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

function MessageForm(props) {
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [content, setContent] = useState('');
  let [messageSent, setMessageSent] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');

  let schema = yup.object().shape({
    name: yup.string().required('Opa! Qual é o seu nome?'),
    email: yup.string().email('Opa! Precisamos de um e-mail válido')
      .required('Opa! Precisamos de um e-mail válido'),
    content: yup.string().required('Opa! Qual é a sua mensagem?')
  });

  function handleNameChange(e) {
    e.preventDefault();
    setErrorMessage('');
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    e.preventDefault();
    setErrorMessage('');
    setEmail(e.target.value);
  }

  function handleContentChange(e) {
    e.preventDefault();
    setErrorMessage('');
    setContent(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    schema.validate({ name, email: email.trim(), content })
      .then(res => {
        // api.post('/messages', { name, email: email.trim(), content })
        //   .then(res => console.log(res))
        //   .catch(err => console.log(err));
        axios.post(
          '/',
          encode({
            "form-name": "messageForm",
            name,
            email: email.trim(),
            content
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        setName('');
        setEmail('');
        setContent('');
        setErrorMessage('');
        setMessageSent(true);
      })
      .catch(err => {
        setErrorMessage(err.message);
      });
  }
  return (
    <InnerWrapper color={tint(0.0, '#2ab7caff')} id={props.id}>
      {!messageSent ?
        <>
          <h1>Entre em contato!</h1>
          <MyContainer widths={[
            { minWidth: '0px', width: '100%', maxWidth: '700px' }]}>
          </MyContainer>
          <MyContainer widths={[
            { minWidth: '400px', width: '24rem', maxWidth: '24rem' }]}>
            <form
              name="messageForm"
              onSubmit={handleSubmit}
              noValidate
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input
                type="text"
                name="name"
                placeholder="Como você se chama?"
                value={name}
                onChange={handleNameChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={handleEmailChange}
              />
              <textarea
                name="content"
                placeholder="Sua mensagem"
                value={content}
                onChange={handleContentChange}
              >
              </textarea>
              <ButtonWrapper>
                <button><fontAwesome.FaEnvelope /> Enviar</button>
                {errorMessage === ''
                  ? null
                  : <ToolTip>
                    <p>{errorMessage}</p>
                  </ToolTip>}

              </ButtonWrapper>
            </form>
          </MyContainer>
        </>
        :
        <ThankYou>
          <h1>Obrigada pela mensagem!</h1>
          <p>Vou te responder em breve.</p>
        </ThankYou>
      }

    </InnerWrapper>
  )
}

export default MessageForm;

