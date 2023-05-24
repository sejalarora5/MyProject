import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
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
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
const HomeScreen = () => {
  // const [productsData, setProductsData] = useState();
  // const [isLoading, setIsLoading] = useState(true);

  // const getProductsData = async () => {
  //   try {
  //     const response = await fetch('https://fakestoreapi.com/products');
  //     const myData = await response.json();
  //     setProductsData(myData);
  //     setIsLoading(false);
  //     console.log(myData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getProductsData();
  // }, []);

  const fetchUsers = () => {
    return dispatch => {
      dispatch(fetchUsersRequest());
      axios
        .get('https://fakestoreapi.com/products')
        .then(response => {
          //response.data is the array of users
          //const users = response.data.map(user => user.id);
          dispatch(fetchUserSucess(response.data));
          console.log(response);
        })
        .catch(error => {
          //error.message is the error description
          dispatch(fetchUsersFailure(error.message));
        });
    };
  };
  const selector = useSelector<RootState>(state => state.reducer) as initState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const renderProductsItem = ({item}) => {
    return (
      // <TouchableOpacity style={styles.coverContainer}>
      <View style={styles.container}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <TouchableOpacity
          style={{
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
          }}>
          <Ionicons name="heart-outline" color="black" size={30}></Ionicons>
        </TouchableOpacity>
        <View>
          <Text numberOfLines={2} style={styles.itemName}>
            {item.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 8,
              paddingRight: 5,
              marginTop: 5,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 15, fontWeight: '600'}}>
              $ {item.price}
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 5,
                paddingRight: 5,
                margin: 5,
                paddingBottom: 7,
                paddingTop: 7,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Ionicons name="cart" color="black" size={22} />
              <Text style={{fontSize: 15, fontWeight: '600'}}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      // </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Image source={require('../assets/banner.jpg')} style={styles.banner} />

      {selector.loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View>
          <FlatList
            numColumns={2}
            data={selector.products}
            renderItem={renderProductsItem}></FlatList>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  loader: {
    minHeight: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  // coverContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  // },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 10,
  },
});
