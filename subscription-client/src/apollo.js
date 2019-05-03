import ApolloClient from "apollo-client";
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { SubscriptionClient } from "subscriptions-transport-ws";


// set your Hasura url
export const HASURA_GRAPHQL_ENGINE_HOSTNAME = 'localhost:4454';
//export const HASURA_GRAPHQL_ENGINE_HOSTNAME = 'localhost:5000';

const scheme = (proto) => {
  return window.location.protocol === 'https:' ? `${proto}s` : proto;
};

const wsurl = `${scheme('ws')}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
//const wsurl = `${scheme('ws')}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/graphql`;

const c = new SubscriptionClient(wsurl, {
  reconnect: false,
  connectionParams: {
    headers: {
      "x-hasura-admin-secret": "abcdaa"
    }
  }
});

const link = new WebSocketLink(c);

// initialize the client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

// export the client
export default client;