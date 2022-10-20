import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import UserContext from "../../context/context";
import Fade from '../gradients/Fade';

const ScrollViewWithFade = ({ pageColor, children, fadeHeight }) => {

    const { height } = useWindowDimensions();
    const { modelY } = useContext(UserContext);
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
        },
        gradient: {
            height: fadeHeight * ratioY ?? 15 * ratioY,
            width: "100%",
            position: "absolute",
            bottom: 0,
        },
    })

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalIndicator={false}>
                {children}
            </ScrollView>
            <View style={styles.gradient}>
                <Fade pageColor={pageColor} height={fadeHeight ?? 15} />
            </View>
        </View>
    )
}

export default ScrollViewWithFade;