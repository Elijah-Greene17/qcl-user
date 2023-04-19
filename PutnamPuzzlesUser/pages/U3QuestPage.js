import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Image, Pressable, TextInput} from 'react-native';
import Timer from '../components/Timer';
import MainView from '../components/MainView';

import {AppContext} from '../Contexts/AppContext';
import Button from '../components/Button';
import Spacer from '../components/Spacer';

import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set} from 'firebase/database';
import {firebaseConfig} from '../components/firebaseConfig';

import {send} from 'react-native-sms';

const U3QuestPage = () => {
  const [time, setTime] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');

  const {timerEndTime, code, userCode, setUserCode, userName, hintStatus} =
    useContext(AppContext);

  const backgroundStyle = {
    backgroundColor: '#D2D2FF',
    height: '100%',
    width: '100%',
  };

  const waitingViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  };

  const waitingViewTextStyle = {
    fontSize: 30,
    textAlign: 'center',
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
  const hintStyle = {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  };

  const handleHint = () => {
    console.log('handleHint');
    // connect to db
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    set(ref(db, 'app/hint/by'), userName);
    set(ref(db, 'app/hint/status'), 'Active');
  };

  const handleCodeSubmition = () => {
    console.log('handleCodeSubmition');
    console.log(enteredCode);

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    set(ref(db, 'app/code/userEntered'), enteredCode.toUpperCase());
  };

  useEffect(() => {
    console.log('timerEndTime', timerEndTime);
    // Calculate Time Remaining
    const currentTime = Date.now();
    let timeRemaining = timerEndTime - currentTime;
    setTime(timeRemaining);

    // count down timer
    const timer = setInterval(() => {
      console.log(timeRemaining);
      if (timeRemaining > 0) {
        timeRemaining -= 1000;
        setTime(timeRemaining);
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timerEndTime]);

  useEffect(() => {
    if (enteredCode.length > 0) {
      console.log('Code Subitted: ', userCode);
      console.log('Acutal Code: ', code);
    }
    if (userCode == code) {
      setCompleted(true);
    }
  }, [userCode]);

  return (
    <MainView style={backgroundStyle}>
      <Timer isRunning={true} startTime={time} />
      <Spacer height={'5%'} />

      {completed ? (
        <View>
          <Text style={waitingViewTextStyle}>
            Congratulations! You have completed the quest! Your host will see
            you in a moment
          </Text>
        </View>
      ) : (
        <>
          {userCode.length > 0 && userCode != code && enteredCode.length > 0 ? (
            <Text style={hintStyle}>
              Sorry, the Completion Code is Incorrect
            </Text>
          ) : (
            <Text style={labelStyle}>Enter Quest Completion Code</Text>
          )}
          <View style={textInputViewStyle}>
            <TextInput
              style={textInputStyle}
              autoCapitalize={'characters'}
              onChangeText={text => {
                setEnteredCode(text);
                if (text.length == 0) {
                  const app = initializeApp(firebaseConfig);
                  const db = getDatabase(app);
                  set(ref(db, 'app/code/userEntered'), '');
                }
              }}
              value={enteredCode}
            />
          </View>
          <Spacer height={'5%'} />

          <Button title={'Submit Code'} onClick={handleCodeSubmition} />
          {hintStatus == 'Inactive' ? (
            <Button title={'Request Hint'} onClick={handleHint} />
          ) : (
            <>
              <Spacer height={'5%'} />
              <Text style={hintStyle}>Hint Requested</Text>
            </>
          )}
        </>
      )}
    </MainView>
  );
};

export default U3QuestPage;
