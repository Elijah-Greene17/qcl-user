import {View, Text, Image, Pressable, TextInput} from 'react-native';
import {useContext, useRef} from 'react';
import {AppContext} from '../Contexts/AppContext';

import Button from '../components/Button';

import Timer from '../components/Timer';
import MainView from '../components/MainView';
import Spacer from '../components/Spacer';
import {useState, useEffect} from 'react';
import Lobby from '../components/Lobby';

import {firebaseConfig} from '../components/firebaseConfig';

import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set, get, child} from 'firebase/database';

import AsyncStorage from '@react-native-async-storage/async-storage';

const retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    return null;
  }
};
const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Handle error if needed
    console.error(error);
  }
};

const U1StartPage = ({navigation}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [number, setNumber] = useState('');

  const numRef = useRef();

  const {userId, setUserId, userName, setUserName, userIndex} =
    useContext(AppContext);

  const onStartup = async () => {
    const localName = await retrieveData('localStoragePPName');
    const localPhone = await retrieveData('localStoragePPPhone');

    if (localName) {
      console.log('local name exists: ' + localName);
      setName(localName);
    }
    if (localPhone) {
      console.log('local phone exists: ' + localPhone);
      setPhoneNumber(localPhone);
    }
  };

  useEffect(() => {
    //Format Phone Number
    let phoneText = '';
    console.log(number);
    switch (number.length) {
      case 1:
        // code block to be executed if expression === value1
        phoneText = '(' + number + ')';
        break;
      case 2:
        // code block to be executed if expression === value2
        phoneText = '(' + number + ')';
        break;
      // you can have any number of case statements
      case 3:
        phoneText = '(' + number + ')';
        break;
      case 4:
        phoneText =
          '(' + number.substring(0, 3) + ') ' + number.substring(3, 4);
        break;
      case 5:
        phoneText =
          '(' + number.substring(0, 3) + ') ' + number.substring(3, 5);
        break;
      case 6:
        phoneText =
          '(' + number.substring(0, 3) + ') ' + number.substring(3, 6);
        break;
      case 7:
        phoneText =
          '(' +
          number.substring(0, 3) +
          ') ' +
          number.substring(3, 6) +
          '-' +
          number.substring(6, 7);
        break;
      case 8:
        phoneText =
          '(' +
          number.substring(0, 3) +
          ') ' +
          number.substring(3, 6) +
          '-' +
          number.substring(6, 8);
        break;
      case 9:
        phoneText =
          '(' +
          number.substring(0, 3) +
          ') ' +
          number.substring(3, 6) +
          '-' +
          number.substring(6, 9);
        break;
      case 10:
        phoneText =
          '(' +
          number.substring(0, 3) +
          ') ' +
          number.substring(3, 6) +
          '-' +
          number.substring(6, 10);
        break;

      default:
        // code block to be executed if expression doesn't match any case
        phoneText = '';
    }

    setPhoneNumber(phoneText);
  }, [number]);

  const handleNameChange = text => {
    setName(text);
  };
  const handlePhoneNumberChange = num => {
    setPhoneNumber(num);
  };

  const submitPlayerInfo = () => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();

    setUserId(userIndex || 0);
    setUserName(name);

    set(ref(db, 'app/users/' + (userIndex || 0)), {
      Name: name,
      Phone: phoneNumber,
      id: userIndex || 0,
      selected: false,
    });
    set(ref(db, 'app/userIndex'), userIndex + 1);

    // saveData('localStoragePPName', name);
    // saveData('localStoragePPPhone', phoneNumber);
    // saveData('localStoragePPUserId', userIndex.toString() || 0);
  };

  const backgroundStyle = {
    backgroundColor: '#D2D2FF',
    height: '100%',
    width: '100%',
  };

  const formStyle = {
    height: '30%',
    width: '100%',
  };

  const labelStyle = {
    textAlign: 'center',
    width: '100%',
    fontSize: 20,
  };
  const textInputViewStyle = {
    marginTop: '1%',
    height: 45,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  };
  const textInputStyle = {
    fontSize: 20,
    textAlign: 'center',
    width: '60%',
    backgroundColor: '#fff',
  };
  const hiddenTextInput = {
    display: 'none',
  };

  return (
    // Header: 25%; Timer: 15%, Form: 35%, Button: 20%
    <MainView style={backgroundStyle}>
      <View style={formStyle}>
        <Text style={labelStyle}>Name</Text>
        <View style={textInputViewStyle}>
          <TextInput
            style={textInputStyle}
            onChangeText={handleNameChange}
            value={name}
          />
        </View>
        <Spacer height="10%" />
        <Text style={labelStyle}>Phone Number</Text>
        <View style={textInputViewStyle}>
          <TextInput
            style={textInputStyle}
            keyboardType="number-pad"
            onFocus={() => {
              numRef.current.focus();
            }}
            // onChangeText={handlePhoneNumberChange}
            value={phoneNumber}
          />
          <TextInput
            style={hiddenTextInput}
            keyboardType="number-pad"
            onChangeText={text => {
              setNumber(text);
            }}
            ref={numRef}
            maxLength={10}
            value={number}
          />
        </View>
      </View>

      <Button title={'Submit'} onClick={submitPlayerInfo} />
      <Spacer height="20%" />
    </MainView>
  );
};

export default U1StartPage;
