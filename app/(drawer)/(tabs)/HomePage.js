import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../../store/cartReducer";
import Toast from "react-native-toast-message";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { authClient, pokemonClient } from "../../../apollo";
import * as SecureStore from 'expo-secure-store';
import { updateUserDetails } from "../../../store/authReducer";

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

const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      address
      countryCode
      firstName
      isActive
      isVerified
      lastName
    }
  }
`;

export default function HomePage() {
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await SecureStore.getItemAsync('token');
      setToken(storedToken);
    };

    fetchToken();
  }, []);

  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_CURRENT_USER, {
    client: authClient,
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
    skip: !token, // Skip query execution until token is fetched
  });
  useEffect(() => {
    if (userLoading) {
      console.log('Loading user profile...');
    }
    if (userError) {
      console.error('Error loading user profile:', userError);
    }
    if (userData) {
      console.log('User profile data:', userData.getCurrentUser);
      const { firstName, lastName } = userData.getCurrentUser;
      dispatch(updateUserDetails(userData.getCurrentUser));

    }
  }, [userLoading, userError, userData]);

  // const firstName = useSelector((state) => state.auth.firstName);
  // const lastName = useSelector((state) => state.auth.lastName);

  const [refreshing, setRefreshing] = useState(false);

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

  if (error) return <Text>Error: {error.message}</Text>;
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.artwork }} style={styles.itemImage} />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{"$" + item.price}</Text>
    </View>
  );

  if (loading || !data) {
    return (
      <SkeletonPlaceholder borderRadius={4}>
        <LinearGradient style={{ flex: 1 }}>
          <View style={{ margin: 25 }}>
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

  return (
    <>
      <View style={styles.rest}>
        <Text style={styles.helloMsg}>Hello,</Text>
        <Text style={styles.userName}>{firstName + " " + lastName}</Text>
        <FlatList
          numColumns={2}
          data={data.pokemons.results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListFooterComponent={() => (
            <TouchableOpacity style={styles.more} onPress={loadMore}>
              <Text style={styles.addButtonText}>Load More...</Text>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
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
    marginBottom: 60,
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
});
