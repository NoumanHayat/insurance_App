import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';

import UserContext from "../../context/context";

const Dismiss = ({ onPress, text }) => {

    const { height, width, scale, fontScale } = useWindowDimensions();
    const { modelX, modelY, platform } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#6B7280",
            width: 351 * ratioX,
            height: 48 * ratioY,
            borderRadius: 8,
        },
        text: {
            color: "#FFFFFF",
            fontSize: 20,
            fontWeight: "600",
        }
    });

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text ?? "Dismiss"}</Text>
        </Pressable>
    )
}

export default Dismiss;
