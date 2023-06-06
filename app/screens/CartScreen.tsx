import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {removeItemFromCart} from '../../redux/actions/cartActions';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;
const CartScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const products = useSelector(state => state.products.products);

  const cartProducts = products.filter(product => cart.includes(product.id));

  const handleRemoveFromCart = (data: any) => {
    dispatch(removeItemFromCart(data));
  };
  let totalItems = cart.length > 0 ? cart.length.toString() : null;

  const renderCartItem = ({item}) => {
    const isItemInCart = cart.includes(item.id);
    return (
      <View style={styles.container}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View>
          <Text numberOfLines={2} style={styles.itemName}>
            {item.title}
          </Text>
          <View style={styles.infoContainer}>
            <Text style={styles.itemPrice}>$ {item.price}</Text>
            <TouchableOpacity
              style={styles.removeItemBtn}
              onPress={() => {
                handleRemoveFromCart(item.id);
              }}>
              <Ionicons name="cart" color="black" size={24} />
              <Text style={styles.removeItemText}>Remove from cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      {cart.length === 0 ? (
        <View style={styles.emptyWishlistContainer}>
          <Image
            style={styles.emptyWishlistImage}
            source={require('../assets/emptybag.png')}
          />
          <Text style={styles.text1}>Your cart is empty!!</Text>
          <Text style={styles.text2}>
            Explore more and shortlist some items...
          </Text>
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.exploreText}>Explore</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cartContainer}>
          <FlatList
            numColumns={1}
            data={cartProducts}
            renderItem={renderCartItem}
            keyExtractor={item => item.id.toString()}></FlatList>
          <View>
            <TouchableOpacity style={styles.totalContainer}>
              <Text style={styles.totalPrice}> {totalItems} items | </Text>
              <Text style={styles.totalPrice}>View Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: 'white'},
  emptyWishlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartContainer: {flex: 1},
  totalContainer: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'pink',
    marginTop: 10,
    justifyContent: 'space-between',
    marginBottom: 15,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    borderRadius: 10,
  },
  totalPrice: {fontSize: 20, color: 'black'},
  banner: {
    width: '95%',
    height: 220,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  productImage: {
    height: '55%',
    margin: 5,
    width: '100%',
    borderTopLeftRadius: 10,
    resizeMode: 'contain',
    borderTopRightRadius: 10,
  },
  emptyWishlistImage: {
    height: 250,
    width: 250,
  },
  container: {
    height: 270,
    width: '95%',
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  itemName: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '600',
  },
  removeItemBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 6,
    paddingRight: 6,
    margin: 5,
    paddingBottom: 6,
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeItemText: {
    fontSize: 15,
    fontWeight: '700',
  },
  exploreBtn: {
    backgroundColor: 'red',
    height: 50,
    width: 150,
    borderRadius: 25,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreText: {
    color: 'white',
    fontSize: 20,
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    padding: 5,
  },
  text2: {
    fontSize: 18,
    color: 'black',
    padding: 5,
    marginBottom: 20,
  },
});
