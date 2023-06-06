import {
  ActivityIndicator,
  FlatList,
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
  const handleSearch = (query: string) => {
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
    const isItemInCart = cart.includes(item.id);
    const handleProductPress = (item: Product) => {
      navigation.navigate('Product', {item});
    };
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleProductPress(item)}>
        <View>
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
            <Text numberOfLines={2} style={styles.itemName}>
              {item.title}
            </Text>
            <View style={styles.infoContainer}>
              <Text style={styles.priceText}>$ {item.price}</Text>
              <TouchableOpacity
                style={styles.cartBtnContainer}
                onPress={() => {
                  handleAddToCart(item.id);
                }}>
                <Ionicons name="cart" color="black" size={22} />
                <Text style={styles.addToCartText}>
                  {isItemInCart ? 'Remove Item' : 'Add to Cart'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
          onChangeText={handleSearch}
        />
      </View>
      <View style={{height: 250}}>
        <FlatList
          data={FlatListImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderBannerImages}
          keyExtractor={item => item.toString()}
        />
      </View>

      {selector.loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View>
          <FlatList
            numColumns={2}
            // data={selector.products}
            contentContainerStyle={{flexGrow: 1}}
            data={searchQuery ? filteredProducts : products}
            renderItem={renderProductsItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: 'pink', paddingBottom: 38},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 30,
    margin: 10,
    marginBottom: 0,
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
  },
  productImage: {
    height: '55%',
    width: '100%',
    borderTopLeftRadius: 10,
    resizeMode: 'contain',
    borderTopRightRadius: 10,
  },
  container: {
    height: 250,
    width: '48%',
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginBottom: 20,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  cartBtnContainer: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    // margin: 5,
    width: 120,
    paddingBottom: 7,
    paddingTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontWeight: '600',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
