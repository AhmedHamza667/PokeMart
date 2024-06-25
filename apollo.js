import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Initialize Apollo Client with an InMemory Cache
const client = new ApolloClient({
  uri: 'http://example.com/graphql', // This won't be used but can be set for completeness
  cache: new InMemoryCache()
});

export default client;
