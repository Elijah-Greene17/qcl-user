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

const U3QuestPage = () => {
  const [time, setTime] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');

  const {timerEndTime, code, userCode, setUserCode} = useContext(AppContext);

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

  const handleHint = () => {
    console.log('handleHint');
  };

  const handleCodeSubmition = () => {
    console.log('handleCodeSubmition');
    console.log(enteredCode);

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    set(ref(db, 'app/code/userEntered'), enteredCode);
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
  }, [userCode]);

  return (
    <MainView style={backgroundStyle}>
      <Timer isRunning={true} startTime={time} />
      <Spacer height={'5%'} />
      <Text style={labelStyle}>Enter Quest Completion Code</Text>
      <View style={textInputViewStyle}>
        <TextInput
          style={textInputStyle}
          onChangeText={text => setEnteredCode(text)}
          value={enteredCode}
        />
      </View>

      <Spacer height={'5%'} />
      <Button title={'Submit Code'} onClick={handleCodeSubmition} />
      <Button title={'Request Hint'} onClick={handleHint} />
    </MainView>
  );
};

export default U3QuestPage;
