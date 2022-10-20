import React, { useContext } from 'react';
import { View, StyleSheet, Text, Pressable, useWindowDimensions } from 'react-native';

import UserContext from '../../../context/context';
import Card from '../../card/Card';

import CheckIcon from '../../../../assets/icons/check-icon.svg';

import Modal from "react-native-modal";
import Size1 from '../../buttons/Size1';

import {
    fontWeight,
} from "../../../styles/global";
import TextButton2 from '../../buttons/TextButton2';

const PaymentMethodSavedModal = ({ visible, setVisible, onContinuePress }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY, platform } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        modalView: {
            flex: 1,
            justifyContent: "flex-end",
            paddingBottom: 56 * ratioY
        },
        card: {
            alignItems: "center",
            paddingHorizontal: 35 * ratioX,
            paddingVertical: 24 * ratioY,
            borderWidth: 1,
            borderColor: "red"
        },
        cardHeader: {
            fontSize: 16,
            fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
            color: "#111827",
            marginVertical: 12,
        },
    });

    return (
        <Modal
            visible={visible}
            onBackdropPress={() => setVisible(false)}
            style={styles.modalView}
        >
            <Card>
                <View style={styles.card}>
                    <CheckIcon />
                    <Text style={styles.cardHeader}>Payment Method Saved!</Text>
                </View>
            </Card>

            {/* SHOULD BE INCLUDED IN A FUTURE RELEASE */}

            {/* <TextButton2
                text="Choose Payment Method"
                width={342}
                height={48}
                backgroundColor="#2565BF"
                textColor="#FFFFFF"
                borderRadius={6}
                fontSize={20}
                marginBottom={16}
            /> */}

            <Pressable onPress={onContinuePress}>
                <Size1 
                text="Continue"
                activeColor="#2565BF"
                disabled={false}
                />

            </Pressable>
        </Modal>
    )
}

export default PaymentMethodSavedModal;