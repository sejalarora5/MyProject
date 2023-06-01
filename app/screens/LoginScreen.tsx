import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../config/colors';
import {useDispatch} from 'react-redux';
import {setUserLoggedIn} from '../../redux/actions/loginActions';
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).max(12).label('Password'),
});

const LoginScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const handlePress = () => {
    navigation.navigate('Home');
    dispatch(setUserLoggedIn());
  };
  return (
    <View style={styles.mainContainer}>
      <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={handlePress}
        validationSchema={validationSchema}>
        {({handleChange, handleSubmit, handleBlur, errors, values}) => (
          <>
            <View style={styles.inputField}>
              <MaterialIcons
                name="mail-outline"
                size={25}
                color="black"
                style={styles.iconStyle}
              />
              <TextInput
                style={styles.input}
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="Enter email"
                keyboardType="email-address"
                onBlur={handleBlur('email')}
              />
            </View>
            <View style={styles.inputField}>
              <MaterialIcons
                name="lock"
                size={25}
                color="black"
                style={styles.iconStyle}
              />
              <TextInput
                style={styles.input}
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Enter password"
                secureTextEntry={true}
                onBlur={handleBlur('password')}
              />
            </View>
            {Object.keys(errors).length > 0 && (
              <Text style={styles.error}>{Object.values(errors)[0]}</Text>
            )}
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                <Text style={styles.signUpBtnText}>Create a New Account?</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
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
  loginButton: {
    height: 45,
    backgroundColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 50,
    marginTop: 10,
    marginBottom: 5,
  },
  button2: {
    borderRadius: 5,
    paddingHorizontal: 50,
    color: 'black',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
    color: 'white',
  },
  signUpBtnText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 15,
    textDecorationLine: 'underline',
  },
  container: {
    width: '100%',
  },
  logo: {
    width: 150,
    height: 95,
    alignSelf: 'center',
    marginBottom: 30,
  },
  mainContainer: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    rowGap: 20,
  },
  btnStyle: {
    height: 40,
    backgroundColor: 'black',
    borderRadius: 5,
    margin: 8,
    paddingHorizontal: 20,
  },
  iconStyle: {padding: 10},
  inputField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    elevation: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderColor: 'gray',
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    height: 50,
    backgroundColor: colors.white,
    color: 'black',
    fontSize: 15,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 15,
  },
});
