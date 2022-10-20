import React, { useContext } from "react";
import { View, StyleSheet, StatusBar, Platform } from "react-native";
import { StatusBar as _StatusBar } from "expo-status-bar";

import UserContext from "../../context/context";

const CustomStatusBar = ({ color }) => {

    const { statusBarHeight } = useContext(UserContext);

    const styles = StyleSheet.create({
        statusBar: {
            height: Platform.OS == "ios" ? statusBarHeight : 1,
            backgroundColor: color,
            zIndex: 2
        }
    })

    return (
        <View style={styles.statusBar}>
            <StatusBar barStyle="light-content" backgroundColor={color} />
        </View>
    )
}

export default CustomStatusBar;
