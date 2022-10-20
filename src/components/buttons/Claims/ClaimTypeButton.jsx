import React, { useContext } from 'react';
import { StyleSheet, useWindowDimensions, Text, Pressable } from 'react-native';

import UserContext from '../../../context/context';
import { useNavigation } from "@react-navigation/native";

import CollisionButton from "../../../../assets/buttons/collision-btn.svg"

const ClaimTypeButton = ({ icon, text, onClaimTypePress }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const navigation = useNavigation()

    const styles = StyleSheet.create({
        container: {
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgba(75, 85, 99, 1)",
            width: 159 * ratioX,
            height: 132 * ratioY,
            borderRadius: 8,
            paddingVertical: 24 * ratioX,
            margin: 12 * ratioX,
        },
        text: {
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "600",
        },
    });

    return (
        <Pressable onPress={onClaimTypePress} style={styles.container}>
            {icon}
            <Text style={[styles.text]}>{text}</Text>
        </Pressable>
    )
}

export default ClaimTypeButton;
