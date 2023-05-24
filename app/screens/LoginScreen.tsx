import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {RootStackParamList} from '../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    navigation.navigate('Tab');
  };
  return (
    <View style={styles.mainContainer}>
      <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
      <Text style={styles.headerText}>Login</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Enter email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Enter password"
        secureTextEntry={true}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.button1} onPress={handlePress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  headerText: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  button1: {
    height: 45,
    backgroundColor: 'dodgerblue',
    borderRadius: 5,
    paddingHorizontal: 50,
  },
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    borderColor: 'gray',
    backgroundColor: 'white',
    //textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 95,
    alignSelf: 'center',
  },
  mainContainer: {
    // marginHorizontal: 20,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EFDCF9',
    rowGap: 20,
  },
  btnStyle: {
    height: 40,
    backgroundColor: 'black',
    borderRadius: 5,
    margin: 8,
    paddingHorizontal: 20,
  },
});
