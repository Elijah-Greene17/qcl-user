import {View, Text, Image, ProgressViewIOSComponent} from 'react-native';

const Header = ({code}) => {
  const header = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '25%',
  };

  const container = {
    flex: 1,
  };

  const textStyle = {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  };

  const codeStyle = {
    fontSize: 40,
    fontWeight: '200',
    textAlign: 'center',
    marginTop: '20%',
    color: 'black',
  };

  const logoStyle = {
    width: '90%',
    height: undefined,
    aspectRatio: 1,
  };

  return (
    <View style={header}>
      <View style={container}>
        <Text style={textStyle}>Quest No.</Text>
        <Text style={codeStyle}>{code}</Text>
      </View>
      <View style={container}>
        <Image style={logoStyle} source={require('../assets/Logo.jpg')} />
      </View>
    </View>
  );
};

export default Header;
