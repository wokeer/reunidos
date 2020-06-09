import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image = ({name, className}) => {
  const data = useStaticQuery(graphql`
    query GET_IMAGE {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid 
          }
        }
      }
      logoDark: file(relativePath: { eq: "logo-dark.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid 
          }
        }
      }
      profile: file(relativePath: { eq: "profile.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid 
          }
        }
      }
      rdPhProduct: file(relativePath: { eq: "rd-ph-product.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid 
          }
        }
      }
      rtPh: file(relativePath: { eq: "rt-ph.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid 
          }
        }
      }
      rdU: file(relativePath: { eq: "rd-ubicacion.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid 
          }
        }
      }
      rdEdit: file(relativePath: { eq: "rd-edit.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid 
          }
        }
      }
      rdEliminar: file(relativePath: { eq: "rd-eliminar.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid 
          }
        }
      }
      rdDireccion: file(relativePath: { eq: "rd-direccion.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid 
          }
        }
      }
      rdDomi: file(relativePath: { eq: "rd-domi.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid 
          }
        }
      }
      mesero: file(relativePath: { eq: "mesero.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid 
          }
        }
      }
      rdIcCargarPedido: file(relativePath: { eq: "rd-IcCargarPedido.png" }) {
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

export default Image
