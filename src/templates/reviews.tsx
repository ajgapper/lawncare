import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ReviewIndex from '../components/ReviewIndex'
import SEO from '../components/SEO'
import theme from '../gatsby-theme-material-ui-top-layout/theme'
import GlobalStyles from '../styles/globalStyle'
import RaisedHeader from '../styles/raisedHeaderStyle'
import PageTitle from '../styles/pageTitleStyle'
import Title from '../styles/titleStyle'
import Description from  '../styles/descriptionStyle'

export const ReviewsPageTemplate = ({
  featuredimage,
  title,
  heading,
  slug,
  html,
}) => (
  <div>
    <GlobalStyles />
    <SEO />
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!featuredimage.childImageSharp ? featuredimage.childImageSharp.fluid.src : featuredimage
        })`,
        backgroundPosition: `center`,
        backgroundAttachment: `fixed`,
        backgroundSize: 'cover',
      }}
    >
      <div
        style={{
          height: '500px',
        }}
      />

 <RaisedHeader >
            <PageTitle   >
      <Title color={theme.palette.secondary.main}>{title}</Title>
        
          </PageTitle>
       
 
                <Description>
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                  <ReviewIndex />  
                </Description>

    </RaisedHeader>
  
    </div>
  </div>
)

ReviewsPageTemplate.propTypes = {
  featuredimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  slug: PropTypes.string,
  html: PropTypes.markdown,
  posts: PropTypes.shape({
    frontmatter: PropTypes.array,
  }),
}

const ReviewsPage = ({ data }) => {
  const { indexdata } = data.markdownRemark
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <ReviewsPageTemplate
        featuredimage={data.markdownRemark.frontmatter.featuredimage}
        title={data.markdownRemark.frontmatter.title}
        slug={data.markdownRemark.frontmatter.slug}
        heading={data.markdownRemark.frontmatter.heading}
        html={data.markdownRemark.html}
      />
    </Layout>
  )
}

ReviewsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
  allMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
  }),
}

export default ReviewsPage

export const pageQuery = graphql`
query ReviewsPageTemplate {
   markdownRemark(frontmatter: {templateKey: {eq: "reviews"}}) {
      html
      frontmatter {
      title
      featuredimage {
        childImageSharp {
          fluid(maxWidth: 1200, quality: 100) {
            src
          }
        }
      }
      slug
      heading
    }
  }
allMarkdownRemark (filter: {frontmatter: {templateKey: {eq: "review"}}}, sort: {order: ASC, fields: id}) { 
  edges {
      node {
        excerpt(pruneLength: 400)
        id
        posts:   frontmatter {
          slug
          title
          templateKey
          featured
        }
      }
    }
  }
  site {
    siteMetadata {
      siteUrl
      serviceName
      contactPoint {
        email
        name
      }
    }
  }
}


  `