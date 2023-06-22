import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Button,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList} from '../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {setUserLoggedIn} from '../../redux/actions/loginActions';
import {useDispatch} from 'react-redux';
import colors from '../config/colors';
import auth from '@react-native-firebase/auth';
import GoogleSignInButton from '../components/GoogleSignInButton';
import {t} from 'i18next';
type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;
const countries = [
  {
    id: '1',
    name: 'Australia',
  },
  {
    id: '2',
    name: 'Canada',
  },
  {
    id: '3',
    name: 'India',
  },
  {
    id: '4',
    name: 'New Zealand',
  },
  {
    id: '5',
    name: 'Singapore',
  },
  {
    id: '6',
    name: 'USA',
  },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  contact: Yup.string().required().min(10).max(10).label('Phone number'),
  password: Yup.string().required().min(6).max(12).label('Password'),
});
const SignUpScreen = ({navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  // const [selectedId, setSelectedId] = useState();
  const [selectedItem, setSelectedItem] = useState('Select');

  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const dispatch = useDispatch();

  const handlePress = async (values: any) => {
    try {
      await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      console.log('User account created & signed in!');
      navigation.navigate('Home');
      dispatch(setUserLoggedIn());
    } catch (error) {
      if (error === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      } else {
        console.error(error);
      }
    }
  };

  const [selectedRadio, setSelectedRadio] = useState(0);

  return (
    // <ScrollView style={styles.mainContainer}>
    <View style={styles.mainContainer}>
      <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
      {/* <Text style={styles.headerText}>Register</Text> */}
      {/* <GoogleSignInButton /> */}
      <Formik
        initialValues={{name: '', email: '', contact: '', password: ''}}
        onSubmit={handlePress}
        validationSchema={validationSchema}>
        {({handleChange, handleSubmit, errors, values}) => (
          <>
            <TextInput
              style={styles.input}
              value={values.name}
              onChangeText={handleChange('name')}
              placeholder="Enter name"
            />
            <TextInput
              style={styles.input}
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder="Enter email"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              value={values.contact}
              onChangeText={handleChange('contact')}
              placeholder="Enter phone number"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder="Enter password"
              secureTextEntry={true}
            />
            <View style={styles.radioContainer}>
              <Text style={styles.genderText}>{t('gender')}: </Text>
              <TouchableOpacity onPress={() => setSelectedRadio(1)}>
                <View style={styles.radioWrapper}>
                  <View style={styles.radio}>
                    {selectedRadio === 1 ? (
                      <View style={styles.radioBg}></View>
                    ) : null}
                  </View>
                  <Text style={styles.radioText}>{t('male')}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedRadio(2)}>
                <View style={styles.radioWrapper}>
                  <View style={styles.radio}>
                    {selectedRadio === 2 ? (
                      <View style={styles.radioBg}></View>
                    ) : null}
                  </View>
                  <Text style={styles.radioText}>{t('female')}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBtn}>
              <Text style={styles.genderText}>Country: </Text>
              <TouchableOpacity
                style={styles.button1}
                onPress={handleOpenModal}>
                <Text style={styles.countryFieldText}>{selectedItem}</Text>
              </TouchableOpacity>
            </View>
            <Modal
              animationType="fade"
              visible={modalVisible}
              transparent={true}>
              <View style={styles.modalContent}>
                <FlatList
                  data={countries}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      // onPress={() => setSelectedItem(item.name)}
                      onPress={() => {
                        setSelectedItem(item.name);
                        handleCloseModal();
                      }}>
                      <Text style={styles.modalText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}
                  ItemSeparatorComponent={myItemSeparator}
                  ListHeaderComponent={myHeaderComponent}
                  style={styles.modalFlatList}></FlatList>
                <Button title="Close" onPress={handleCloseModal}></Button>
              </View>
            </Modal>
            {Object.keys(errors).length > 0 && (
              <Text style={styles.error}>{Object.values(errors)[0]}</Text>
            )}

            <View style={styles.container}>
              <TouchableOpacity style={styles.signupBtn} onPress={handleSubmit}>
                <Text style={styles.buttonText}>{t('signup')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text style={styles.signUpBtnText}>
                  {t('Alreadyhaveanacc')}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
    // </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  headerText: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioText: {
    fontSize: 17,
    color: 'black',
  },
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    height: 30,
    width: 30,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
  },
  radioBg: {
    backgroundColor: 'black',
    height: 18,
    width: 18,
    borderRadius: 20,
    margin: 4,
  },
  genderText: {
    marginTop: 11,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signupBtn: {
    height: 45,
    backgroundColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 50,
    marginTop: 10,
    marginBottom: 5,
    elevation: 7,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  countryFieldText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    // textAlignVertical: 'center',
    // flex: 1,
    color: 'grey',
    padding: 0,
    margin: 0,
  },
  signUpBtnText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 15,
    textDecorationLine: 'underline',
  },
  button1: {
    height: 45,
    backgroundColor: 'white',
    elevation: 5,
    color: 'black',
    borderRadius: 5,
    paddingHorizontal: 50,
    paddingTop: 11,
    margin: 0,
    borderBottomColor: 'black',
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  loginBtn: {
    borderRadius: 5,
    paddingHorizontal: 50,
    color: 'black',
  },
  container: {
    width: '100%',
  },
  input: {
    height: 45,
    borderWidth: 1,
    padding: 12,
    borderRadius: 7,
    elevation: 10,
    borderColor: 'lightgray',
    color: 'black',
    backgroundColor: 'white',
  },
  logo: {
    width: 150,
    height: 94,
    alignSelf: 'center',
    marginBottom: 20,
  },
  mainContainer: {
    // marginHorizontal: 20,
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
    rowGap: 20,
  },
  btnStyle: {
    height: 40,
    backgroundColor: 'black',
    borderRadius: 5,
    margin: 8,
    paddingHorizontal: 20,
  },
  modalFlatList: {
    height: 160,
    width: '90%',
  },
  modalBtn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 20,
    margin: 20,
    width: '60%',
    height: 260,
    marginTop: 300,
    marginLeft: 80,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'brown',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  radioButton: {
    flex: 1,
    flexDirection: 'column',
  },
  error: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const myItemSeparator = () => {
  return (
    <View style={{height: 1, backgroundColor: 'white', marginHorizontal: 10}} />
  );
};
const myHeaderComponent = () => {
  return (
    <View>
      <Text style={styles.heading}>Select a country</Text>
    </View>
  );
};
