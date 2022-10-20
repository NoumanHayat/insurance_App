import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { fontWeight } from "../../styles/global";

const TextButtonX = ({ text, textColor, backgroundColor, width, height, borderRadius, fontSize, disabled }) => {

    const platform = Platform.OS;

    const styles = StyleSheet.create({
        text: {
            color: disabled ? "#8D9AA5" : textColor,
            fontSize: fontSize,
            lineHeight: fontSize,
            // fontFamily: "Roboto",
            fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: width,
            height: height,
            borderRadius: borderRadius,
            backgroundColor: disabled ? "#525B64" : backgroundColor,
        },
    });

    return (
        <View style={styles.buttonContainer}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

export default TextButtonX;
