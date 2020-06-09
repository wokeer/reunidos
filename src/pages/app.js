import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout/layout"
import Home from "../components/Home"
import Product from "../components/Product"
import Login from "../components/Login"
import Verify from "../components/Verify"
import Register from "../components/Register"
import Splash from "../components/Splash"
import PrivateRouter from "../components/PrivateRoute"


const App = () => (
  <Layout>
    <Router>
      <PrivateRouter path="/app/home" component={Home} />
      <PrivateRouter path="/app/producto/:id" component={Product} />
      <PrivateRouter path="/app/register" component={Register} />
      <Login path="/app/login" />
      <Verify path="/app/verificar" />
      <Splash path="/" />
    </Router>
  </Layout>
)

export default App