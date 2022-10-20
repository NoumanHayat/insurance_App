import React, { useContext } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

import UserContext from '../../context/context';

const AddPaymentMethod = () => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            borderRadius: 6,
            backgroundColor: "#065F46",
        },
        text: {
            fontSize: 16,
            fontWeight: "600",
            color: "#FFFFFF",
            alignSelf: "center",
            // marginTop: 15 * ratioY,
            paddingVertical: 10 * ratioY,
        },
    })
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add Payment Method</Text>
        </View>
    )
}

export default AddPaymentMethod
