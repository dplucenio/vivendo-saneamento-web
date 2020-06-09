import React from 'react';
import styled from 'styled-components';

let BackgroundImageWrapper = styled.div`  
  width: 100%;
  height: 30rem;
  background-image:
  linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.3)
    ), url(${props => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  /* background-attachment: fixed; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 400ms height ease;
  @media (min-width: 800px) {
    height: 25rem;
  }
  @media (min-width: 1400px) {
    height: 30rem;
  }
`;

let BackgroundImageHeader = styled.h1`
  text-align: center;
  line-height: 110%;
  font-family: 'Pacifico';
  font-weight: 400;
  font-size: 3rem;
  color: #fff;
  padding: 0 6px;
  text-shadow: 0px 2px 10px #000;
  transition: 300ms font-size ease-in;
  @media (min-width: 425px) {
    padding: 0 10px;
    font-size: 3.5rem;
    }

  @media (min-width: 800px) {
    font-size: 3.5rem;
  }
  @media (min-width: 1400px) {
    font-size: 4rem;
  }
`;

let BackgroundImageButton = styled.button`
  outline: none;
  border: 2px solid #fff;
  padding: 0.5rem 1.2rem;
  height: 3.2rem;
  border-radius: 4rem;
  font-size: 1.2rem;
  font-family: 'Open Sans';
  font-weight: 700;
  color: #fff;
  background-color: transparent;
  cursor: pointer;    
  transition: 400ms background-color ease, 400ms color ease, 400ms border ease;
  ${BackgroundImageHeader} + & {
    margin-top: 1rem;
  }
  &:hover {
    background-color: #FB6376;
    border: 2px solid transparent;
    /* padding: 12px 22px; */
    /* border: none; */
  }
`;

let BackgroundImageParagraph = styled.p`
  color: #fff;
  text-shadow: 0px 2px 10px #000;
  text-align: center;
`;

let BackgroundImageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -35px 0 0 0;
  transition: 300ms margin ease;
  @media (min-width: 800px) {
    /* margin: 90px 0 0 0; */
  }
`;

function BackgroundImage({image, children}) {
  return (
    <BackgroundImageWrapper image={image}>
      <BackgroundImageContent>
        {children}
      </BackgroundImageContent>
    </BackgroundImageWrapper>
  )
}

export default BackgroundImage;

export {
  BackgroundImageHeader,
  BackgroundImageButton,
  BackgroundImageParagraph
}