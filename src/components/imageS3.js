import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = ({name, className}) => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
        allS3Image {
            edges {
                node {
                    Key
                    Url
                }
            }
        }
    }
  `)
//   return <img src={data.allS3Image.edges[0].node.Url}  className={className} />
  return <img src={`https://reunidos-panel-webc2c5860a972d439496174bc218073web-reunidos.s3.us-east-2.amazonaws.com/public/${name}`}  className={className} />
}

export default Image
