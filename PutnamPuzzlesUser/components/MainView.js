import {useContext} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import Button from './Button';
import Header from './Header';
import Timer from './Timer';
import {AppContext} from '../Contexts/AppContext';

const MainView = ({children}) => {
  const {questNo} = useContext(AppContext);

  const backgroundStyle = {
    backgroundColor: '#D2D2FF',
    height: '100%',
    width: '100%',
  };

  return (
    <View style={backgroundStyle}>
      <Header code={questNo} />
      {children}
    </View>
  );
};

export default MainView;
