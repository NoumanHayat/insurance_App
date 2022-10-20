import React from 'react';

import { Text, StyleSheet } from 'react-native';

const MediumText = ({ text, marginTop, fontSize, fontWeight, lineHeight }) => {
    return (
        <Text style={[styles.titleText, { marginTop, fontSize, fontWeight, lineHeight }]} >{text}</Text>
    );
}

const styles = StyleSheet.create({
    titleText: {
        // width: 43,
        height: 20,
        // fontFamily: "Inter",
        // fontSize: 16, -- recently changed
        // fontWeight: "700", -- recently changed
        // lineHeight: 20, -- recently changed
        color: "#000000"
    }
});

export default MediumText;
