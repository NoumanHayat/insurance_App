import React, { useContext } from 'react';
import { View, StyleSheet, Text, Pressable, useWindowDimensions } from 'react-native';

import UserContext from '../../../context/context';
import Card from '../../card/Card';

import ErrorIcon from '../../../../assets/icons/error-icon.svg';

import Modal from "react-native-modal";

import {
    colour,
    fontSize,
    lineHeight,
    fontWeight,
    borderRadius,
} from "../../../styles/global";
import TextButton2 from '../../buttons/TextButton2';

const PaymentFailed = ({ isVisible, onBackdropPress, onPress }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY, platform } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        modalView: {
            justifyContent: "flex-end",

            // borderWidth: 1,
            // borderColor: "red",
        },
        card: {
            alignItems: "center",
            paddingHorizontal: 35 * ratioX,
            paddingVertical: 24 * ratioY,
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
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            style={styles.modalView}
        >
            <Card>
                <View style={styles.card}>
                    <ErrorIcon />
                    <Text style={styles.cardHeader}>Payment Failed</Text>
                    <Text>Please check the details provided or</Text>
                    <Text>try a different method.</Text>
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
            <Pressable onPress={onPress}>
                <TextButton2
                    text="Try Again"
                    width="100%"
                    height={48 * ratioY}
                    backgroundColor="#6B7280"
                    textColor="#FFFFFF"
                    borderRadius={6}
                    fontSize={20}
                    marginTop={16 * ratioY}
                />
            </Pressable>
        </Modal>
    )
}

export default PaymentFailed;