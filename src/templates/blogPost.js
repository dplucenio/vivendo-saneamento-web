import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { DiscussionEmbed } from 'disqus-react';
import GlobalStyle from '../components/GlobalStyle';
import NavBar from '../components/NavBar';
import PageMain from '../components/PageMain';
import MyContainer from '../components/MyContainer';
import BackgroundImage, { BackgroundImageHeader, BackgroundImageParagraph } from '../components/BackgroundImage';
import NewsletterForm from '../components/NewsletterForm';
import ContentWrapper from '../components/ContentWrapper';
import Footer from '../components/Footer';

let TagWrapper = styled.div`
  background-color: #2ab7caff;
  font-weight: 600;
  border-radius: 2rem;
  padding: 2px 12px;
  color: #fff;
  transition: 400ms background-color ease;
  p {
    font-size: 1.1rem;
  }
  & + & {
    margin: 0 0.5rem;
  }
`;

function Tag({ children }) {
  return (
    <TagWrapper>
      <p>{children}</p>
    </TagWrapper>
  )
}

let DisqusWrapper = styled.div`
  background-color: #84D0DB;
  border-radius: 20px;
  padding: 1rem 1rem 0 1rem;
  margin: 1rem 0 0 0;
  text-align: justify;
  font-size: 1.1rem;

  /* to hide disqus footer
  #disqus_thread {
    position: relative;
  }
  #disqus_thread:after {
    content: "";
    display: block;
    height: 55px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background: #84D0DB;
  } */
`;

let NewsletterWrapper = styled.div`
`;

function BlogPost(props) {
  let [overlay, toggleOverlay] = useState(false);
  let [themeColor, setThemeColor] = useState('#fb6376ff');

  useEffect(() => {
    setTimeout(() => {
      toggleOverlay(true);
    }, 0);
  });

  let { pageContext } = props;

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: pageContext.node.slug }
  }

  return (
    <>
      <Helmet>
        <title>Vivendo Saneamento - {pageContext.node.title}</title>
        <meta name="theme-color" content={themeColor} />
      </Helmet>
      <GlobalStyle dark />
      <NavBar setThemeColor={setThemeColor} />
      <PageMain>
        <BackgroundImage image={pageContext.node.heroImage.file.url}>
          <BackgroundImageHeader>{pageContext.node.title}</BackgroundImageHeader>
          <BackgroundImageParagraph style={{ margin: '1.2rem 0 2rem 0' }}>
            por <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>
              {pageContext.node.author.name}
            </span> em {
              format(new Date(pageContext.node.publishDate), "dd 'de' MMMM 'de' yyyy",
                { locale: ptBR }
              )
            }
          </BackgroundImageParagraph>
          <div style={
            { display: 'flex' }}>
            {pageContext.node.tags.map((o, i) => (
              <Tag key={i}>{o}</Tag>
            ))}
          </div>

        </BackgroundImage>
        <MyContainer visible={overlay} overlay widths={[
            { minWidth: '800px', width: '80%', maxWidth: '800px' },
            { minWidth: '1200px', width: '80%', maxWidth: '1000px' },
            { minWidth: '1400px', width: '80%', maxWidth: '1200px' },
        ]}>

          <ContentWrapper
            dangerouslySetInnerHTML={{
              __html: pageContext.node.body.childMarkdownRemark.html,
            }}
          />
          <DisqusWrapper>
            <DiscussionEmbed {...disqusConfig} />
          </DisqusWrapper>
          <NewsletterWrapper>
            <NewsletterForm />
          </NewsletterWrapper>

        </MyContainer>
        <Footer />
      </PageMain>
    </>
  );
}

export default BlogPost;

