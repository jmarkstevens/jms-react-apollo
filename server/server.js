const cors = require('cors');
import express from 'express';
import schema from './graphql/schema';
import { ApolloServer } from 'apollo-server-express';

const GRAPHQL_PORT = 4000;

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const server = new ApolloServer(schema);
server.applyMiddleware({ app });

app.listen({ port: GRAPHQL_PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
