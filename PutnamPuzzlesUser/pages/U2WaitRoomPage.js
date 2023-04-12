import { View, Text, Image, Pressable, TextInput } from 'react-native';
import Timer from '../components/Timer';
import MainView from '../components/MainView';

const U2WaitingRoomPage = ({ navigation }) => {
    const backgroundStyle = {
        backgroundColor: '#D2D2FF',
        height: '100%',
        width: '100%',
    };

    const waitingViewStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    };

    const waitingViewTextStyle = {
        fontSize: 30,
        textAlign: "center"
    }

    return (
        <MainView style={backgroundStyle}>
            <Timer />
            <View style={waitingViewStyle}>
                <Text style={waitingViewTextStyle}>Waiting to start quest...</Text>
            </View>

        </MainView>
    )
}

export default U2WaitingRoomPage