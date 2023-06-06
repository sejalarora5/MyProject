import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {RootStackParamList} from '../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {setUserLoggedOut} from '../../redux/actions/loginActions';
import Ionicons from 'react-native-vector-icons/Ionicons';
type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;
import auth from '@react-native-firebase/auth';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../config/colors';
let name = '';
const SettingScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   getData();
  // }, []);
  // const getData = async () => {
  //   name = await AsyncStorage.getItem('NAME');
  // };
  return (
    <View style={{backgroundColor: colors.white}}>
      <View
        style={{
          width: '100%',
          height: 70,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={{fontWeight: '600', fontSize: 18, marginLeft: 15}}>
          Profile
        </Text>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            marginRight: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons name="settings" size={25} color="black"></Ionicons>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          navigation.navigate('Webview');
        }}>
        <Ionicons name="logo-instagram" size={22} color="black"></Ionicons>
      </TouchableOpacity> */}

      <Image
        source={require('../assets/user.png')}
        style={{width: 80, height: 80, alignSelf: 'center', marginTop: 30}}
      />
      <Text style={{alignSelf: 'center', marginTop: 20, fontSize: 18}}>
        Sejal
      </Text>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          borderBottomWidth: 0.23,
          marginTop: 23,
          borderBottomColor: '#8e8e8e',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{fontSize: 20}}>My Address</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          borderBottomWidth: 0.23,
          borderBottomColor: '#8e8e8e',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{fontSize: 20}}>My Offers</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          borderBottomWidth: 0.23,
          borderBottomColor: '#8e8e8e',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{fontSize: 20}}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          auth()
            .signOut()
            .then(() => dispatch(setUserLoggedOut()));
        }}>
        <Ionicons name="log-out-outline" size={22} color="black"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  logoutBtn: {
    height: 45,
    backgroundColor: 'grey',
    borderRadius: 5,
    paddingHorizontal: 50,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
    color: 'white',
  },
});
