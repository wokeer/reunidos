import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ThemeProvider, StylesProvider, jssPreset, createGenerateClassName } from '@material-ui/core/styles'
import { createMuiTheme, colors } from "@material-ui/core";
import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import jssExtend from 'jss-extend';
import {create} from 'jss';
// import rootReducer from '.';
import rootReducer from '../reducers';
import fetch from 'isomorphic-fetch';
// import theme from "../../gatsby-theme-material-ui/theme";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const Layout = require('../../components/Layout/layout').default
// const Auth = require('../../components/auth').default
const Message = require('../../components/Message').default
const { GlobalStyles } = require("../../styles")
const { CartProvider } = require("../../context")


const jss = create({
  ...jssPreset(),
  plugins       : [...jssPreset().plugins, jssExtend()],
  // insertionPoint: document.getElementById('jss-insertion-point'),
});

const generateClassName = createGenerateClassName();

const middleware = [thunk];
const theme = createMuiTheme({
    palette: {
      primary: {
        main: `#e6b12a`,
      },
      secondary: {
        light: '#ffffff',
        main: `#19857b`,
        dark : '#000000'
      },
      error: {
        main: colors.red.A400,
      },
      background: {
        default: `#fff`,
      },
    },
  });

const createStore = () => reduxCreateStore(rootReducer, applyMiddleware(...middleware));

const client = new ApolloClient({
  uri: 'http://localhost:8000/__graphql',
  fetch,
});
export default ({ element }) => (
  <ApolloProvider client={client}>
    <CartProvider>
        <GlobalStyles />
        <StylesProvider jss={jss} generateClassName={generateClassName}>
          <Layout>
              <Provider store={createStore()}>
                  <ThemeProvider theme={theme}>
                      {element}
                  </ThemeProvider>
                  <Message/>
              </Provider>
          </Layout>
        </StylesProvider>
    </CartProvider>
  </ApolloProvider>
);