import React, { useContext } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, Pressable, Image } from 'react-native';

import Size0 from '../../../components/buttons/Size0';
import Stepper from '../../../components/renewals/Stepper';
import UserContext from '../../../context/context';
import { fontWeight } from '../../../styles/global';

import HamburgerIcon from '../../../../assets/icons/hamburger-icon.svg'

const ClaimHeader = ({ page, steps, heading, handleCancelPress, vehicleIdentity }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 24 * ratioX,
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
            marginBottom: 35 * ratioY,

        },
        subHeading: {
            fontSize: 18 * ratioY,
            color: "#fff",
            marginBottom: 12 * ratioY
        },
        line1: {
            position: "absolute",
            width: "200%",
            marginTop: 108 * ratioY,

            borderWidth: .5,
            borderColor: "rgba(75, 85, 99, 1)",
        },
        line2: {
            position: "absolute",
            width: "200%",
            marginTop: 170 * ratioY,

            borderWidth: .5,
            borderColor: "rgba(75, 85, 99, 1)",
        },
        header:{
            paddingBottom: 20,
            width: 292 * ratioX,
        },
        navContainer: {
            flexDirection: 'row',
            justifyContent: "space-between",
        },
        hamburger: {
            backgroundColor: "#2565BF",
            marginBottom: 18 * ratioX,
            justifyContent: "center",
            padding: 10,
            borderRadius: 4,
        }
    })

    const headings = [
        "Accident Details",
        "Driver Details",
        "Passenger Details",
        "Witness Details",
        "Vehicle Damage",
        "Other Vehicles Involved",
        "Other-Party Passengers",
        "Other-Party Damages",
        "Pedestrians Involved",
        "Property Damage",
        "Supporting Documents"
    ]

    const onPressFunction = () => {
        console.log('pressed');
    }

    return (
        <View style={styles.container}>
            <View style={styles.topNav}>
                <Pressable onPress={handleCancelPress} style={styles.back}>
                    <Size0 text="Exit Claim" />
                </Pressable>
                <Text style={styles.vehicle}>{vehicleIdentity}</Text>
            </View>
            <Text style={styles.heading}>{heading}</Text>
            <View style={styles.line1}></View>

            <View style={styles.navContainer}>
                <Pressable onPress={onPressFunction} style={styles.hamburger}>
                    <HamburgerIcon />
                </Pressable>
                {   steps &&
                    <View style={styles.header}>
                        <Text style={styles.subHeading}>{page + 1}. {headings[page]}</Text>
                        <Stepper numberOfSteps={11} currentStep={page} />
                    </View>
                }
            </View>

            <View style={styles.line2}></View>
        </View>
    );
}

export default ClaimHeader;
