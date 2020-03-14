import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery, Link } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { config, animated, useSpring } from 'react-spring'
import Layout from './layout'
import GridItem from './grid-item'
import SEO from './SEO'
import { ChildImageSharp } from '../types'
import theme from '../gatsby-plugin-theme-ui/index'

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

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    grid-template-columns: 1fr;
    grid-auto-rows: 60vw;
  }
`
class BlogRoll extends React.Component {
  render() {

    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (

      <Layout color={theme.palette.primary.background}>
        <SEO title="Lawn Care Service | lawnsmatter.co.uk" />
        <Area>
        {posts &&
          posts.map(({ node: post }) => (

         <GridItem key={post.frontmatter.slug} to={post.frontmatter.slug} aria-label={`View our lastest news "${post.frontmatter.title}"`}>
                        <Img fluid={post.frontmatter.featuredimage.childImageSharp.fluid} />
            <span>{post.frontmatter.title}</span>
          </GridItem>
         
          ))}
      </Area>
      </Layout>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
    query BlogRollQuery {
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
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
