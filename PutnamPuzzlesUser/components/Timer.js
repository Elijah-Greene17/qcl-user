import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import Button from './Button';

const Timer = ({ hidden }) => {
  const [time, setTime] = useState(4000)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const runTimer = () => {
    // console.log(time)
    let timeClone = time
    const h = Math.floor(timeClone / 3600)
    timeClone = time % 3600
    const m = Math.floor(timeClone / 60)
    timeClone = time % 60
    const s = timeClone
    setHours(h)
    setMinutes(m)
    setSeconds(s)

    setTimeout(() => {
      const decInt = time - 1;
      setTime(decInt)
    }, 1000)
  }

  useEffect(() => {
    runTimer()
  }, [time])

  const timer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
    height: '15%',
  };

  const timerText = {
    fontSize: 80,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  };

  return (
    <View style={timer}>
      {!hidden && <Text style={timerText}>
        {hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}</Text>}

    </View>
  );
};

export default Timer;
