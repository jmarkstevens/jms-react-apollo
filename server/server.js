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

// app.use(cors());
// graphQLServer.use('/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }));
const server = new ApolloServer(schema);
server.applyMiddleware({ app });

app.listen({ port: GRAPHQL_PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
// graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// graphQLServer.listen(GRAPHQL_PORT, () =>
//   console.log(
//     `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
//   )
// );
