import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import colors from '../config/colors';

import {RootStackParamList} from '../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParamList, 'First'>;
const LandingScreen = ({navigation}: Props) => {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/wallpaper.jpg')}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/logo.png')}></Image>
        <Text style={styles.textStyle}>Sell What You Don't Need</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={[styles.buttonStyle, {backgroundColor: colors.primary}]}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 20,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: colors.secondary,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 2,
    width: '100%',
  },
  logoContainer: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 100,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
});
