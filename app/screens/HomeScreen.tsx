import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootStackParamList} from '../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {
  fetchUserSucess,
  fetchUsersFailure,
  fetchUsersRequest,
} from '../../redux/actions/fetchActions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/configureStore';
import {initState} from '../../redux/reducers/ApiFetchReducer';
import {addItemToCart} from '../../redux/actions/cartActions';
import {addItemToWishlist} from '../../redux/actions/wishlistActions';
import {t} from 'i18next';
import colors from '../config/colors';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
};
const HomeScreen = ({navigation}: Props) => {
  const fetchUsers = () => {
    return dispatch => {
      dispatch(fetchUsersRequest());
      axios
        .get('https://fakestoreapi.com/products')
        // .get('https://api.escuelajs.co/api/v1/products')
        .then(response => {
          dispatch(fetchUserSucess(response.data));
          //console.log(response);
        })
        .catch(error => {
          dispatch(fetchUsersFailure(error.message));
          console.log(error.message);
        });
    };
  };

  const FlatListImages = [
    'https://img.freepik.com/free-vector/horizontal-sale-banner-template_23-2148897328.jpg',
    'https://img.freepik.com/free-vector/online-shopping-template-banner_23-2148795108.jpg?w=740&t=st=1685441306~exp=1685441906~hmac=329c9d52f63feddbac00b806d7eb631b92dc2bf78eea41fe03fa9f6df56a5f99',
    'https://img.freepik.com/free-vector/flat-horizontal-sale-banner-template-with-photo_23-2149000923.jpg?w=740&t=st=1685442209~exp=1685442809~hmac=6bda0c8a3fb6031af55e829643ffc1c75163a06eb9b8f96c62172d4983300db0',
  ];

  const selector = useSelector<RootState>(state => state.products) as initState;
  const products = selector.products;

  const wishlist = useSelector(state => state.wishlist.wishlist);

  const cart = useSelector(state => state.cart.cart);

  const dispatch = useDispatch();

  // just added code

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showBanner, setShowBanner] = useState<'flex' | 'none'>('flex');
  const handleSearch = (query: string) => {
    if (query.length > 0) {
      setShowBanner('none');
    } else setShowBanner('flex');
    setSearchQuery(query);
    const filtered = products.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  // ends here
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleAddToCart = (data: any) => {
    dispatch(addItemToCart(data));
  };

  const handleAddToWishlist = (data: any) => {
    dispatch(addItemToWishlist(data));
  };
  const renderBannerImages = ({item}) => {
    // console.log(item);
    return <Image source={{uri: item}} style={styles.banner} />;
  };
  const renderProductsItem = ({item}: {item: Product}) => {
    const isItemInWishlist = wishlist.includes(item.id);
    const isItemInCart = cart.some(data => data.id === item.id);
    const handleProductPress = (item: Product) => {
      navigation.navigate('Product', {item});
    };
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleProductPress(item)}>
        <Image source={{uri: item.image}} style={styles.productImage} />

        <TouchableOpacity
          style={styles.addToWishlistBtn}
          onPress={() => {
            handleAddToWishlist(item.id);
          }}>
          <Ionicons
            name={isItemInWishlist ? 'heart' : 'heart-outline'}
            color={isItemInWishlist ? 'red' : 'black'}
            size={30}></Ionicons>
        </TouchableOpacity>

        <View>
          <View>
            <Text numberOfLines={2} style={styles.itemName}>
              {item.title}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.priceText}>$ {item.price.toFixed(1)}</Text>
          <TouchableOpacity
            style={styles.cartBtnContainer}
            onPress={() => {
              handleAddToCart(item);
            }}>
            <Ionicons
              name="cart"
              color={isItemInCart ? 'green' : 'black'}
              size={27}
            />
            {/* <Text style={styles.addToCartText}>
              {isItemInCart ? 'REMOVE' : 'ADD'}
            </Text> */}
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={25} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a product..."
          value={searchQuery}
          onChangeText={text => handleSearch(text)}
        />
      </View>

      {selector.loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          <View style={{height: 250, display: showBanner}}>
            <FlatList
              data={FlatListImages}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderBannerImages}
              keyExtractor={item => item.toString()}
            />
          </View>
          <FlatList
            numColumns={2}
            // data={selector.products}
            contentContainerStyle={{flexGrow: 1}}
            data={searchQuery ? filteredProducts : products}
            renderItem={renderProductsItem}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'pink',
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 30,
    margin: 10,
    // marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    fontSize: 17,
    paddingLeft: 15,
  },
  searchButton: {
    padding: 10,
    // backgroundColor: 'blue',
    borderRadius: 5,
  },
  loader: {
    minHeight: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: 400,
    height: 220,
    borderRadius: 10,
    alignSelf: 'center',
    margin: 10,
    marginTop: 0,
  },
  productImage: {
    height: '55%',
    width: '100%',
    borderTopLeftRadius: 10,
    resizeMode: 'contain',
    borderTopRightRadius: 10,
    // padding: 10,
    marginTop: 8,
  },
  container: {
    height: 260,
    width: '48%',
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#fff',
    marginLeft: 10,
    position: 'relative',
    marginBottom: 20,
  },
  itemName: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 10,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 10,
    left: 2,
    right: 4,
    // backgroundColor: 'blue',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 5,
    // marginTop: 15,
    alignItems: 'center',
  },
  cartBtnContainer: {
    // borderWidth: 1,
    // borderRadius: 20,
    // paddingLeft: 3,
    // paddingRight: 3,
    margin: 3,
    marginRight: 10,
    width: '20%',
    // paddingBottom: 7,
    // paddingTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  addToWishlistBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  addToCartText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  // priceText1: {
  //   fontSize: 15,
  //   fontWeight: '600',
  //   position: 'relative',
  //   left: 10,
  //   top: 10,
  // },
});
