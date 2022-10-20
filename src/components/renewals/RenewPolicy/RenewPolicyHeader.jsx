import React, { useContext } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, Pressable } from 'react-native';

import Size0 from '../../../components/buttons/Size0';
import Stepper from '../../../components/renewals/Stepper';
import UserContext from '../../../context/context';
import { fontWeight } from '../../../styles/global';

const RenewPolicyHeader = ({ page, steps, heading, handleCancelPress, vehicleIdentity }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 24 * ratioX
        },
        topNav: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: 24 * ratioY
        },
        back: {
            marginRight: 12 * ratioX
        },
        vehicle: {
            color: "#fff"
        },
        heading: {
            fontWeight: fontWeight['font-weight-3'],
            color: "#fff",
            fontSize: 24 * ratioY,
            marginBottom: 12 * ratioY

        },
        subHeading: {
            fontSize: 18 * ratioY,
            color: "#fff",
            marginBottom: 22 * ratioY
        },
    })

    const headings = [
        "Add Benefits",
        "Select Payment Schedule",
        "Select Payment Method"
    ]

    return (
        <View style={styles.container}>
            <View style={styles.topNav}>
                <Pressable onPress={handleCancelPress} style={styles.back}>
                    <Size0 text="Cancel" />
                </Pressable>
                <Text style={styles.vehicle}>{vehicleIdentity}</Text>
            </View>
            <Text style={styles.heading}>{heading}</Text>
            {steps &&
                <>
                    <Text style={styles.subHeading}>{page + 1}. {headings[page]}</Text>
                    <Stepper numberOfSteps={3} currentStep={page} />
                </>
            }
        </View>
    );
}

export default RenewPolicyHeader;
