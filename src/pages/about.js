import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import * as fontAwesome from 'react-icons/fa';
import Modal from '../components/Modal';
import MyContainer from '../components/MyContainer';
import GlobalStyle from '../components/GlobalStyle';
import NavBar from '../components/NavBar';
import PageMain from '../components/PageMain';
import BackgroundImage, { BackgroundImageHeader, BackgroundImageButton }
  from '../components/BackgroundImage';
import trees from '../../assets/images/sanitation1.jpeg';
import NewsletterForm from '../components/NewsletterForm';
import Footer from '../components/Footer';

let Wrapper = styled.div`
  margin: 0 0 1rem 0;
`

let PresentationWrapper = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  padding: 2rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.color};
  @media (min-width: 1200px) {
    flex-direction: row;
    align-items: flex-start;
  }
  p {
    font-size: 1.1rem;
    font-family: 'Open Sans';
    text-align: justify;
    margin-top: 0.6rem;
    @media(min-width: 1400px) {
      font-size: 1.2rem;
    }
  }

  p + p {
    margin-top: 1.6rem;
  }
  .round {
    height: 18rem;
    width: 18rem;
    border-radius: 50%;
    transition: 300ms ease;
    flex-shrink: 0;
    @media (min-width: 1400px) {
      height: 22rem;
      width: 22rem;
    }
  }
  .presentation {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 1rem 1rem;
    height: unset;
    @media (min-width: 800px) {
      margin: 1rem 3rem 1rem 1rem;
    }
    strong {
      line-height: 5rem;
      font-size: 5rem;
      font-family: 'Pacifico';
      color: #FB6376;
      font-weight: 600;
    }
    .buttons {
      padding: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 30px 0 0 -8px;
      * {
        margin: 0 1px;
      }
      a, div {
        display: flex;
      }
      @media (min-width: 1200px) {
        justify-content: flex-start;
    }
    }
  }
`;

let ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin: 1rem 0 0 0;
  }
  @media (min-width: 1200px) {
      margin: 0rem 3rem 0 1rem;
  }
`;

function About({ data }) {
  let [overlay, toggleOverlay] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let [themeColor, setThemeColor] = useState('#fb6376ff');
  const newsletterRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      toggleOverlay(true);
    }, 0);
  });

  function handleNewsletterButton() {
    let top = newsletterRef.current.getBoundingClientRect().top - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  const profileImageURL = data.allContentfulPerson.nodes[0].image.file.url;
  const bio =
    data.allContentfulPerson.nodes[0].shortBio.childMarkdownRemark.html;

  return (
    <>
      <Helmet>
        <title>Vivendo Saneamento - Priscilla Bernardelli</title>
        <meta name="theme-color" content={themeColor} />
      </Helmet>
      <GlobalStyle dark />
      {showModal ?
        <Modal closeModal={() => setShowModal(false)} />
        : null
      }
      <NavBar setThemeColor={setThemeColor} />
      <PageMain>
        <BackgroundImage image={trees}>
          <BackgroundImageHeader>
            Vivendo Saneamento
          </BackgroundImageHeader>
          <BackgroundImageButton onClick={handleNewsletterButton}>
            Receba as atualizações!
          </BackgroundImageButton>
        </BackgroundImage>
        <Wrapper>
          <MyContainer visible={overlay} overlay widths={[
            { minWidth: '800px', width: '80%', maxWidth: '800px' },
            { minWidth: '1200px', width: '80%', maxWidth: '1000px' },
            { minWidth: '1400px', width: '80%', maxWidth: '1200px' },
          ]}>
            <PresentationWrapper color="#fff">
              <ImageWrapper>
                <img className="round" src={profileImageURL} alt="" />
              </ImageWrapper>
              <div className="presentation">
                <div dangerouslySetInnerHTML={{ __html: bio, }}></div>
                <div className="buttons">
                  <a href="https://www.linkedin.com/in/priscilla-veiga-bernardelli-874629b3">
                    <fontAwesome.FaLinkedin
                      size="2rem"
                      color="#FB6376" />
                  </a>
                  <a href="https://www.instagram.com/priscillabernardelli">
                    <fontAwesome.FaInstagram
                      size="2rem"
                      color="#FB6376" />
                  </a>
                  <a href="https://www.facebook.com/priscilla.bernardelli">
                    <fontAwesome.FaFacebook
                      size="2rem"
                      color="#FB6376" />
                  </a>
                  <div style={{ margin: '0 4px' }}>
                    <fontAwesome.FaEnvelope
                      size="2rem"
                      style={{ cursor: 'pointer' }}
                      color="#FB6376"
                      onClick={() => setShowModal(true)}
                    />
                  </div>
                </div>
              </div>
            </PresentationWrapper>
          </MyContainer>
        </Wrapper>
        <NewsletterForm ref={newsletterRef} />
        <Footer />
      </PageMain>
    </>
  )
}

export default About;

export const query = graphql`
  query Bio {
    allContentfulPerson {
      nodes {
        image {
          file {
            url
          }
        }
        shortBio {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;