import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { tint, shade } from 'polished'
import * as fontAwesome from 'react-icons/fa';
import * as yup from 'yup';
import axios from 'axios';
import api from '../api';

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

let SubscribedDiv = styled.div`
  margin: 1rem 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 250px;
  ${Header} {
    text-align: center;
    transform: ${props => props.visible ? 'translateY(0px)' : 'translateY(40px)'};
    transition: 500ms opacity ease, 500ms transform ease;
  opacity: ${props => props.visible ? '1' : '0'};
  }
`;

const Subscribed = React.forwardRef(({ children }, ref) => {
  let [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 0);
  });
  return (
    <SubscribedDiv visible={visible} ref={ref}>
      {children}
    </SubscribedDiv>
  )
});


const InputBox = styled.div`
  position: relative;
  width: 80%;
  max-width: 400px;
  border: 2px solid ${props => props.isInvalid ? '#fb6376ff' : 'transparent'};
  border-radius: 10px;
  @media(min-width: 1400px) {
      max-width: 500px;
    }
`;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: -60%;
  transition: 300ms transform ease, 300ms opacity ease;
  opacity: ${props => props.visible ? '1' : '0'};
  transform: translateX(-50%) ${props => props.visible ? 'translateY(0px)' : 'translateY(10px)'};
`;

const ArrowDown = styled.div`
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #fb6376ff;
`;

const ToolTipWrapper = styled.div`
  background-color: #fb6376ff;
  font-family: 'Open Sans';
  padding: 0.5rem;
  border-radius: 8px;
  color: #ffffffff;

  width: 19rem;
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
  });
  return (
    <Outer visible={visible}>
      <ToolTipWrapper >
        {children}
      </ToolTipWrapper>
      <ArrowDown />
    </Outer>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  min-height: 250px;
  margin: 1rem 0 0 0;
  input, textarea {
    font-size: 1rem;
    font-family: 'Open Sans';
    text-align: center;
    color: #333;
    border: none;
    border-radius: 8px;
    background-color: ${props => tint(0.9, '#2ab7caff')};
    outline: none;
    height: 2.6rem;
    width: 100%;
    padding: 0 1.4rem;
    ::placeholder {
      color: ${props => tint(0, '#2ab7caff')};
      opacity: 1;
    }
    @media(min-width: 800px) {
      font-size: 1.1rem;
      height: 2.6rem;
    }
    @media(min-width: 1400px) {
      font-size: 1.2rem;
      height: 3rem;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-family: 'Open Sans';
    font-weight: 700;
    color: #333;
    border: none;
    border-radius: 8px;
    background-color: ${props => shade(0.0, '#fed766ff')};
    outline: none;
    margin: 0.5rem 0;
    height: 2.6rem;
    width: 80%;
    max-width: 400px;
    padding: 0.2rem 1.4rem;
    cursor: pointer;
    transition: 300ms background-color ease, 300ms border-bottom ease;
    &:hover {
      background-color: ${props => shade(0.1, '#fed766ff')};
    }
    * {
      margin: 0 4px;
    }
    @media(min-width: 800px) {
      font-size: 1.1rem;
      height: 2.6rem;
    }
    @media(min-width: 1400px) {
      font-size: 1.2rem;
      height: 3rem;
      max-width: 500px;
    }
  }
`;

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const NewsletterForm = React.forwardRef((props, ref) => {

  let [email, setEmail] = useState('');
  let [isSubscribed, setIsSubscribed] = useState(false);
  let [isInvalid, setIsInvalid] = useState(false);

  let schema = yup.object().shape({
    email: yup.string()
      .email('Opa! Precisamos de um e-mail válido')
      .required('Opa! Precisamos de um e-mail válido')
  });

  function handleEmailChange(e) {
    e.preventDefault();
    setIsInvalid(false);

    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    schema.validate({
      email: email.trim(),
      abortEarly: false
    })
      .then(() =>
        // api.post('/subscribers', { email: email.trim() })
        //   .then(res => console.log(res))
        //   .catch(err => console.log(err));
        axios.post(
          '/',
          encode({ "form-name": "newsletterForm", email }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
      )
      .then(() => setIsSubscribed(true))
      .catch(err => {
        setIsInvalid(true);
        console.log(err.message);
      });
  }
  return (
    <>
      {!isSubscribed ?
        <Form
          name="newsletterForm"
          ref={ref}
          onSubmit={handleSubmit}
          novalidate
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <Header>Receba novos conteúdos por e-mail!</Header>
          <InputBox isInvalid={isInvalid}>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Seu melhor e-mail"
            />
            {isInvalid
              ? <ToolTip><p>Opa! Precisamos de um e-mail válido!</p></ToolTip>
              : null}
          </InputBox>
          <button> <fontAwesome.FaEnvelope /> Cadastrar</button>
        </Form> :
        <Subscribed ref={ref}>
          <Header>Inscrito! <fontAwesome.FaHeart /> </Header>
        </Subscribed>}
    </>
  )
});

export default NewsletterForm;