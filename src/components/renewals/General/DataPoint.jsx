import React, { useContext } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

import UserContext from "../../../context/context";

const DataPoint = ({ label, value, textColor, valueColor, fontWeight }) => {

    const { height, width, scale, fontScale } = useWindowDimensions();
    const { modelX, modelY, platform } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "stretch",
            // minHeight: 20 * ratioX,
            // marginBottom: 10,
        },
        label: {
            fontSize: 14,
            fontWeight: fontWeight ?? "400",
            color: textColor ?? "#D1D5DB", //#FEC900
        },
        value: {
            fontSize: 14,
            fontWeight: fontWeight ?? "400",
            color: valueColor ?? "#FFFFFF",
        },
    });

    return (
        <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
        </View>
    );
}

export default DataPoint;