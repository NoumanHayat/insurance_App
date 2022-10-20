import React, { useContext } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Svg, LinearGradient, Defs, Stop, Rect } from 'react-native-svg';

import UserContext from '../../context/context';

const Fade = ({ pageColor, height }) => {

    const { height: screenHeight } = useWindowDimensions();
    const { modelY } = useContext(UserContext);
    const ratioY = screenHeight / modelY;

    const styles = StyleSheet.create({
        gradient: {
            height: height * ratioY,
            width: "100%",
        },
    });

    return (
        <View style={styles.gradient}>
            <Svg height="100%" width="100%">
                <Defs>
                    <LinearGradient id="grad" x1={0} x2={0} y1={0} y2={1}>
                        <Stop offset="0.2" stopColor={pageColor} stopOpacity="0.2" />
                        <Stop offset="1" stopColor={pageColor} stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                <Rect
                    x={0}
                    y={0}
                    height="100%"
                    width="100%"
                    fill="url(#grad)"
                    strokeWidth={0}
                />
            </Svg>
        </View>
    )
}

export default Fade;