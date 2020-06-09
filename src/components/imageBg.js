import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
// import styled from 'styled-components'

import BackgroundImage from 'gatsby-background-image'
// import { generateMedia } from 'styled-media-query'

/**
 * In this functional component a fullscreen <BackgroundImage />  is created.
 * @param className   string    className(s) from styled-components.
 * @param children    nodes     Child-components.
 * @return {*}
 * @constructor
 */

// const media = generateMedia({

//     small: '320px',
//     medium: '480px',
//     mediumL: '768px',
//     large: '1024px',
//     largeL: '1280px',
//     huge: '1360px',
//     hugeS: '1366px',
//     hugeM: '1440px',
//     hugeL: '1600px',

// })

const FullBackground = ({ className, children, name }) => {
  const data = useStaticQuery(
    graphql`
      query {
        bg_1: file(relativePath: { eq: "tienda-carnes.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mesero: file(relativePath: { eq: "mesero.png" }) {
          childImageSharp {
            fluid(maxWidth: 768) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )

  // Single Image Data
  const imageData = data[name].childImageSharp.fluid

  return (
      <BackgroundImage
        Tag="section"
        className={className}
        fluid={imageData}
        backgroundColor={`#040e18`}
        title="Fullscreen Background"
        id="fullscreenbg"
        role="img"
        aria-label="Fullscreen Background"
        preserveStackingContext={true}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        {children}
      </BackgroundImage>
  )
}
// body > ___gatsby > sc-AxirZ cepkZZ > main > section 
const ImageBg = FullBackground;
// const ImageBg = styled(FullBackground)`

//     // width: 220px;
//     // height: 100vh; 

//   ${media.lessThan('medium')`
//     background-size: cover;
//     width: 100%;
//     // height: 100vh;
//     &:after, &:before {
//       background-size: contain;
//     }
//   `}

//   ${media.lessThan('small')`
//     background-size: cover;
//     width: 100%;
//     // height: 100vh;
//     &:after, &:before {
//       background-size: contain;
//     }
//   `}

// `

// lessThan(breakpoint | size)   / * menos que : el ancho de la pantalla es inferior a 768 px (medio) * /
// greaterThan(breakpoint | size)  / * entre : el ancho de pantalla es de entre 768 px (medio) y 1170 px (grande) * /
// between(firstBreakpoint | firstSize, lastBreakpoint | lastSize)  / * mayor que: el ancho de pantalla es mayor que 1170 px (grande) * /

export default ImageBg
