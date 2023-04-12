import { View, Text, Image, Pressable } from 'react-native';
import Button from './Button';
import Header from './Header';
import Timer from './Timer';

const MainView = ({ children }) => {
  const backgroundStyle = {
    backgroundColor: '#D2D2FF',
    height: '100%',
    width: '100%',
  };

  return (
    <View style={backgroundStyle}>
      <Header code={'0508'} />
      {children}
    </View>
  );
};

export default MainView;
