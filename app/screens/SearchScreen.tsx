import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import colors from '../config/colors';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import '../../languages/i18n';

type Props = NativeStackScreenProps<RootStackParamList, 'Language'>;
const SearchScreen = () => {
  const {t, i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const handleLanguageChange = language => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chooseLang}>
        <Text style={styles.chooseLangText}>Choose Language</Text>
      </View>
      <TouchableOpacity
        style={styles.languageBtn}
        onPress={() => handleLanguageChange('en')}>
        <Text style={styles.language}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.languageBtn}
        onPress={() => handleLanguageChange('hi')}>
        <Text style={styles.language}>Hindi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.languageBtn}
        onPress={() => handleLanguageChange('fr')}>
        <Text style={styles.language}>French</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  chooseLang: {
    height: 40,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chooseLangText: {fontSize: 30},
  languageBtn: {
    margin: 20,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26,
  },
  language: {
    fontSize: 20,
  },
});
