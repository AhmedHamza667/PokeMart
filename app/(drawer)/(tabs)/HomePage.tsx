import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  RefreshControl,
  Animated,
} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../../store/cartReducer";
import Toast from "react-native-toast-message";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useState, useRef } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { pokemonClient } from "../../../apollo";
import { useTheme } from "@shopify/restyle";
import { Theme } from '../../../theme';
import { useScrollToTop } from '@react-navigation/native'

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
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const [itemPrices, setItemPrices] = useState({});
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const ref = useRef(null);
  const [scrollY] = useState(new Animated.Value(0)); // Track scroll position
  const [showGoToTop, setShowGoToTop] = useState(false); // Manage button visibility
  useScrollToTop(ref);
  const generateRandomPrice = (min = 10, max = 100) => {
    return (Math.random() * (max - min) + min).toFixed(2);
  };

  
  
  const handleAddToCart = (item) => {
    dispatch(addItemToCart({ ...item, quantity: 1 }));
    Toast.show({
      type: "success",
      text1: "Item added successfully",
      visibilityTime: 800,
    });
  };

  const { data, loading, error, fetchMore, refetch } = useQuery(
    GET_POKEMON_DETAILS,
    {
      variables: { limit: 10, offset: 0 },
      client: pokemonClient, // Specify the client here
    }
  );

  const generatePricesForItems = (items) => {
    return items.reduce((acc, item) => {
      if (!itemPrices[item.id]) {  // Check if the item doesn't already have a price
        acc[item.id] = generateRandomPrice();
      }
      return acc;
    }, {});
  };
  
  
  // Generate prices when data is first loaded
  useEffect(() => {
    if (data && data.pokemons && data.pokemons.results) {
      const newPrices = generatePricesForItems(data.pokemons.results);
      setItemPrices(prevPrices => ({ ...prevPrices, ...newPrices }));
    }
  }, [data]);  

  if (error) return <Text>Error: {error.message}</Text>;
  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      setShowGoToTop(value > 100);
    });
    return () => scrollY.removeListener(listener);
  }, [scrollY]);

  const renderItem = ({ item }) => {
    const price = itemPrices[item.id]; // Retrieve the price from the state
  
    return (
      <View style={[styles.itemContainer, {backgroundColor: theme.colors.background}]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.artwork }} style={styles.itemImage} />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart({ ...item, price })} // Pass the price with the item
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.itemName, {color: theme.colors.text}]}>{item.name}</Text>
        <Text style={[styles.itemPrice, {color: theme.colors.text}]}>{"$" + price}</Text>
      </View>
    );
  };
    const theme = useTheme<Theme>();

  if (loading || !data) {
    return (
      <SkeletonPlaceholder borderRadius={4}>
        <LinearGradient style={{ flex: 1 }}>
          <View style={{ margin: 25, backgroundColor: theme.colors.background}}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={{ marginHorizontal: 20 }}>
                <Image
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                  src={require("../../../assets/profileImg.png")}
                />
                <Text style={{ marginTop: 16, fontSize: 14, lineHeight: 18 }}>
                  Hello world
                </Text>
              </View>
              <View style={{ marginHorizontal: 20 }}>
                <Image
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                  src={require("../../../assets/profileImg.png")}
                />
                <Text style={{ marginTop: 16, fontSize: 14, lineHeight: 18 }}>
                  Hello world
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </SkeletonPlaceholder>
    );
  }

  const loadMore = () => {
    fetchMore({
      variables: {
        offset: data.pokemons.results.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
  
        // Generate prices only for new items
        const newPrices = generatePricesForItems(fetchMoreResult.pokemons.results);
  
        // Update the state with new prices
        setItemPrices(prevPrices => ({ ...prevPrices, ...newPrices }));
  
        return {
          pokemons: {
            ...fetchMoreResult.pokemons,
            results: [
              ...prev.pokemons.results,
              ...fetchMoreResult.pokemons.results,
            ],
          },
        };
      },
    });
  };  
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Refresh the data
    setRefreshing(false);
  };
  const scrollToTop = () => {
    ref.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <>
      <View style={[styles.rest, {backgroundColor: theme.colors.background}]}>
        <Text style={[styles.helloMsg, {color: theme.colors.text}]}>Hello,</Text>
        <Text style={[styles.userName, {color: theme.colors.text}]}>{firstName + " " + lastName}</Text>
        <FlatList
          ref={ref}
          numColumns={2}
          data={data.pokemons.results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        />
        {showGoToTop && (
          <TouchableOpacity style={styles.goToTopButton} onPress={scrollToTop}>
      <Ionicons name="arrow-up-outline" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <Toast />
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  rest: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  helloMsg: {
    fontSize: 32,
    fontWeight: "300",
    paddingTop: 10,
    paddingHorizontal: 10,
    fontFamily: "Nexa-Light",
  },
  userName: {
    fontSize: 32,
    paddingBottom: 10,
    paddingHorizontal: 10,
    fontFamily: "Nexa-Bold",
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 60,

  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  itemName: {
    fontSize: 16,
    fontFamily: "Nexa-Light",
    paddingTop: 5,
  },
  itemPrice: {
    fontSize: 14,
    paddingTop: 6,
    fontFamily: "Nexa-Bold",
  },
  addButton: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: [{ translateX: -90 }],
    backgroundColor: "#28a745",
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "55%",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Nexa-Bold",
  },
  imageContainer: {
    position: "relative",
  },
  more: {
    backgroundColor: "#28a745",
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    marginBottom: 20,
    alignSelf: "center",
  },
  goToTopButton: {
    position: "absolute",
    bottom: 80,
    right: 10,
    backgroundColor: "#28a745",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 20,
  },
});
