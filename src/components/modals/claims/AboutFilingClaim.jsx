import React, { useContext } from 'react';
import { View, StyleSheet, useWindowDimensions, Text } from 'react-native';

import UserContext from '../../../context/context';
import BlankDetailsModal from '../general/BlankDetailsModal';
import SecurityIcon from '../../../../assets/buttons/security-icon.svg'

const AboutFilingClaimModal = ({ visible, setVisible }) => {
    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 20 * ratioX,
            width: "100%"
        },
        iconContainer: {
            width: 44 * ratioY,
            height: 44 * ratioY,
            backgroundColor: "#0A678E",
            borderRadius: 22 * ratioY,
            marginBottom: 16 * ratioY,
            marginTop: 32 * ratioY,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
        },
        icon: {
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 8 * ratioY,
        },
        cardTitle: {
            fontWeight: "700",
            alignSelf: "center",
            marginBottom: 20 * ratioY,
        },
        lineBar: {
            height: 1,
            width: "100%",
            backgroundColor: "#D3D9DE",
            marginVertical: 14
        },
        cardTitle: {
            color: "#2565BF",
            fontSize: 20,
            lineHeight: 20,
            fontWeight: "600",
            alignSelf: "center",
            marginTop: 24 * ratioX,
            marginBottom: 24 * ratioY,
        },
        smallGreyCard: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            padding: 8,
            backgroundColor: "#F3F4F6",
            borderRadius: 4,
            marginBottom: 16,
            width: "100%"
        },
        cardGreySectionLarge: {
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "center",
            padding: 8,
            backgroundColor: "#F3F4F6",
            borderRadius: 8,
            width: "100%",
            paddingTop: 20,
            paddingBottom: 24,
            paddingHorizontal: 24

        },
        greyLabel: {
            fontSize: 12,
            lineHeight: 12,
            color: "#4B5563"
        },
        greenLabel: {
            fontSize: 12,
            lineHeight: 12,
            color: "#047857"
        },
        infoArea: {
            flexDirection: "column",
            paddingTop: 16,
            paddingBottom: 16
        },
        infoText: {
            fontSize: 16,
            lineHeight: 24,
            color: "#000",
            marginBottom: 16
        },
        greyCardTitle: {
            fontSize: 14,
            lineHeight: 14,
            fontWeight: "600",
            alignSelf: "center",
            color: "#1F2937"
        },
        documentNames: {
            fontSize: 14,
            lineHeight: 14,
            fontWeight: "500",
            color: "#0D489A",
        }
    })

    return (
        <BlankDetailsModal isModalVisible={visible} setIsModalVisible={setVisible}>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <View style={styles.icon}>
                        <SecurityIcon />
                    </View>
                </View>

                <Text style={styles.cardTitle}> About Filing a Claim </Text>

                <View style={styles.smallGreyCard}>
                    <Text style={styles.greyLabel}> Time to complete: </Text>
                    <Text style={styles.greenLabel}> Approx. 15 mins</Text>
                </View>

                <View style={styles.infoArea}>
                    <Text style={styles.infoText}> Providing highly detailed information makes claim processing much easier.</Text>
                    <Text style={styles.infoText}> Ensure you have the contact info for all parties mentioned, as well as adequate photos of damages. </Text>
                    <Text style={styles.infoText}> Progress can be saved at anytime and resumed later.</Text>
                </View>

                <View style={styles.cardGreySectionLarge}>
                    <Text style={styles.greyCardTitle}> Supporting Documents to Provide </Text>
                    <View style={styles.lineBar}/>
                    <Text style={styles.documentNames}> Police Report Receipt </Text>
                    <Text style={[styles.documentNames, {marginTop:20}]}> Estimate of Repairs </Text>
                </View>

            </View>

        </BlankDetailsModal>
    );
}

export default AboutFilingClaimModal;