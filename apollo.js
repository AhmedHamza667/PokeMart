import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';

// Initialize Apollo Client with an InMemory Cache
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphql-pokeapi.graphcdn.app/', // Pokémon API endpoint
  }),
  cache: new InMemoryCache(),
});

export default client;
