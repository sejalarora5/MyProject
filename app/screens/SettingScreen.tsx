import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {setUserLoggedOut} from '../../redux/actions/loginActions';
import Ionicons from 'react-native-vector-icons/Ionicons';
type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;
const SettingScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          navigation.navigate('Webview');
        }}>
        {/* <Text style={styles.buttonText}>Webview</Text> */}
        <Ionicons name="logo-instagram" size={22} color="black"></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          // navigation.navigate('First');
          dispatch(setUserLoggedOut());
        }}>
        {/* <Text style={styles.buttonText}>Logout</Text> */}
        <Ionicons name="log-out-outline" size={22} color="black"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  button2: {
    height: 45,
    backgroundColor: 'green',
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
