/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform
} from 'react-native';

import MainView from './components/MainView';
import SafeViewAndroid from "./components/SafeViewAndroid";
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

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import U1StartPage from './pages/U1StartPage';
import U2WaitingRoomPage from './pages/U2WaitRoomPage';

import {firebaseConfig} from './components/firebaseConfig';

const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const [currentAppState, setCurrentAppState] = useState('Inacvitve');
  const [code, setCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [hintName, setHintName] = useState('Error');
  const [hintCooldown, setHintCooldown] = useState(0);
  const [hintStatus, setHintStatus] = useState('Inactive');

  const backgroundStyle = {
    backgroundColor: "#D2D2FF",
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
  };

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, 'app');
    onValue(dbRef, snapshot => {
      const data = snapshot.val();
      setCurrentAppState(data.currentState);
      setHintCooldown(data.hint.cooldown);
      setCode(data.code.value);
      setUserCode(data.code.userEntered);
      setHintStatus(data.hint.status);
      setHintName(data.hint.by);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentAppState,
        setCurrentAppState,
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
      }}>
    <SafeAreaView style={Platform.OS == 'android' ? SafeViewAndroid.AndroidSafeArea : backgroundStyle}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#D2D2FF" />
      {/* <NavigationContainer>
        <Stack.Navigator screenOptions={{ animation: 'none' }}>
          <Stack.Screen
            name="U1"
            component={U1StartPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="U2"
            component={U2WaitingRoomPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer> */}
        {currentAppState == 'Inactive' && <U1StartPage />}
        {currentAppState == 'Active In Progress' && <U2WaitingRoomPage />}
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