import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from 'react-redux'
import { RootState } from "../store/store";
import { useTheme } from "@shopify/restyle";
import { Theme } from '../theme';


const TabBar = ({ state, descriptors, navigation }) => {
  const theme = useTheme<Theme>();
  const badge = useSelector((state: RootState) => state.cart.badge);

  const icons = {
    HomePage: (isFocused) => (
      <Ionicons
        name={isFocused ? "home" : "home-outline"}
        size={24}
        color={theme.colors.text}
      />
    ),
    Cart: (isFocused) => (
      <Ionicons
        name={isFocused ? "cart" : "cart-outline"}
        size={24}
        color={theme.colors.text}
      />
    ),
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key} 
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.button, isFocused && styles.activeTab]}
          >
            <View style={styles.left}>
              {icons[route.name](isFocused)}

              <Text style={[styles.buttonText,{ color: theme.colors.text}]}>{label}</Text>
              {isFocused && route.name == "Cart" && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badge}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default TabBar;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 63,
    marginHorizontal: 20,
    height: 60,
    width: 341,
    position: "absolute",
    bottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12

  },
  buttonText: {
    fontSize: 10,
    color: "#021D49",
    fontFamily: "NexaRegular",
  },
  activeTab: {
    backgroundColor: "#1170FF2E",
    borderRadius: 24,
    width: 150,
    height: 40,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    right: -16,
    top: 5,
    backgroundColor: "#00388E",
    borderRadius: 6,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontFamily: "NexaBold",
    textAlign: "center",
  },
});
