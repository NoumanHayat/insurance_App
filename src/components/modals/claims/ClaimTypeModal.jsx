import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, useWindowDimensions } from 'react-native';

import Modal from "react-native-modal";

import UserContext from '../../../context/context';
import SwipeIcon from "../../../../assets/icons/swipe-icon.svg";
import ScrollViewWithFade from '../../scrollviews/ScrollViewWithFade';
import Dismiss from '../../buttons/Dismiss';
import ClaimTypeButton from '../../buttons/Claims/ClaimTypeButton';
import CollisionIcon from '../../../../assets/buttons/collision-btn.svg';
import WindshieldIcon from '../../../../assets/buttons/windshield-icon.svg';
import TheftIcon from '../../../../assets/buttons/theft-icon.svg';
import FireIcon from '../../../../assets/buttons/fire-icon.svg';

const ClaimTypeModal = ({ claimTypeModalVisible, setClaimTypeModalVisible, onClaimTypePress }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY, statusBarHeight, platform } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        modalView: {
            margin: 0,
            paddingTop: 77 * ratioY + statusBarHeight
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
        title: {
            color: "#fff",
            fontSize: 25,
            marginTop: 32 * ratioY,
            paddingLeft: 24 * ratioX,
            paddingBottom: 10 * ratioY,
            borderBottomWidth: 1,
            borderBottomColor: "#6B7280"
        },
        spacer: {
            margin: 10,

            borderWidth: 1,
            borderColor: "red"
        },
        button: {
            alignSelf: "center",
            marginTop: 16 * ratioY,
            marginBottom: 32 * ratioX,
        },
        line: {
            borderWidth: 0.5,
            borderColor: "#6B7280"
        },
        cancelBtn: {
            width: 342 * ratioX,
            alignSelf: "center",
            marginTop: 16 * ratioY,
            marginBottom: 32 * ratioX,
        },
        content: {
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
        }
    })

    // useEffect(() => {
    //     return () => {
    //         setClaimTypeModalVisible({}); // This worked for me
    //     };
    // }, []);

    return (
        <Modal
            isVisible={claimTypeModalVisible}
            onBackdropPress={() => setClaimTypeModalVisible(false)}
            style={styles.modalView}
        >
            <View style={styles.backCard}>
                <View style={styles.swipeIcon}>
                    <SwipeIcon />
                </View>
                <Text style={styles.title}>Select Claim Type</Text>
                <ScrollViewWithFade fadeHeight={15 * ratioY} pageColor="#374151">
                    <View style={styles.content}>
                        <ClaimTypeButton
                            icon={<CollisionIcon />}
                            onClaimTypePress={onClaimTypePress}
                            text="Collision"
                        />
                        <ClaimTypeButton
                            icon={<WindshieldIcon />}
                            text="Windshield"
                        />
                        <ClaimTypeButton
                            icon={<FireIcon />}
                            text="Fire"
                        />
                        <ClaimTypeButton
                            icon={<TheftIcon />}
                            text="Theft"
                        />
                    </View>
                </ScrollViewWithFade>
                <Pressable style={styles.cancelBtn}>
                    <Dismiss
                        onPress={() => setClaimTypeModalVisible(false)}
                        text="Cancel"
                    />
                </Pressable>
            </View>

        </Modal>
    )
}

export default ClaimTypeModal;