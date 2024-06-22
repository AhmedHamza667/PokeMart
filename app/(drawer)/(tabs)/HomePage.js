import { ScrollView, StyleSheet, 
    Text, TouchableOpacity, View, 
    FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux'
import {addItemToCart} from '../../../store/cartReducer';
import Toast from 'react-native-toast-message';


export default function HomePage() {
    const firstName = useSelector((state) => state.auth.firstName)
    const lastName = useSelector((state) => state.auth.lastName)
    const dispatch = useDispatch();
    const data = useSelector((state) => state.items);
    const handleAddToCart = (item) => {
      dispatch(addItemToCart({ ...item, quantity: 1 }));
      Toast.show({
        type: 'success',
        text1: 'Item added successfully',
        visibilityTime: 800,

      });
    };
  
    // render function
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <TouchableOpacity style={styles.addButton} onPress={()=> handleAddToCart(item)} >
                <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{'$'+item.price}</Text>
        </View>
      );
  return (
    <>
            <View style={styles.rest}>
                <Text style={styles.helloMsg}>Hello,</Text>
                <Text style={styles.userName}>{firstName + ' ' + lastName}</Text>
                <FlatList 
                 numColumns={2}
                 data={data}
                 renderItem={renderItem}
                 keyExtractor={item => item.id}
                 contentContainerStyle={styles.list}
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
    marginBottom: 60
},
  
  helloMsg: {
    fontSize: 32,
    fontWeight: '300',
    paddingTop: 10,
    paddingHorizontal: 10,
    fontFamily: 'NexaLight',
  },
  userName: {
    fontSize: 32,
    paddingBottom: 10,
    paddingHorizontal: 10,
    fontFamily: 'NexaBold',

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
    fontFamily: 'NexaLight',
    paddingTop: 5,

  },
  itemPrice: {
    fontSize: 14,
    paddingTop: 6,
    fontFamily: 'NexaBold',

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
    fontFamily: 'NexaBold',

  },
  imageContainer: {
    position: 'relative',
  },
  

});
