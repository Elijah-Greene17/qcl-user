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
import U0HomePage from './pages/U0HomePage';
import U1StartPage from './pages/U1StartPage';
import U2WaitingRoomPage from './pages/U2WaitRoomPage';

import {firebaseConfig} from './components/firebaseConfig';

import AsyncStorage from '@react-native-async-storage/async-storage';
import U3QuestPage from './pages/U3QuestPage';
import U4QuestInProgressPage from './pages/U4QuestInProgessPage';

import {PermissionsAndroid} from 'react-native';
import U5ReviewPage from './pages/U5ReviewPage';

const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const App = () => {
  const [userId, setUserId] = useState(-1);
  const [userName, setUserName] = useState('');
  const [isUserIncluded, setIsUserIncluded] = useState(false);

  const [questNo, setQuestNo] = useState(0);
  const [users, setUsers] = useState([]);
  const [currentAppState, setCurrentAppState] = useState('');
  const [code, setCode] = useState('');
  const [timerEndTime, setTimerEndTime] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [hintName, setHintName] = useState('Error');
  const [hintCooldown, setHintCooldown] = useState(0);
  const [hintStatus, setHintStatus] = useState('Inactive');
  const [userIndex, setUserIndex] = useState(-1);

  const [userIsSelected, setUserIsSelected] = useState(false);

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
          console.log(user.id == userId);
          if (user.id == userId) {
            setIsUserIncluded(true);
            console.log('Changing userIsSelected to: ', user);
            setUserIsSelected(user.selected);
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
        data.users.forEach(user => {
          usersArray.push(user);
        });
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
      setQuestNo(data.questId);
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
    if (currentAppState == 'Uninitiated') {
      // reset all state
      setUserId(-1);
      setUserName('');
      setIsUserIncluded(false);
      setUsers([]);
      setCode('');
      setTimerEndTime(0);
      setUserCode('');
      setHintName('Error');
      setHintCooldown(0);
      setHintStatus('Inactive');
      setUserIndex(-1);
    }
  }, [currentAppState]);

  useEffect(() => {
    console.log('Current App State: ', currentAppState);
  }, [currentAppState]);

  return (
    <AppContext.Provider
      value={{
        questNo,
        setQuestNo,
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
        {(currentAppState == 'Inactive' || currentAppState == 'Set Timer') &&
          (userId >= 0 ? (
            <U2WaitingRoomPage selected={userIsSelected} />
          ) : (
            <U1StartPage />
          ))}
        {currentAppState == 'Uninitiated' && <U0HomePage />}
        {currentAppState == 'Active In Progress' &&
          (isUserIncluded ? <U3QuestPage /> : <U4QuestInProgressPage />)}
        {/* <U5ReviewPage /> */}
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
