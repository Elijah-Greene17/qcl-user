import {View, Text, Image} from 'react-native';

const Timer = ({hidden}) => {
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
      {!hidden && <Text style={timerText}>0:00:00</Text>}
    </View>
  );
};

export default Timer;
