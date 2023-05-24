import {StyleSheet, Image, View} from 'react-native';
import React, {useEffect} from 'react';
import {RootStackParamList} from '../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({navigation}: Props) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('First');
    }, 3000);
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 100,
    alignSelf: 'center',
  },
  mainContainer: {
    //paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#EFDCF9',
    // rowGap: 20,
  },
});
