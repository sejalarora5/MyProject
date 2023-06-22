import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addItemToWishlist} from '../../redux/actions/wishlistActions';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToCart} from '../../redux/actions/cartActions';
import {t} from 'i18next';
type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;
const ProductScreen = ({route}: Props) => {
  const {item} = route.params;
  const dispatch = useDispatch();
  const handleAddToCart = (data: any) => {
    dispatch(addItemToCart(data));
  };
  const handleAddToWishlist = (data: any) => {
    dispatch(addItemToWishlist(data));
  };

  const cart = useSelector(state => state.cart.cart);
  const isItemInCart = cart.some(data => data.id === item.id);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.productImage} />
      </View>
      <View style={{backgroundColor: 'grey', height: 2}} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.buttonView}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.wishlistbuttonContainer}
            onPress={() => {
              handleAddToWishlist(item.id);
            }}>
            <Ionicons name="heart-outline" size={25} color="black" />
            <Text style={styles.wishlistButtonText}>{t('wishlist')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cartbuttonContainer}
            onPress={() => {
              handleAddToCart(item);
            }}>
            <Ionicons name="cart" size={25} color="white"></Ionicons>
            <Text style={styles.cartButtonText}>{t('addtocart')}</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'grey', height: 1}} />
        <View style={styles.contentContainer}>
          <Text style={styles.detailsTitle}>Product Details</Text>
          <Text style={styles.itemDesc}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'stretch',
  },
  imageContainer: {
    backgroundColor: 'white',
    // marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 380,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  contentContainer: {
    backgroundColor: 'white',
    paddingTop: 10,
  },
  buttonView: {
    // position: 'absolute',
    // bottom: 20,
    // left: 20,
    // right: 20,
    backgroundColor: 'white',

    // justifyContent: 'center',
    // flexDirection: 'column-reverse',
  },
  btnContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  wishlistbuttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: 150,
    justifyContent: 'space-evenly',
  },
  wishlistButtonText: {
    fontSize: 17,
    color: 'black',
  },
  cartbuttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    padding: 10,
    width: 150,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'transparent',
  },
  cartButtonText: {
    fontSize: 17,
    color: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: 'black',
    marginLeft: 30,
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
    marginLeft: 30,
    fontWeight: 'bold',
  },
  detailsTitle: {
    marginTop: 10,
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
    marginLeft: 30,
    fontWeight: 'bold',
  },
  itemDesc: {
    paddingTop: 5,
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    marginLeft: 30,
  },
});
