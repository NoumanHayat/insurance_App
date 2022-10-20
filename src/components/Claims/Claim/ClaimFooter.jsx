import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';

import Size1 from '../../buttons/Size1';
import UserContext from '../../../context/context';

const ClaimFooter = ({ onBackPress, nextButtonText, onNextButtonPress }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 10
        }
    })

    return (
        <View style={styles.container}>
            <Pressable onPress={onBackPress}>
                <Size1
                    text="Back"
                    width={100 * ratioX}
                    activeColor="#6B7280"
                />
            </Pressable>
            <Pressable onPress={onNextButtonPress}>
                <Size1
                    text={nextButtonText}
                    width={210 * ratioX}
                    btnHeight={48 * ratioY}
                    activeColor="#2565BF"
                />
            </Pressable>
        </View>
    )

}

export default ClaimFooter;