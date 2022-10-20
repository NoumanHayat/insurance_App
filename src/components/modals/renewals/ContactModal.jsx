import React, { useContext } from 'react';
import { View, StyleSheet, Text, Pressable, useWindowDimensions } from 'react-native';
import * as Linking from 'expo-linking';

import Modal from "react-native-modal";

import UserContext from '../../../context/context';
import SwipeIcon from "../../../../assets/icons/swipe-icon.svg";
import TextButton2 from '../../buttons/TextButton2';

import { useNavigation } from "@react-navigation/native";
import { rdxResetSession } from "../../../../store/v2/slices/session";
import { useDispatch } from "react-redux";

const ContactModal = ({ contactModalVisible, setContactModalVisible, policyNumber, policyPrefix, contactAgic, setContactAgic }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY, statusBarHeight } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const navigation = useNavigation()
    const dispatch = useDispatch();

    const styles = StyleSheet.create({
        modalView: {
            margin: 0,
            paddingTop: 282 * ratioY + statusBarHeight
        },
        backCard: {
            flex: 1,
            backgroundColor: "#374151",
            borderTopEndRadius: 24,
            borderTopStartRadius: 24,
        },
        swipeIcon: {
            marginTop: 12 * ratioY,
            alignSelf: "center",
        },
        text: {
            color: "#fff",
            fontSize: 25,
            marginTop: 32 * ratioY,
            marginLeft: 24 * ratioX,
            marginBottom: 10 * ratioY,
        },
        descriptionContainer: {
            width: 342 * ratioX,
            alignSelf: "center",
        },
        description: {
            color: "#FFFFFF",
            fontSize: 14,
        },
        policy: {
            color: "#FEC900"
        },
        marginTop: {
            marginTop: 20,
        },
        buttonContainer: {
            width: 342 * ratioX,
            height: 252 * ratioY,
            alignSelf: "center",
            marginTop: 60 * ratioY,
            justifyContent: "space-between",
        },
        button: {
            alignSelf: "center",
        },
    })

    const closeModal = () => {
        setContactModalVisible(false)
        navigation.navigate("SignIn");
        dispatch(rdxResetSession())
    }

    const phoneNumber = 8766872442
    const email = `info@advantagegeneral.com?subject=Renewal Inquiry Regarding Policy ${policyPrefix}-${policyNumber}`
    const locations = 'https://advantagegeneral.com/contact'

    const callAgic = () => {
        console.log("call agic");
        Linking.openURL(`tel:${phoneNumber}`)
    }

    const emailAgic = () => {
        console.log("email agic");
        Linking.openURL(`mailto: ${email}`)
    }

    const findLocations = () => {
        console.log("find locations");
        Linking.openURL(`${locations}`)
    }

    return (
        <Modal
            isVisible={contactModalVisible}
            onBackdropPress={() => setContactModalVisible(false)}
            style={styles.modalView}
        >
            <View style={styles.backCard}>
                <View style={styles.swipeIcon}>
                    <SwipeIcon />
                </View>
                <Text style={styles.text}>Before Renewing...</Text>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>It seems you’ll need to contact AGIC before you can renew <Text style={styles.policy}>Policy {policyPrefix}-{policyNumber}.</Text></Text>
                    <Text style={[styles.description, styles.marginTop]}>Contact information can be found below.</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={callAgic}>
                        <TextButton2
                            text="Call AGIC"
                            textColor="#FFFFFF"
                            backgroundColor="#2565BF"
                            width={342 * ratioX}
                            height={48}
                            borderRadius={8}
                            fontSize={20}
                        />
                    </Pressable>
                    <Pressable style={styles.button} onPress={emailAgic}>
                        <TextButton2
                            text="Email AGIC"
                            textColor="#FFFFFF"
                            backgroundColor="#2565BF"
                            width={342 * ratioX}
                            height={48}
                            borderRadius={8}
                            fontSize={20}
                        />
                    </Pressable>
                    <Pressable style={styles.button} onPress={findLocations}>
                        <TextButton2
                            text="Find Locations"
                            textColor="#FFFFFF"
                            backgroundColor="#2565BF"
                            width={342 * ratioX}
                            height={48}
                            borderRadius={8}
                            fontSize={20}
                        />
                    </Pressable>
                    <Pressable onPress={closeModal} style={styles.button}>
                        <TextButton2
                            text="Dismiss"
                            textColor="#FFFFFF"
                            backgroundColor="#6B7280"
                            width={342 * ratioX}
                            height={48}
                            borderRadius={8}
                            fontSize={20}
                        />
                    </Pressable>
                </View>
            </View>

        </Modal>
    );
}

export default ContactModal;
