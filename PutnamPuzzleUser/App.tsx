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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import A1StartPage from './pages/A1StartPage';
import A2SelectUsers from './pages/A2SelectUsers';

import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set} from 'firebase/database';

import {firebaseConfig} from './components/firebaseConfig';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const [currentAppState, setCurrentAppState] = useState('Inacvitve');
  const [code, setCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [hintCooldown, setHintCooldown] = useState(0);
  const [hintStatus, setHintStatus] = useState('Inactive');

  const backgroundStyle = {
    backgroundColor: "#FFD2D2",

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
    });
  }, []);

  return (

    <SafeAreaView style={Platform.OS == 'android' ? SafeViewAndroid.AndroidSafeArea : backgroundStyle}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#FFD2D2" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ animation: 'none' }}>
          <Stack.Screen
            name="A1"
            component={A1StartPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="A2"
            component={A2SelectUsers}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaView>

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
