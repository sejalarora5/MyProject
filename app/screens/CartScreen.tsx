import {
  Alert,
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
import {
  decreaseQuantity,
  increaseQuantity,
  removeItemFromCart,
} from '../../redux/actions/cartActions';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {t} from 'i18next';
type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;
const CartScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  // const products = useSelector(state => state.products.products);

  // const cartProducts = products.filter(product => cart.includes(product.id));
  // const cartProducts = products.filter(product => cart.includes(product.id));
  // const quantity = 1;

  // console.log(calculateTotalPrice);
  const handleRemoveFromCart = (data: any) => {
    dispatch(removeItemFromCart(data));
  };
  const handleIncreaseQuantity = data => {
    dispatch(increaseQuantity(data));
  };
  const handleDecreaseQuantity = (data: any) => {
    dispatch(decreaseQuantity(data));
  };
  let totalItems = cart.length > 0 ? cart.length.toString() : null;
  let calculateTotalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const handleRoute = () => {
    navigation.navigate('Checkout', {
      totalItems: totalItems,
      totalPrice: calculateTotalPrice,
    });
  };

  const renderCartItem = ({item}) => {
    // const isItemInCart = cart.includes(item);
    return (
      <View style={styles.container}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <TouchableOpacity
          style={styles.removeItemBtn}
          onPress={() => {
            handleRemoveFromCart(item);
          }}>
          <Ionicons name="close" color="red" size={40} />
        </TouchableOpacity>
        <View>
          <Text numberOfLines={2} style={styles.itemName}>
            {item.title}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 2,
              margin: 4,
              borderRadius: 20,
              // borderWidth: 1,
              // borderColor: 'grey',
              backgroundColor: '#F9D1D1',
            }}>
            <TouchableOpacity onPress={() => handleDecreaseQuantity(item)}>
              <Ionicons
                name="remove-outline"
                size={25}
                color="black"
                style={{paddingTop: 3, paddingRight: 3, paddingLeft: 3}}
              />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 50,
                height: 30,
                width: 30,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 23, textAlign: 'center'}}>
                {item.quantity}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleIncreaseQuantity(item)}>
              <Ionicons
                name="add-outline"
                size={25}
                color="black"
                style={{paddingTop: 3, paddingLeft: 3}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.itemPrice}>$ {item.price}</Text>
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
          <Text style={styles.text1}>{t('yourcartisempty')}</Text>
          <Text style={styles.text2}>{t('exploremore')}</Text>
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.exploreText}>{t('explore')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cartContainer}>
          <FlatList
            numColumns={1}
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={item => item.id}></FlatList>
          <View>
            <TouchableOpacity
              style={styles.totalContainer}
              onPress={() => handleRoute()}
              // onPress={() => {
              //   navigation.navigate('Checkout', {
              //     items: {totalItems},
              //     total: {calculateTotalPrice.toFixed(2)}
              //   });
              // const calculateTotalPrice = cart.reduce((total, item) => {
              //   return total + item.price * item.quantity;
              // }, 0);
              // var options = {
              //   description: 'Credits towards consultation',
              //   image: 'https://i.imgur.com/3g7nmJC.png',
              //   currency: 'INR',
              //   key: 'rzp_test_uU7MMDo5I3o3LB', // Your api key
              //   amount: 0,
              //   name: 'foo',
              //   prefill: {
              //     email: 'void@razorpay.com',
              //     contact: '9191919191',
              //     name: 'Razorpay Software',
              //   },
              //   theme: {color: '#F37254'},
              // };
              // options.amount = calculateTotalPrice.toString();
              // RazorpayCheckout.open(options)
              //   .then(data => {
              //     // handle success
              //     Alert.alert(`Success: ${data.razorpay_payment_id}`);
              //   })
              //   .catch(error => {
              //     // handle failure
              //     Alert.alert(`Error: ${error.code} | ${error.description}`);
              //   });
            >
              <Text style={styles.totalPrice}>
                {totalItems} items | {calculateTotalPrice.toFixed(2)}
              </Text>
              <Text style={styles.totalPrice}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: 'pink', padding: 5},
  emptyWishlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartContainer: {flex: 1},
  totalContainer: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: 'black',
    marginTop: 10,
    justifyContent: 'space-between',
    marginBottom: 15,
    position: 'absolute',
    bottom: 10,
    left: 7,
    right: 7,
    borderRadius: 10,
  },
  totalPrice: {fontSize: 20, color: 'white'},
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
    borderRadius: 20,
    elevation: 10,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    position: 'relative',
    // borderColor: 'grey',
    // borderWidth: 0.5,
    padding: 5,
    shadowColor: 'gray',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  priceContainer: {
    margin: 2,
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
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: '100%',
  },
  itemPrice: {
    fontSize: 23,
    fontWeight: '600',
  },
  removeItemBtn: {
    position: 'absolute',
    top: 5,
    right: 8,
    margin: 5,
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
