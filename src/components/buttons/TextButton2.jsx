import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { Shadow } from 'react-native-shadow-2';
import { fontWeight } from "../../styles/global";

const TextButton2 = ({ text, textColor, backgroundColor, width, height, borderRadius, fontSize, disabled, marginBottom, marginTop }) => {

    const platform = Platform.OS;

    const styles = StyleSheet.create({
        text: {
            color: !disabled ? textColor : "#6B7280", 
            fontSize: fontSize,
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
            backgroundColor: !disabled ? backgroundColor : "#374151",
            marginBottom: marginBottom,
            marginTop: marginTop,
        },
    });

    return (
        <Shadow
            startColor="rgba(0,0,0,0.12)"
            radius={15}
            offset={[0, 2]}
            viewStyle={{ width: "100%" }}
        >
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </Shadow>
    );
}

export default TextButton2;

