import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Modal from 'react-native-modal';
import colors from '../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  // clearAddress,
  saveAddressDetails,
} from '../../redux/actions/addressActions';
import {useDispatch, useSelector} from 'react-redux';
type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;
const CheckoutScreen = ({route, navigation}: Props) => {
  const {totalItems, totalPrice} = route.params;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    // Animated.timing(fadeAnim, {
    //   toValue: 1,
    //   duration: 100000,
    //   useNativeDriver: true,
    // }).start();
  };
  const dispatch = useDispatch();
  const addressDetails = useSelector(state => state.address.addressDetails);
  const [house, setHouse] = useState('');
  const [apartment, setApartment] = useState('');
  const [directions, setDirections] = useState('');

  const handleDetails = () => {
    setIsDropdownOpen(false);
    const newAddressDetails = {
      // id: uuid(),
      house,
      apartment,
      directions,
    };
    dispatch(saveAddressDetails(newAddressDetails));
    setHouse('');
    setApartment('');
    setDirections('');
  };
  // const handleClearAddress = addressId => {
  //   dispatch(clearAddress(addressId));
  // };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.billText}>Billing Details</Text>
      <View style={styles.container}>
        <Text style={styles.priceText}>Total Items : {totalItems}</Text>
        <Text style={styles.priceText}>Total Price : $ {totalPrice}</Text>
        <Text style={styles.priceText}>Delivery Fee : $ 0 </Text>
      </View>
      <Text style={styles.billText}>Address</Text>
      {addressDetails.length > 0 ? (
        addressDetails.map(address => (
          <View style={styles.container}>
            {/* Display the address details here */}
            <Text>{address.house}</Text>
            <Text>{address.apartment}</Text>
            <Text>{address.directions}</Text>
            {/* <TouchableOpacity onPress={() => handleClearAddress(address.id)}>
              <Text>Clear Address</Text>
            </TouchableOpacity> */}
          </View>
        ))
      ) : (
        <Text>No addresses added.</Text>
      )}
      <Text style={styles.billText}>
        Review your order and address details to avoid cancellations
      </Text>
      <TouchableOpacity
        style={styles.totalContainer}
        onPress={handleToggleDropdown}>
        <Text style={styles.addressText}>Add New Address</Text>
      </TouchableOpacity>
      <Modal isVisible={isDropdownOpen} onBackdropPress={handleToggleDropdown}>
        <View style={styles.dropdownMenu}>
          <View style={styles.firstCont}>
            <Ionicons name="location-sharp" size={35}></Ionicons>
            <Text style={styles.detailText}>
              A detailed address will help our Deliver Partner reach your
              doorsteps easily..
            </Text>
          </View>
          <TextInput
            autoCapitalize="none"
            placeholder="HOUSE / FLAT / FLOOR NO."
            style={styles.input}
            value={house}
            onChangeText={setHouse}
          />
          <View style={styles.line} />
          <TextInput
            autoCapitalize="none"
            placeholder="APARTMENT / ROAD / AREA"
            style={styles.input}
            value={apartment}
            onChangeText={setApartment}
          />
          <View style={styles.line} />
          <TextInput
            autoCapitalize="none"
            placeholder="DIRECTIONS TO REACH"
            style={styles.input}
            value={directions}
            onChangeText={setDirections}
          />
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.totalContainer}
            onPress={handleDetails}>
            <Text style={styles.addressText}>Save Address Details</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  firstCont: {
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
  },
  detailText: {fontSize: 18},
  addressBtn: {
    backgroundColor: colors.white,
    width: '60%',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
  },
  addressText: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
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
  totalContainer: {
    padding: 15,
    backgroundColor: 'black',
    marginTop: 10,
    marginBottom: 15,
    position: 'absolute',
    bottom: 10,
    left: 7,
    right: 7,
    borderRadius: 10,
  },
  dropdownMenu: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: '40%',
    width: '100%',
    padding: 15,
  },
  input: {
    padding: 10,
  },
  line: {
    height: 1,
    backgroundColor: 'grey',
    marginHorizontal: 5,
    marginBottom: 30,
  },
});
