import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';

import Size1 from '../../buttons/Size1';
import UserContext from '../../../context/context';

const RenewalPolicyFooter = ({ onBackPress, nextButtonText, onNextButtonPress, isNextButtonEnabled }) => {

    const { width } = useWindowDimensions();
    const { modelX } = useContext(UserContext);
    const ratioX = width / modelX;

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%"
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
            <Pressable disabled={!isNextButtonEnabled} onPress={onNextButtonPress}>
                <Size1
                    text={nextButtonText}
                    width={190 * ratioX}
                    disabled={!isNextButtonEnabled}
                    activeColor="#2565BF"
                />
            </Pressable>
        </View>
    )

}

export default RenewalPolicyFooter;