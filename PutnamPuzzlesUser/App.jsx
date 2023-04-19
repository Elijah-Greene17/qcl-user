/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
} from 'react-native';

import MainView from './components/MainView';
import SafeViewAndroid from './components/SafeViewAndroid';
import {AppContext} from './Contexts/AppContext';
import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set} from 'firebase/database';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import U1StartPage from './pages/U1StartPage';
import U2WaitingRoomPage from './pages/U2WaitRoomPage';

import {firebaseConfig} from './components/firebaseConfig';

import AsyncStorage from '@react-native-async-storage/async-storage';
import U3QuestPage from './pages/U3QuestPage';
import U4QuestInProgressPage from './pages/U4QuestInProgessPage';

import {PermissionsAndroid} from 'react-native';

const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const App = () => {
  const [userId, setUserId] = useState(-1);
  const [userName, setUserName] = useState('');
  const [isUserIncluded, setIsUserIncluded] = useState(false);

  const [users, setUsers] = useState([]);
  const [currentAppState, setCurrentAppState] = useState('Inacvitve');
  const [code, setCode] = useState('');
  const [timerEndTime, setTimerEndTime] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [hintName, setHintName] = useState('Error');
  const [hintCooldown, setHintCooldown] = useState(0);
  const [hintStatus, setHintStatus] = useState('Inactive');
  const [userIndex, setUserIndex] = useState(-1);

  const backgroundStyle = {
    backgroundColor: '#D2D2FF',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
  };

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Handle error if needed
      console.error(error);
    }
  };

  const retrieveData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      return null;
    }
  };

  const getUserId = async () => {
    const localUserId = await retrieveData('localStoragePPUserId');
    if (localUserId != null) {
      setUserId(parseInt(localUserId));
    }
  };

  useEffect(() => {
    setIsUserIncluded(false);
    console.log('MY GD USERS: ', users);
    console.log('App.tsx useEffect');
    if (users) {
      console.log('myusers');
      console.log(users.length);
      users.forEach(user => {
        if (user) {
          console.log('EG user ', user);
          console.log('EG user.id ', user.id);
          console.log('EG userId ', userId);
          console.log(user == userId);
          if (user == userId) {
            setIsUserIncluded(true);
          }
        }
      });
    }
  }, [users]);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, 'app');
    onValue(dbRef, snapshot => {
      const data = snapshot.val();
      let usersArray = [];
      if (data.users) {
        console.log(data.users);
        for (let user in data.users) {
          usersArray.push(user);
        }
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
      setCurrentAppState(data.currentState);
      setHintCooldown(data.hint.cooldown);
      setTimerEndTime(data.timer.endTime);
      setCode(data.code.value);
      setUserCode(data.code.userEntered);
      setHintStatus(data.hint.status);
      setHintName(data.hint.by);
      setUserIndex(data.userIndex);
    });
  }, []);

  useEffect(() => {
    console.log('Current App State: ', currentAppState);
  }, [currentAppState]);

  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        userName,
        setUserName,
        currentAppState,
        setCurrentAppState,
        timerEndTime,
        setTimerEndTime,
        code,
        setCode,
        userCode,
        setUserCode,
        hintName,
        setHintName,
        hintCooldown,
        setHintCooldown,
        hintStatus,
        setHintStatus,
        userIndex,
        setUserIndex,
      }}>
      <SafeAreaView
        style={
          Platform.OS == 'android'
            ? SafeViewAndroid.AndroidSafeArea
            : backgroundStyle
        }>
        <StatusBar barStyle={'dark-content'} backgroundColor="#D2D2FF" />
        {currentAppState != 'Active In Progress' &&
          (userId >= 0 ? <U2WaitingRoomPage /> : <U1StartPage />)}
        {currentAppState == 'Active In Progress' &&
          (isUserIncluded ? <U3QuestPage /> : <U4QuestInProgressPage />)}
        {/* {currentAppState == 'Active In Progress' && <U3QuestPage />} */}
      </SafeAreaView>
    </AppContext.Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

/**
 * Connect with Github
 * Connect to Database
 * Clean Up U1
 */
