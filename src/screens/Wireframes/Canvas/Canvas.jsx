import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable, Button } from 'react-native';

import UserContext from '../../../context/context';

import Modal from "react-native-modal";
import PaymentFailed from '../../../components/modal/PaymentFailed';
import PaymentMethodSaved from '../../../components/modal/PaymentMethodSaved';

const Canvas = () => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const [paymentFailedModalVisible, setPaymentFailedModalVisible] = useState(false);
    const [paymentSavedModalVisible, setPaymentSavedModalVisible] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            // marginTop: 24 * ratioX,
        },
        btn: {
            borderWidth: 1,
            borderColor: "blue",
        }
    });

    const handlePaymentFailedClick = () => {
        setPaymentFailedModalVisible(!paymentFailedModalVisible);
    }

    const handlePaymentSavedClick = () => {
        setPaymentSavedModalVisible(!paymentSavedModalVisible);
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.btn} onPress={handlePaymentFailedClick}>
                <Text>Open Payment Failed Modal</Text>
            </Pressable>
            <Pressable style={styles.btn} onPress={handlePaymentSavedClick}>
                <Text>Open Payment Method Saved Modal</Text>
            </Pressable>
            <PaymentFailed
                isVisible={paymentFailedModalVisible}
                onPress={handlePaymentFailedClick}
            />
            <PaymentMethodSaved
                isVisible={paymentSavedModalVisible}
                onPress={handlePaymentSavedClick}
            />
        </View>
    );
}

export default Canvas;
