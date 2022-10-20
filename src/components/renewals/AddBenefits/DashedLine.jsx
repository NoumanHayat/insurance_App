import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Line } from 'react-native-svg';

const DashedLine = ({ RSCard }) => {

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            marginBottom: 20
        }
    })

    return (
        <View style={styles.container}>
            <Svg height={2} width="100%">
                <Line
                    y={0}
                    x1={0}
                    x2="100%"
                    stroke={RSCard ? "#9CA3AF" : "#4B5563"}
                    strokeWidth={2}
                    strokeDasharray="5, 5" />
            </Svg>
        </View>
    )

}

export default DashedLine;