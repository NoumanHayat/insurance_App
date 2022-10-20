import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import UserContext from "../../context/context"

import { colour, fontSize, fontWeight } from '../../styles/global';

const VerificationOption = ({ text, selected, value }) => {

    const { height, width } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            height: 48 * ratioY,
            borderRadius: 6,
            backgroundColor: selected == value ? "#6B7280" : "#374151",
            width: 298 * ratioX,
            justifyContent: "center",
            paddingLeft: 12,
            marginLeft: 12 * ratioX,
        },
        text: {
            // fontFamily: "Roboto",
            fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
            fontSize: fontSize['font-size-3'],
            lineHeight: 18.75,
            color: "#fff"
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
};

export default VerificationOption;