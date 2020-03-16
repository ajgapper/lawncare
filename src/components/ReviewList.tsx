import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { config, animated, useSpring } from 'react-spring'
import Layout from './layout'
import GridItem from './grid-item'
import SEO from './SEO'
import { ChildImageSharp } from '../types'
// import { useColorMode } from 'theme-ui'
// import theme from '../../config/theme'
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
  class ReviewList extends React.Component {
    render() {
  
      const { data } = this.props
      const { edges: reviews } = data.allMarkdownRemark
  
      return (
  
        <Layout color={theme.palette.primary.main}>
          <SEO title="Lawn Care Service | lawnsmatter.co.uk" />
          <Area>
          {reviews &&
            reviews.map(({ node: review }) => (
  
           <GridItem key={review.frontmatter.slug} to={review.frontmatter.slug} aria-label={`View review "${review.frontmatter.title}"`}>
                          <Img fluid={review.frontmatter.featuredimage.childImageSharp.fluid} />
              <span>{review.frontmatter.title}</span>
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
      query ReviewListQuery {
        allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "review"}, menu: {eq: "review"}}}, sort: {order: ASC, fields: id}) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              frontmatter {
                slug
                title
                templateKey
                menu
                featured
                featuredimage {
                  id
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
      render={(data, count) => <ReviewList data={data} count={count} />}
    />
  )
  