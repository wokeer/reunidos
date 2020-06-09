import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const ImageIcon = ({name, className}) => {
  const data = useStaticQuery(graphql`
    query GET_IMAGE_ICON {
      eeuu: file(relativePath: { eq: "eeuu.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid 
          }
        }
      }
      colombia: file(relativePath: { eq: "colombia.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid 
          }
        }
      }
    }
  `)

  return <Img fluid={data[name].childImageSharp.fluid}  className={className} />
}

export default ImageIcon

/**
 * fixed(width: 400, height: 400) {
      ...GatsbyImageSharpFixed
    }
 */