import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import GlobalStyle from '../components/GlobalStyle';
import NavBar from '../components/NavBar';
import PageMain from '../components/PageMain';
import MyContainer from '../components/MyContainer';
import BackgroundImage, { BackgroundImageHeader, BackgroundImageButton }
  from '../components/BackgroundImage';
import PostCard from '../components/PostCard';
import NewsletterForm from '../components/NewsletterForm';
import trees from '../../assets/images/sanitation1.jpeg';
import Footer from '../components/Footer';

let PostsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  justify-items: self-start;
  flex-wrap: wrap;
`;

function BlogPage({ data }) {
  let [visible, setVisible] = useState(false);
  let [themeColor, setThemeColor] = useState('#fb6376ff');
  const newsletterRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 0);
  });

  function handleNewsletterButton() {
    let top = newsletterRef.current.getBoundingClientRect().top - 70;
    window.scrollTo({top, behavior: 'smooth'});
  }

  return (
    <>
      <Helmet>
        <title>Vivendo Saneamento</title>
        <meta name="theme-color" content={themeColor} />
      </Helmet>
      <GlobalStyle dark />
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
        <MyContainer visible={visible} overlay>
          <PostsContainer>
            {data.allContentfulBlogPost.nodes.map(node =>
              <PostCard
                title={node.title}
                image={node.heroImage.file.url}
                tags={node.tags}
                slug={node.slug}
                author={node.author.name}
                date={node.publishDate}
                key={node.slug}
              >
              </PostCard>
            )}
          </PostsContainer>
          <NewsletterForm ref={newsletterRef} />
        </MyContainer>
        <Footer />
      </PageMain>
    </>
  );
}

export default BlogPage;

export const query = graphql`
  query BlogQuery {
    allContentfulBlogPost {
      nodes {
        title
        tags
        slug
        publishDate
        heroImage {
          file {
            url
            fileName
          }
        }
        author {
          name
        }
      }
    }
  }
`;