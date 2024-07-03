import { StatusBar } from "expo-status-bar";
import {
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottonNav from "../../../components/BottomNav";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  clearCart,
  addItemToCart,
} from "../../../store/cartReducer";
import { useTheme } from "@shopify/restyle";
import { Theme } from '../../../theme';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  const handleAddToCart = (item) => {
    dispatch(addItemToCart({ ...item, quantity: 1 }));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const theme = useTheme<Theme>();

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.artwork }} style={styles.itemImage} />
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            onPress={() => {
              handleRemoveFromCart(item.id);
            }}
          >
            <Ionicons name="remove-circle" size={24} color="gray" />
          </TouchableOpacity>
          <Text style={styles.quantityInput}> 0{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              handleAddToCart(item);
            }}
          >
            <Ionicons name="add-circle-sharp" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.itemName, {color: theme.colors.text}]}>{item.name}</Text>
        <Text style={styles.itemPrice}>{"$" + item.price}</Text>
        <Text style={{color: theme.colors.text}}>
          Delivery by <Text style={[styles.bold]}>March 12, 2024</Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{backgroundColor: theme.colors.background, flex: 1}}>
      <FlatList
        style={{ paddingVertical: 20, }}
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={[styles.footer]}>
        <Text style={[styles.total, {color: theme.colors.text}]}>
          Total <Text style={styles.bold}>{"$" + total}</Text>
        </Text>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>

      {/* <BottonNav /> */}

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  outter: {
    backgroundColor: "black",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    margin: 10,
    overflow: "scroll",
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 114,
    height: 102,
    resizeMode: "cover",
    borderRadius: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Nexa-Regular",
  },
  itemPrice: {
    fontSize: 14,
    color: "#05A20C",
    fontWeight: "bold",
    fontFamily: "Nexa-Bold",
    paddingVertical: 7,
  },
  imageContainer: {
    position: "relative",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "#fff",
    bottom: 10,
    left: 10,
    borderRadius: 15,
    width: 94,
    height: 32,
  },
  quantityInput: {
    width: 40,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Nexa-Regular",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 80,
    marginTop: 10
  },
  orderButton: {
    backgroundColor: "#00388E",
    width: 148,
    height: 46,
    borderRadius: 10,
    justifyContent: "center",
  },
  orderButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Nexa-Regular",
  },
  total: {
    fontSize: 15,
    fontWeight: "normal",
  },
  bold: {
    fontWeight: "bold",
  },
});
