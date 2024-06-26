import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const privacy = () => {
  const GET_POKEMON_DETAILS = gql`
  query GetPokemons {
    pokemons(limit:10, offset:0) {
      results {
        id
        name
        image
      }
      count
    }
  }
`;

  const { data, loading, error } = useQuery(GET_POKEMON_DETAILS);


  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  return (
    <View>
      <Text>Name: </Text>
      <Text>Description:</Text>
      <FlatList
        data={data.pokemons.results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.name}: {item.id}</Text>
        )}
      />
    </View>
  );
};

export default privacy;
