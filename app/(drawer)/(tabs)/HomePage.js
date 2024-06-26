import { ScrollView, StyleSheet, 
    Text, TouchableOpacity, View, 
    FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux'
import {addItemToCart} from '../../../store/cartReducer';
import Toast from 'react-native-toast-message';
import { useQuery, gql } from '@apollo/client';

// const PRODUCTS_QUERY = gql`
//   query GetProducts {
//     products {
//       id
//       name
//       price
//       image
//     }
//   }
// `;
const GET_POKEMON_DETAILS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name
        artwork
      }
      count
    }
  }
`;



export default function HomePage() {
    const firstName = useSelector((state) => state.auth.firstName)
    const lastName = useSelector((state) => state.auth.lastName)
    const dispatch = useDispatch();
    // const data = useSelector((state) => state.items);
    const handleAddToCart = (item) => {
      dispatch(addItemToCart({ ...item, quantity: 1 }));
      Toast.show({
        type: 'success',
        text1: 'Item added successfully',
        visibilityTime: 800,

      });
    };
    const { data, loading, error, fetchMore } = useQuery(GET_POKEMON_DETAILS, {
      variables: { limit: 10, offset: 0 }  });
  // const { data, loading, error } = useQuery(GET_POKEMON_DETAILS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data || !data.pokemons || !data.pokemons.results) return <Text>No data found.</Text>;
  
    // render function
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.artwork }} style={styles.itemImage} />
            <TouchableOpacity style={styles.addButton} onPress={()=> handleAddToCart(item)} >
                <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{'$'+item.price}</Text>
        </View>
      );

      const loadMore = () => {
        fetchMore({
          variables: {
            offset: data.pokemons.results.length,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return {
              pokemons: {
                ...fetchMoreResult.pokemons,
                results: [...prev.pokemons.results, ...fetchMoreResult.pokemons.results],
              },
            };
          },
        });
      };
    

      
  return (
    <>
            <View style={styles.rest}>
                <Text style={styles.helloMsg}>Hello,</Text>
                <Text style={styles.userName}>{firstName + ' ' + lastName}</Text>
                <FlatList 
                 numColumns={2}
                 data={data.pokemons.results}
                 renderItem={renderItem}
                 keyExtractor={item => item.id}
                 contentContainerStyle={styles.list}
                 ListFooterComponent={() => 
                  <TouchableOpacity style={styles.more} onPress={loadMore}>
                  <Text style={styles.addButtonText}>Load More...</Text>
                  </TouchableOpacity>} 
                />
                
            </View>
            {/* <BottonNav /> */}
            <Toast />
            <StatusBar style='light'/>
        </>
  );
}

const styles = StyleSheet.create({
  rest: {
    backgroundColor: 'white',
    flex: 1,
    marginBottom: 60,
    justifyContent: 'center',
},
  
  helloMsg: {
    fontSize: 32,
    fontWeight: '300',
    paddingTop: 10,
    paddingHorizontal: 10,
    fontFamily: 'Nexa-Light',
  },
  userName: {
    fontSize: 32,
    paddingBottom: 10,
    paddingHorizontal: 10,
    fontFamily: 'Nexa-Bold',

  },
  list: {
    paddingHorizontal: 10,
    
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
itemImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Nexa-Light',
    paddingTop: 5,

  },
  itemPrice: {
    fontSize: 14,
    paddingTop: 6,
    fontFamily: 'Nexa-Bold',

  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{translateX: -90}],
    backgroundColor: '#28a745',
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '55%'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Nexa-Bold',

  },
  imageContainer: {
    position: 'relative',
  },
  more:{
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    marginBottom: 20,
    alignSelf: 'center',
  }

});
