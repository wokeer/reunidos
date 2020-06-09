/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
// import React from 'react'
// import { ApolloProvider } from '@apollo/react-hooks';
// import ApolloClient from 'apollo-boost';
// import fetch from 'isomorphic-fetch';

// const client = new ApolloClient({
//   uri: 'http://localhost:8000/__graphql',
//   fetch,
// })

// import ReduxWrapper from './src/redux/store/ReduxWrapper'

// export const wrapRootElement = ({ element }) => (
//     <ApolloProvider client={client}>
//         <ReduxWrapper>
//             {element}
//         </ReduxWrapper>
//     </ApolloProvider>
//   )

export { default as wrapRootElement } from './src/redux/store/ReduxWrapper';