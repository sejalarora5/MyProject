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
} from 'react-native';
// import {
//   RadioButton,
//   RadioButtonProps,
//   RadioGroup,
// } from 'react-native-radio-buttons-group';
import React, {useMemo} from 'react';
import {useState} from 'react';
import {RootStackParamList} from '../../App';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
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
const SignUpScreen = ({navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [selectedItem, setSelectedItem] = useState('Country');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPass] = useState('');

  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // const radioButtons: RadioButtonProps[] = useMemo(
  //   () => [
  //     {
  //       id: '1',
  //       value: 'male',
  //       label: 'Male',
  //     },
  //     {
  //       id: '2',
  //       value: 'female',
  //       label: 'Female',
  //     },
  //   ],
  //   [],
  // );

  const handlePress = () => {
    //await AsyncStorage.setItem('userToken', 'true');
    navigation.navigate('Tab');
  };

  const [selectedRadio, setSelectedRadio] = useState(0);

  return (
    <View style={styles.mainContainer}>
      <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
      <Text style={styles.headerText}>Register</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Enter email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={contact}
        onChangeText={text => setContact(text)}
        placeholder="Enter phone number"
        keyboardType="numeric"
      />
      <View style={styles.radioContainer}>
        {/* <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
        /> */}
        <TouchableOpacity onPress={() => setSelectedRadio(1)}>
          <View style={styles.radioWrapper}>
            <View style={styles.radio}>
              {selectedRadio === 1 ? (
                <View style={styles.radioBg}></View>
              ) : null}
            </View>
            <Text style={styles.radioText}>Male</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedRadio(2)}>
          <View style={styles.radioWrapper}>
            <View style={styles.radio}>
              {selectedRadio === 2 ? (
                <View style={styles.radioBg}></View>
              ) : null}
            </View>
            <Text style={styles.radioText}>Female</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPass(text)}
        placeholder="Enter password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button1} onPress={handleOpenModal}>
        <Text style={styles.buttonText}>{selectedItem}</Text>
      </TouchableOpacity>
      <Modal animationType="fade" visible={modalVisible} transparent={true}>
        <View style={styles.modalContent}>
          <FlatList
            data={countries}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => setSelectedItem(item.name)}>
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

      <View style={styles.container}>
        <TouchableOpacity style={styles.button1} onPress={handlePress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    fontSize: 18,
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
    height: 45,
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
  modalFlatList: {
    height: 160,
    width: '90%',
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
    height: 300,
    marginTop: 180,
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
});

const myItemSeparator = () => {
  return (
    <View style={{height: 1, backgroundColor: 'grey', marginHorizontal: 10}} />
  );
};
const myHeaderComponent = () => {
  return (
    <View>
      <Text style={styles.heading}>Select a country</Text>
    </View>
  );
};
