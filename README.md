# jms-react-apollo

Starting point for the Apollo GraphQL Server and React Client.
The server is rather basic but the client demonstrates various options using the ApolloClient
including state management.

## Getting started

git clone https://github.com/apollostack/apollo-starter-kit
cd jms-react-apollo

You will need 2 terminal windows for the rest

### Server

cd server
npm install
npm start
```

Then open [http://localhost:3000/graphiql](http://localhost:3000/graphiql) for server testing of graphql


### Client

cd client
npm install
npm start
```

A message will come up asking to "Would you like to run the app on another port instead? (Y/n)"

Yes

Note: without the subscription in WithApollo changes in WithLink are not reflected in the other components.
This is because WithLink is not connected to the same cache.


