import React from 'react';

import { Text, StyleSheet } from 'react-native';

const ParagraphText = ({ text }) => {
    return (
        <Text style={styles.paragraphText} >{text}</Text>
    );
}

const styles = StyleSheet.create({
    paragraphText: {
        width: 296,
        height: 76,
        padding: 8,
        // fontFamily: "Roboto",
        fontSize: 12,
        lineHeight: 20,
        color: "#000000",
        fontStyle: "italic",
        backgroundColor: "#EDF0F2",
    }
});

export default ParagraphText;
