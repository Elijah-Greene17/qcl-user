import {useState} from 'react';
import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import Button from './Button';
import CustomCheckbox from './CustomCheckbox';
import Header from './Header';
import Timer from './Timer';

const Lobby = () => {
  const lobbyStyle = {
    height: '35%',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  return (
    <View style={lobbyStyle}>
      <ScrollView>
        {/* {items.map((item, index) => (
        <Quester key={index} item={item} />
      ))} */}
        <Quester number="Check All" />
        <Quester name="Elijah" number="860-377-6672" />
        <Quester name="Maria" number="860-377-6672" />
        <Quester name="Ken" number="860-377-6672" />
      </ScrollView>
    </View>
  );
};

const Quester = ({name, number}) => {
  const [isSelected, setIsSelected] = useState(false);

  const questerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 10,
  };

  const questerText = {
    fontSize: 20,
    marginRight: 20,
  };

  return (
    <View style={questerStyle}>
      <Text style={questerText}>{name}</Text>
      <View style={questerStyle}>
        <Text style={questerText}>{number}</Text>
        <CustomCheckbox />
      </View>
    </View>
  );
};

export default Lobby;
