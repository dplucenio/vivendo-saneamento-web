import React from 'react';
import styled from 'styled-components';
import footer from '../../assets/images/footer.svg';
import * as fontAwesome from 'react-icons/fa';

let FooterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background: url(${footer});
  height: 340px;
  width: 100%;
  background-size: 2000px;
  background-position: left top;
  padding: 0 4px;
  p {
    text-align: center;
    color: #fff;
    font-family: 'Open Sans';    
    font-size: 1.1rem;
  }
  p + p {
      margin: 0rem 0 1rem 0;
  }
  .strong {   
    font-weight: 600;
    margin: 0 0.5rem 0 0;
  }
  svg {
    /* margin: 0 0 0 0.25rem; */
  }
`;

let InnerDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function Footer() {
  let now = new Date();
  return (
    <FooterWrapper>
      <InnerDiv>
      <p>
        <span className='strong'>
          © {now.getFullYear()} Vivendo Saneamento.
        </span>
      </p>
      <p>Feito com <fontAwesome.FaHeart /></p>
      </InnerDiv>
    </FooterWrapper>
  );
}

export default Footer;