import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;
const SearchScreen = ({route}) => {
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>Price: ${item.price}</Text>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
  },
});
