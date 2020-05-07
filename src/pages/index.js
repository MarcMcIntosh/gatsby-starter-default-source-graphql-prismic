import React from "react"
import { Link, graphql } from "gatsby"
import { RichText } from 'prismic-reactjs';


import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"


export const query = graphql`
  query {
    prismic {
      landingPage(uid:"home", lang:"en-gb") {
        title
        text
        image
      }
     }
  }
`;

const IndexPage = ({ data }) => {
  console.log({ data });
  return (
    <Layout>
      <SEO title="Home" />
      {data.prismic.landingPage.title.map(({ text }, index) =>(<h1 key={index}>{text}</h1>))}
      <RichText render={data.prismic.landingPage.text} />
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
