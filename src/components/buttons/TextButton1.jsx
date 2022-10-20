import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { Shadow } from 'react-native-shadow-2';
import { fontWeight } from "../../styles/global";

const TextButton1 = ({ text, textColor, backgroundColor, width, height, borderRadius, fontSize, navigation, to, disabled }) => {

    const platform = Platform.OS;

    const styles = StyleSheet.create({
        text: {
            color: disabled ? "#8D9AA5" : textColor,
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
            backgroundColor: disabled ? "#525B64" : backgroundColor,
        },
    });

    return (
        <Shadow
            startColor="rgba(0,0,0,0.12)"
            radius={15}
            offset={[0, 5]}
        >
            <Pressable onPress={() => navigation.navigate(to)} style={styles.buttonContainer}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </Shadow>
    );
}

export default TextButton1;
