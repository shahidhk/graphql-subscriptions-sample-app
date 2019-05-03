const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import {
  makeExecutableSchema,
} from 'graphql-tools';

const typeDefs = gql`
  type Query {
    hello:  String
    dogs: [Dogs]
  }
  type Dogs {
    id: Int
    breed: String
  }
`;

const resolvers = {
    Query: {
        hello: () => "world",
        dogs: () => [
          {id: 1, breed: "Doberman"}
        ]
    },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const WS_PORT = 5000;

// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

// Bind it to port and start listening
websocketServer.listen(WS_PORT, () => console.log(
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
  },
  {
    server: websocketServer,
    path: '/graphql',
  },
);