import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery, Link } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { animated } from 'react-spring'
import Layout from './layout'
import GridLink from './grid-link'
import SEO from './SEO'
import { ChildImageSharp } from '../types'
import theme from '../gatsby-theme-material-ui-top-layout/theme'

type PageProps = {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          excerpt: string
          id: string
          frontmatter: {
            title: string
            slug: string
            templateKey: string
            featured: boolean
            featuredimage: ChildImageSharp
            }[]
        }
      }
    }
  }
}

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 50vw;

 [theme.breakpoints.down('md')]: {
    grid-template-columns: 1fr;
    grid-auto-rows: 60vw;
  }
`
class BlogIndex extends React.Component {
  render() {

    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (

        <Area>
        {posts &&
          posts.map(({ node: post }) => (

         <GridLink key={post.frontmatter.slug} to={post.frontmatter.slug} aria-label={`View our lastest news "${post.frontmatter.title}"`}>
                        <Img fluid={post.frontmatter.featuredimage.childImageSharp.fluid} />
            <span><h6>{post.frontmatter.title}</h6></span>
          </GridLink>
         
          ))}
      </Area>
      
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
    query BlogIndexQuery {
      allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "post"}}}, sort: {order: ASC, fields: id}) {
        edges {
          node {
           excerpt(pruneLength: 400)
            id
            frontmatter {
              slug
              title
              templateKey
              featured
              featuredimage {
                childImageSharp {
                  fluid(quality: 95, maxWidth: 1200) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }  
    `}
    render={(data, count) => <BlogIndex data={data} count={count} />}
  />
)