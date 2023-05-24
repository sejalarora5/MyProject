import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;
const SettingScreen = ({navigation}: Props) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          navigation.navigate('Webview');
        }}>
        <Text style={styles.buttonText}>Webview</Text>
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
