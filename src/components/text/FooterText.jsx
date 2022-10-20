import React from 'react';

import { Text, StyleSheet } from 'react-native';

const FooterText = ({ text, marginTop, color, fontSize, lineHeight }) => {
    return (
        <Text style={[styles.footerText, { marginTop, color, fontSize, lineHeight }]} >{text}</Text>
    );
}

const styles = StyleSheet.create({
    footerText: {
        // display: "flex",
        // fontFamily: "Inter",
        // fontSize: 12,
        // lineHeight: 20,
        // color: "#8D9AA5" //get the hex for the gray in figma
    }
});

export default FooterText;
