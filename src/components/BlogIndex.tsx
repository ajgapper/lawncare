import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { animated } from 'react-spring'
import GridLink from './grid-link'
import { ChildImageSharp } from '../types'

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
  grid-auto-rows: 35vw;

 [theme.breakpoints.down('md')]: {
    grid-template-columns: 1fr;
    grid-auto-rows: 30vw;
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
            <span>{post.frontmatter.title}</span>
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
      allMarkdownRemark(filter: {frontmatter: {featured: {eq: true}, visible: {eq: true}}}, sort: {order: ASC, fields: frontmatter___sortorder}) {
        edges {
          node {
           excerpt(pruneLength: 400)
            id
            frontmatter {
              slug
              title
              featured
              featuredimage {
                childImageSharp {
                  fluid(quality: 90, maxWidth: 450, maxHeight: 450) {
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
