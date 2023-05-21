import {View, Text, Image, Pressable, TextInput} from 'react-native';
import Timer from '../components/Timer';
import MainView from '../components/MainView';
import Spacer from '../components/Spacer';

const U2WaitingRoomPage = ({selected}) => {
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

  return (
    <MainView style={backgroundStyle}>
      <Spacer height={'10%'} />
      <View style={waitingViewStyle}>
        {selected ? (
          <Text style={waitingViewTextStyle}>
            Entry Accepted, waiting start of quest...
          </Text>
        ) : (
          <Text style={waitingViewTextStyle}>Awaiting Entry to Quest...</Text>
        )}
      </View>
    </MainView>
  );
};

export default U2WaitingRoomPage;
