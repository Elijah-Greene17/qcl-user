import { View } from "react-native";

const Spacer = ({ height }) => {
    const spacer = {
        height: height
    };

    return (
        <View style={spacer}></View>
    );
}

export default Spacer