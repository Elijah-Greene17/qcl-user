import {View, Text, Pressable} from 'react-native';

const SubButton = ({title, onClick}) => {
  const container = {
    width: '15%',
  };

  const buttonBorder = {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 3,
  };

  const button = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    backgroundColor: 'pink',
    padding: 8,
    borderRadius: 2,
  };

  const buttonText = {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
  };

  return (
    <View style={container}>
      <Pressable style={buttonBorder} onPress={onClick}>
        <View style={button}>
          <Text style={buttonText}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SubButton;
