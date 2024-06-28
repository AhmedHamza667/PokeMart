import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// Apollo Client for Pokémon API
const pokemonClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphql-pokeapi.graphcdn.app/', // Pokémon API endpoint
  }),
  cache: new InMemoryCache(),
});

// Apollo Client for Login/Authentication API
const authClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api-dev.virrow.com/app-main', // Replace with your authentication API endpoint
  }),
  cache: new InMemoryCache(),
});

export { pokemonClient, authClient };



