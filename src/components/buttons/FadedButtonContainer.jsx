import React, { useContext } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

import UserContext from '../../context/context';
import Fade from '../gradients/Fade';

const FadedButtonContainer = ({ children, pageColor }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    // eslint-disable-next-line
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            width: "100%",
        },
        gradient: {
            width: "100%",
            position: "absolute",
            top: -40 * ratioY,
            zIndex: 2,
        },
        solid: {
            height: 10 * ratioY,
            backgroundColor: pageColor,
        },
        children: {
            paddingBottom: 32 * ratioY,
            backgroundColor: pageColor,
            justifyContent: "flex-start",
            alignItems: "center"
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.gradient}>
                <Fade pageColor={pageColor} height={40}/>
            </View>
            <View style={styles.solid} />
            <View style={styles.children}>
                {children}
            </View>
        </View>
    )
}

export default FadedButtonContainer;