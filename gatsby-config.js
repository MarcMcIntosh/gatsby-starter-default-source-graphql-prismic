const { buildClientSchema } = require("graphql")
const { PrismicLink } = require('apollo-link-prismic');

const introspectionQuery = require('./utils/introspectionQuery');

const REPO_NAME = "gatsby-starter-default-source-graphql-prismic";
const GRAPHQL_ENDPOINT = `https://${REPO_NAME}.prismic.io/graphql`;

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "PRISMIC",
        fieldName: "prismic",
        createLink: () => new PrismicLink({
          // repositoryName: REPO_NAME
          uri: GRAPHQL_ENDPOINT,
        }),
        createSchema: async() => {
          return introspectionQuery(REPO_NAME).then(buildClientSchema);
        }
      }
    }
  ],
}
