import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const privacy = () => {
  const GET_POKEMON_DETAILS = gql`
  query samplePokeAPIquery {
    gen3_species: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: "generation-iii"}}}, order_by: {id: asc}) {
      name
      id
      is_legendary
    }
    generations: pokemon_v2_generation {
      name
      pokemon_species: pokemon_v2_pokemonspecies_aggregate {
        aggregate {
          count
        }
      }
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
        data={data.gen3_species}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.name}: {item.id}</Text>
        )}
      />
    </View>
  );
};

export default privacy;
