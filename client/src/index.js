import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';

import { withClientState } from 'apollo-link-state';
import { createHttpLink } from "apollo-link-http";
import { ApolloLink } from 'apollo-link';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { defaults, resolvers, typeDefs } from "./resolvers";

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers,
  defaults,
  typeDefs
});

const uri = "http://localhost:3000/graphql";
const graphqlLink = createHttpLink({ uri });

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, graphqlLink])
});

// const client = new ApolloClient({
//   uri: `http://localhost:3000/graphql`,
//   cache,
//   clientState: {
//     defaults,
//     resolvers,
//     typeDefs
//   }
// });

const RenderApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<RenderApp />, document.getElementById("root"));
registerServiceWorker();