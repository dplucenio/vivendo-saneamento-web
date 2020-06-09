import React, { useState } from 'react';
import { navigate } from 'gatsby'
import styled from 'styled-components';
import { tint } from 'polished';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

let OuterWrapper = styled.div`
  cursor: pointer;
  flex-shrink: 1;
  flex-grow: 1;
  margin: 1rem 0.4rem;
  background-color:transparent;
  max-width: 800px;
  border-radius: 20px;
  transform: ${props => props.over ? 'translateY(-1.2rem)' : 'none'};
  padding: ${props => props.over ? '0px' : '2px'};
  border: ${props => props.over ? '2px solid #FB6376' : 'none'};
  transition: 400ms transform ease, 500ms background-color ease;
  @media (min-width: 800px) {
    margin: 1rem;
  }
`;

let Wrapper = styled.div`
  background-color: ${props => props.over ? tint(0.8, '#FB6376') : tint(1.0, '#FB6376')};  
  flex-shrink: 1;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  border-radius: 20px;
`;

let CardImage = styled.div`
  height: 250px;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)),
      url(${props => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
`;

let CardText = styled.div`
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 0.4rem;
  @media (min-width: 600px) {
    padding: 1rem;
  }
  h1 {  
    padding: 0;
    margin: 0.2rem 1rem 1rem 1rem;
    font-family: 'Pacifico';
    font-size: 2rem;
    line-height: 2.2rem;
    font-weight: 500;
    color: #FB6376;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    transition: 300ms font-size ease, 300ms line-height ease;
    @media (min-width: 600px) {
      font-size: 2.5rem;
      line-height: 2.8rem;
    }
  }
  p {
    margin: 0.5rem 1.5rem;
    color: ${() => tint(0.5, '#333')};
    font-family: 'Open Sans';
    .strong {
      font-weight: 500;
    }
  }
`;

let TagsWrapper = styled.div`
  /* border: 1px solid hotpink; */
  display: flex; 
  margin: 0 1.5rem;
  /* justify-content: center; */
`;

let TagWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #2AB7CA;
  padding: 0 0.7rem;
  border-radius: 2rem;
  & + & {
    margin-left: 0.2rem;
  }
  p {
    font-family: 'Open Sans';
    border: none;
    font-size: 1.1rem;
    color: #fff;
    padding: 2px;
    margin: 0;
  }
`;
function Tag({ children }) {
  return (
    <TagWrapper><p>{children}</p></TagWrapper>
  )
}

function Post({ title, image, tags, slug, author, date }) {
  let [over, setOver] = useState(false);
  function handleMouseEnter() {
    setOver(true);
  }
  function handleMouseLeave() {
    setOver(false);
  }
  return (
    <>
      <OuterWrapper
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseEnter} over={over} onClick={() => {
          navigate(`/${slug}`);
        }}
      >
        <Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseEnter} over={over}>
          <CardImage image={image}>
          </CardImage>
          <CardText>
            <h1>{title}</h1>
            <TagsWrapper>
              {tags.map((o, i) => (
                <Tag key={i}>{o}</Tag>
              ))}
            </TagsWrapper>
            <p>
              por <span style={{ fontWeight: 600 }}>
                {author}
              </span> em {
                format(new Date(date), "dd 'de' MMMM 'de' yyyy",
                  { locale: ptBR }
                )
              }</p>
          </CardText>
        </Wrapper>
      </OuterWrapper>
    </>
  )
}

export default Post;