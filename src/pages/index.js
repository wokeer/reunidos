import React from "react"

import Layout from "../components/Layout/layout"
import App from "./app"
import SEO from "../components/seo"
import Amplify from 'aws-amplify';
import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <App />
  </Layout>
)

export default IndexPage
