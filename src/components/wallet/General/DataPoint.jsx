import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DataPoint = ({ property, value }) => {

    return(
        <View style={styles.container}>
                <Text style={styles.property}>{property.toUpperCase()}</Text>
                <Text style={styles.value}>{value.toString().toUpperCase()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    property: {
        fontSize: 6,
        lineHeight: 10,
        color: "#8D9AA5"
    },
    value: {
        fontSize: 8,
        lineHeight: 10,
    },
});

export default DataPoint;