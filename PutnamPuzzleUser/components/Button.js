import {View, Text, Pressable} from 'react-native';

const Button = ({title, onClick}) => {
  const container = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '10%',
    marginTop: '10%',
  };

  const buttonBorder = {
    backgroundColor: 'black',
    width: '70%',
    borderRadius: 50,
    padding: 5,
  };

  const button = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    backgroundColor: '#76b368',
    height: '100%',
    width: '100%',
    borderRadius: 50,
  };

  const buttonText = {
    textAlign: 'center',
    fontSize: 25,
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

export default Button;
