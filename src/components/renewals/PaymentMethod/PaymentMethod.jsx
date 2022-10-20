import React, { useContext } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

import UserContext from '../../../context/context';

import VisaCard from "../../../../assets/icons/visa-card.svg";
import MasterCard from "../../../../assets/icons/mastercard.svg";

const PaymentMethod = ({ selected, cardType }) => {

    const { height, width } = useWindowDimensions();
    const { modelY, modelX } = useContext(UserContext);
    const ratioY = height / modelY;
    const ratioX = width / modelX;

    const styles = StyleSheet.create({
        container: {
            backgroundColor: selected ? "#6B7280" : "#374151",
            width: 298 * ratioX,
            height: 88 * ratioY,
            borderRadius: 6,
            paddingVertical: 16,
            paddingHorizontal: 16,
        },
        innerContainer: {
            flexDirection: "row",
            height: "100%",
        },
        cardType: {
            marginRight: 15,
        },
        cardDetails: {
            justifyContent: "space-between",
        },
        cardNumber: {
            color: "#FFFFFF"
        },
        cardHolder: {
            color: "#FFFFFF"
        },
        expiryText: {
            color: "#9CA3AF",
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.cardType}>
                    {cardType === 'visa' ? <VisaCard /> : <MasterCard />}
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.cardNumber}>Visa ****8888</Text>
                    <Text style={styles.cardHolder}>Johnathan Doe</Text>
                    <Text style={styles.expiryText}>Exp 11/ 23</Text>
                </View>
            </View>
        </View>
    )
}

export default PaymentMethod;
