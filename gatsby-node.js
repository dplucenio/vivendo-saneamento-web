const path = require('path');

module.exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query MyQuery {
      allContentfulBlogPost {
        nodes {
          slug
          author {
            name
          }
          heroImage {
            file {
              url
            }
          }
          body {
            internal {
              content
            }
            childMarkdownRemark {
              html
            }
          }
          tags
          title
          publishDate
        }
      }
    }  
  `);
  const { createPage } = actions;
  result.data.allContentfulBlogPost.nodes.forEach((node) => {
    createPage({
      path: `/${node.slug}`,
      component: path.resolve('./src/templates/blogPost.js'),
      context: {
        node
      }
    })
  })
}