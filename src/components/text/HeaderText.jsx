import React from 'react';

import { Text, StyleSheet } from 'react-native';

const HeaderText = ({ text, marginTop }) => {
    return (
        <Text style={[styles.titleText, { marginTop }]} >{text}</Text>
    );
}

const styles = StyleSheet.create({
    titleText: {
        // fontFamily: "Roboto",
        fontSize: 18,
        fontWeight: "700",
        lineHeight: 20,
        color: "#000000",
    }
});

export default HeaderText;
