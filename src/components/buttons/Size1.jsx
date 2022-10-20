import React, { useContext } from 'react';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';

import UserContext from '../../context/context';
import { fontWeight } from '../../styles/global';

const Size1 = ({ text, width: _width, activeColor, disabled, btnHeight }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 14 * ratioY,
            paddingHorizontal: 16 * ratioX,
            backgroundColor: disabled ? "#374151" : activeColor,
            width: _width ? _width * ratioX : "100%",
            height: btnHeight ?? 48 * ratioY,
            borderRadius: 8 * ratioY
        },
        text: {
            color: "#fff",
            fontWeight: fontWeight['font-weight-3'],
            fontSize: 20 * ratioY
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

export default Size1;