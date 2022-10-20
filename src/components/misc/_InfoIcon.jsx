import React, { useContext } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

import UserContext from '../../context/context';

const _InfoIcon = ({letter}) => {

    const { height, width } = useWindowDimensions();
	const { modelX, modelY } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

    const styles = StyleSheet.create({
            container: {
                height: 32 * ratioY,
                width: 32 * ratioY,
                borderRadius: 16 * ratioY,
                backgroundColor: "#6B7280",
                justifyContent: "center",
                alignItems: "center",
            },
            letter: {
                textAlignVertical: "center",
                fontSize: 20 * ratioY,
                color: "#fff",
                fontWeight: "700"
            }
    })

    return(
        <View style={styles.container}>
            <Text style={styles.letter}>{letter}</Text>
        </View>
    )
}

export default _InfoIcon;