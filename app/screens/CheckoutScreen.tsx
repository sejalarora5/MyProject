import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import colors from '../config/colors';
type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;
const CheckoutScreen = ({route, navigation}: Props) => {
  const {totalItems, totalPrice} = route.params;
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.billText}>Billing Details</Text>
      <View style={styles.container}>
        <Text style={styles.priceText}>Total Items : {totalItems}</Text>
        <Text style={styles.priceText}>Total Price : $ {totalPrice}</Text>
        <Text style={styles.priceText}>Delivery Fee : $ 0 </Text>
      </View>
      <Text style={styles.billText}>
        Review your order and address details to avoid cancellations
      </Text>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: colors.white,
    flex: 1,
    padding: 10,
  },
  container: {
    // backgroundColor: 'grey',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  billText: {
    fontSize: 22,
    fontWeight: '600',
    padding: 5,
  },
  priceText: {
    fontSize: 20,
    padding: 5,
  },
});
