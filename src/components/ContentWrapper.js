import styled from 'styled-components';

let ContentWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  padding: 1rem 1rem 2rem 1rem;
  margin: 1rem 0 2rem 0;
  text-align: justify;
  font-size: 1.1rem;
  * {
    color: #333;
  }
  @media(min-width: 800px) {
    padding: 1rem 2.2rem 2.2rem 2.2rem;
  }

  h1, h2, h3, h4 {
    margin: 2rem 0 1rem 0;
    font-family: 'Fredoka One';
    font-weight: 400;
    line-height:100%;
    color: #FB6376;
    &:first-child {
      margin: 1rem 0;
    }
  }
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2rem;
  }
  p {
    font-family: 'Open Sans';
    img {
      display: block;
      margin: 1rem auto;
      max-width: 100%;
    }
  }
  p + p {
    margin: 1rem 0 0 0;
  }
  ul, ol {
    list-style-position: inside;
    margin: 1rem 0 1rem 2rem;
  }

  blockquote {
    padding: 0.8rem 1rem;
    border-left: 6px solid rgb(251,99,118);
    background-color: rgba(251,99,118, 0.1);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  hr {
    margin: 1rem 2rem;
    border: 1px solid rgba(251,99,118, 0.2);
  }
`;

export default ContentWrapper;