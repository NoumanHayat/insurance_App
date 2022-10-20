import React from "react";
import { View, StyleSheet, Image } from "react-native";

const Logo = ({ height, width }) => {
    return (
        <View >
            <Image style={{ height, width }} source={require('../../../assets/logo/logo.png')} />
        </View>
    );
}

export default Logo;
