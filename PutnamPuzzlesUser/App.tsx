/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
import U1StartPage from './pages/U1StartPage';
import U2WaitingRoomPage from './pages/U2WaitRoomPage';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {

  const backgroundStyle = {
    backgroundColor: "#D2D2FF",
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,

    //flex: 1,
    // top: Platform.OS === "android" ? (StatusBar.currentHeight : 0,
    //backgroundColor: Platform.OS === "android" ? 'red' : 'blue'
  };

  return (

    <SafeAreaView style={Platform.OS == 'android' ? SafeViewAndroid.AndroidSafeArea : backgroundStyle}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#D2D2FF" />
      <NavigationContainer>
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


/**
 * Connect with Github
 * Connect to Database
 * Clean Up U1
 */