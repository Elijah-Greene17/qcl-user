import {View, Text, Image, Pressable, TextInput} from 'react-native';
import {useContext} from 'react';
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

const U0HomePage = ({selected}) => {
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
  const waitingViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  };

  const waitingViewTextStyle = {
    fontSize: 30,
    textAlign: 'center',
    width: '80%',
  };

  return (
    // Header: 25%; Timer: 15%, Form: 35%, Button: 20%
    <MainView style={backgroundStyle}>
      <Spacer height={'15%'} />
      <View style={waitingViewStyle}>
        <Text style={waitingViewTextStyle}>
          No quests are currently available
        </Text>
      </View>
    </MainView>
  );
};

export default U0HomePage;
