import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
// import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import colors from '../config/colors';
// import '../../languages/i18n/i18n';
import '../../languages/i18n';

import {RootStackParamList} from '../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
type Props = NativeStackScreenProps<RootStackParamList, 'First'>;
const LandingScreen = ({navigation}: Props) => {
  const {t, i18n} = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageChange = language => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
    i18n.changeLanguage(language);
  };
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/wallpaper.jpg')}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/logo.png')}></Image>
        <Text style={styles.textStyle}>{t('weprovidewhatyouneed')}</Text>
      </View>
      <View style={styles.container}>
        <View style={{padding: 20}}>
          <Text style={{fontSize: 20}}>Choose language</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.dropdownToggle}
            onPress={handleToggleDropdown}>
            <Text style={styles.selectedLanguage}>{selectedLanguage}</Text>
            <Icon
              name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={isDropdownOpen}
          onBackdropPress={handleToggleDropdown}>
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleLanguageChange('en')}>
              <Text style={styles.languageText}>{t('english')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleLanguageChange('hi')}>
              <Text style={styles.languageText}>{t('hindi')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleLanguageChange('fr')}>
              <Text style={styles.languageText}>{t('french')}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={[styles.buttonStyle, {backgroundColor: colors.primary}]}>
          <Text style={styles.text}>{t('login')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.text}>{t('register')}</Text>
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
    marginBottom: 5,
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
    paddingTop: 10,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dropdownToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'white',
    width: 200,
  },
  selectedLanguage: {
    marginRight: 5,
  },
  dropdownMenu: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
  dropdownItem: {
    padding: 10,
  },
  languageText: {
    fontSize: 16,
  },
});
