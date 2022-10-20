import React from "react";
import { View, StyleSheet, Image } from "react-native";

const CoverageIcon = ({ source }) => {

    return (
        <View>
            <Image source={source} />
        </View>
    );
}

export default CoverageIcon;
