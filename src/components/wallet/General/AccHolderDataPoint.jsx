import React, { useContext } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

import UserContext from '../../../context/context';
import { fontWeight } from '../../../styles/global';

const AccHolderDataPoint = ({ property, value }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    // eslint-disable-next-line
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            marginTop: 8 * ratioY,
        },
        property: {
            fontWeight: fontWeight['font-weight-1'],
            fontSize: Math.max(10, 10 * ratioY),
            lineHeight: Math.max(10, 10 * ratioY),
            color: "#4B5563",
            width: "80%"
        },
        value: {
            fontWeight: fontWeight['font-weight-1'],
            fontSize: Math.max(12, 12 * ratioY),
            lineHeight: Math.max(12, 12 * ratioY),
            color: "#1F2937",
            marginTop: 8 * ratioY
        },
    });

    return(
        <View style={styles.container}>
                <Text style={styles.property}>{property}</Text>
                <Text style={styles.value}>{value?.toString()}</Text>
        </View>
    )
}



export default AccHolderDataPoint;