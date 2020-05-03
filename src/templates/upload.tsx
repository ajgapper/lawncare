import React from 'react'
import { graphql } from 'gatsby'
import { createStyles, Theme,  withStyles, makeStyles  } from '@material-ui/core/styles';
import styled from 'styled-components'
import Layout from '../components/layout'
import SEO from '../components/SEO'
import { Form } from 'semantic-ui-react'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import theme from '../gatsby-theme-material-ui-top-layout/theme'
import Grid from '@material-ui/core/Grid';
import RaisedHeader from '../styles/raisedHeaderStyle'
import PageTitle from '../styles/pageTitleStyle'
import Content from '../styles/contentStyle'
import FormContainer from '../styles/formContainerStyle'
import Img from 'gatsby-image'
import Uploader from '../components/uploader'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: 'center',
      color: theme.palette.primary.contrastText,
    },
  }),
);

const TextInputField = styled(TextField)`
  variant: outlined;
  color: ${theme.palette.primary.contrastText}; 
`
const SendMessageButton = styled(Button)`
  variant: outlined;  
  color: primary;
`


const InputField = withStyles({
  root: {
    color: theme.palette.secondary.main,
    '& label.Mui-focused': {
      color: 'Green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'Green',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'Green',
      },
    },
  },
})(TextInputField);


type PageProps = {
  data: {
        id: string
        excerpt: string
        html: markdown 
        frontmatter: {
          title: string
          templateKey: string
          featured: boolean
          slug: string
          alt: string
          category: string
          featuredimage: ChildImageSharp
          }
        }
     }

     const Upload = ({ data }) => {
      const classes = useStyles();
      const imageData = data.markdownRemark.frontmatter.featuredimage.childImageSharp.fluid
      return ( 
      
     <Layout color={theme.palette.primary.main}>
      <SEO
        pathname={data.markdownRemark.frontmatter.slug}
        title={data.markdownRemark.frontmatter.title}
        desc={data.markdownRemark.frontmatter.desc}
        node={data.markdownRemark.frontmatter.parent}
        banner={imageData}
      />
     
   
     <Content bg={theme.palette.primary.main} >
     <FormContainer >
     <Grid container spacing={1}  >
            <Grid item xs={2} />
            <Grid item xs={8} >
          <Img fluid={imageData}/>
            </Grid>
            <Grid item xs={2} />
       
      </Grid> 
      </FormContainer>
      <br />
      <FormContainer >
              <RaisedHeader >
            <PageTitle >{data.markdownRemark.frontmatter.title}</PageTitle>
            <FormContainer >
          <Uploader />
                        </FormContainer>
              </RaisedHeader>
              </FormContainer>
    </Content>
    </Layout>
  )
}

export default Upload

export const query = graphql`

  query Upload  { 
 markdownRemark(frontmatter: {templateKey: {eq: "upload"}})  {
    frontmatter {
      slug
      title
      templateKey
      category
      featuredimage {
        childImageSharp {
          fluid(quality:95 maxHeight: 1200, maxWidth: 1920)  {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      alt
      featured
    }
    id
  }
  site {
    siteMetadata {
      siteUrl
      serviceName
      brand
      availableChannel {
        servicePhone
        serviceSmsNumber
        serviceUrl
      }
    }
  }
 }
`