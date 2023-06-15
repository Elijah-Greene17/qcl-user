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

  const fakeRef = useRef();
  const numRef = useRef();

  const {userId, setUserId, userName, setPhone, setUserName, userIndex} =
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
      setPhone(localPhone);
    }
  };

  const formatPhoneNumber = text => {
    let cleaned = text.replace(/\D/g, ''); // remove all non-digits
    let formatted = cleaned;
    if (cleaned.length > 6) {
      // format as "(XXX) XXX-XXXX" if we have enough digits
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(
        3,
        6,
      )}-${cleaned.slice(6)}`;
    } else if (cleaned.length > 3) {
      // format as "(XXX) XXX" if we have up to 6 digits
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else if (cleaned.length > 0) {
      // format as "(XXX" if we have up to 3 digits
      formatted = `(${cleaned}`;
    }
    setPhoneNumber(formatted);
    setPhone(formatted);
  };

  useEffect(() => {
    //Format Phone Number
    console.log('number: ' + number);
    let editedNumber = '';
    // set edited number to only numbers
    for (let i = 0; i < number.length; i++) {
      if (number[i] >= '0' && number[i] <= '9') {
        editedNumber += number[i];
      }
    }
    console.log('editedNumber: ' + editedNumber);

    let phoneText = editedNumber;
    switch (editedNumber.length) {
      case 1:
        // code block to be executed if expression === value1
        phoneText = '(' + editedNumber + ')';
        break;
      case 2:
        // code block to be executed if expression === value2
        phoneText = '(' + editedNumber + ')';
        break;
      // you can have any number of case statements
      case 3:
        phoneText = '(' + editedNumber + ')';
        break;
      case 4:
        phoneText =
          '(' +
          editedNumber.substring(0, 3) +
          ') ' +
          editedNumber.substring(3, 4);
        break;
      case 5:
        phoneText =
          '(' +
          editedNumber.substring(0, 3) +
          ') ' +
          editedNumber.substring(3, 5);
        break;
      case 6:
        phoneText =
          '(' +
          editedNumber.substring(0, 3) +
          ') ' +
          editedNumber.substring(3, 6);
        break;
      case 7:
        phoneText =
          '(' +
          editedNumber.substring(0, 3) +
          ') ' +
          editedNumber.substring(3, 6) +
          '-' +
          editedNumber.substring(6, 7);
        break;
      case 8:
        phoneText =
          '(' +
          editedNumber.substring(0, 3) +
          ') ' +
          editedNumber.substring(3, 6) +
          '-' +
          editedNumber.substring(6, 8);
        break;
      case 9:
        phoneText =
          '(' +
          editedNumber.substring(0, 3) +
          ') ' +
          editedNumber.substring(3, 6) +
          '-' +
          editedNumber.substring(6, 9);
        break;
      case 10:
        phoneText =
          '(' +
          editedNumber.substring(0, 3) +
          ') ' +
          editedNumber.substring(3, 6) +
          '-' +
          editedNumber.substring(6, 10);
        break;

      default:
        // code block to be executed if expression doesn't match any case
        phoneText = '';
    }

    setPhoneNumber(phoneText);
    setPhone(phoneText);
  }, [number]);

  const handleNameChange = text => {
    setName(text);
  };
  const handlePhoneNumberChange = num => {
    setPhoneNumber(num);
    setPhone(num);
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
          {/* <TextInput
            style={textInputStyle}
            keyboardType="number-pad"
            onFocus={() => {
              numRef.current.focus();
            }}
            ref={fakeRef}
            onChangeText={text => {
              console.log(text);
            }}
            //onChangeText={handlePhoneNumberChange}
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
          /> */}
          <TextInput
            style={textInputStyle}
            value={phoneNumber}
            onChangeText={formatPhoneNumber}
            keyboardType="number-pad"
            maxLength={14}
          />
        </View>
      </View>

      <Button title={'Submit'} onClick={submitPlayerInfo} />
      <Spacer height="20%" />
    </MainView>
  );
};

export default U1StartPage;
