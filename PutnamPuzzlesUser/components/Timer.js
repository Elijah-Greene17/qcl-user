import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {firebaseConfig} from '../components/firebaseConfig';

import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set} from 'firebase/database';

const Timer = ({isRunning, startTime}) => {
  const [time, setTime] = useState(startTime);

  // useEffect(() => {
  //   setTime(startTime)
  //   let interval;
  //   if (isRunning && time > 0) {
  //     interval = setInterval(() => {
  //       if (time - 1000 >= 0){
  //         setTime(prevTime => prevTime - 1000);
  //       }
  //     }, 1000);
  //   } else {
  //     clearInterval(interval);
  //   }

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [isRunning]);

  // useEffect(() => {
  //   console.log("Time: ", time)
  //   if (time <= 0) {
  //     console.log('Time is up!');
  //   }
  // }, [time, startTime]);

  const hourDisplay = Math.floor(startTime / 3600000);
  const minuteDisplay = Math.floor((startTime % 3600000) / 60000);
  const secondDisplay = Math.floor((startTime % 60000) / 1000);

  return (
    <View style={styles.timer}>
      {startTime <= 0 ? (
        <Text style={styles.timerDoneText}>0:00:00</Text>
      ) : (
        <Text style={styles.timerText}>
          {hourDisplay}:
          {minuteDisplay < 10 ? `0${minuteDisplay}` : minuteDisplay}:
          {secondDisplay < 10 ? `0${secondDisplay}` : secondDisplay}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
    height: '15%',
  },
  timerText: {
    fontSize: 80,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },

  timerDoneText: {
    fontSize: 80,
    fontWeight: '700',
    textAlign: 'center',
    color: 'red',
  },
});

export default Timer;
