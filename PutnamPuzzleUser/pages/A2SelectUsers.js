import { View, Text, Image, Pressable } from "react-native";
import Button from "../components/Button";

import Timer from "../components/Timer";
import MainView from "../components/MainView";
import Spacer from "../components/Spacer";

const A2SelectUsers = ({ children }) => {
    const backgroundStyle = {
        backgroundColor: "#FFD2D2",
        height: "100%",
        width: "100%",
    };



    return (
        // Header: 25%; Timer: 15%, Button: 20%
        <MainView style={backgroundStyle}>
            <Timer />
            <Spacer height={'40%'} />
            <Button title={'Set Quest Duration'} />
        </MainView>
    );
}

export default A2SelectUsers