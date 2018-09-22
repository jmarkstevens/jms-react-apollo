import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import StaticClient from './qraphql/staticClient';

const client = (new StaticClient()).client;

const RenderApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<RenderApp />, document.getElementById("root"));
registerServiceWorker();
