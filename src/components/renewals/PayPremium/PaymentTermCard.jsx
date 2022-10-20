import React, { useContext } from 'react';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import moment from 'moment';

import UserContext from '../../../context/context';
import Currency from '../../misc/Currency';


const PaymentTermCard = ({ active, step, totalSteps, payment, dueDate }) => {

    const { height, width } = useWindowDimensions();
    const { modelY, modelX } = useContext(UserContext);
    const ratioY = height / modelY;
    const ratioX = width / modelX;

    const getFormattedDate = (dateString) => {
        return moment(dateString).format("ll")
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: active ? "#6B7280" : "#374151",
            borderRadius: 6 * ratioY,
            flexDirection: "row",
            flex: 1,
            width: "100%",
            marginBottom: 12 * ratioY,
            paddingVertical: 14 * ratioY ,
            alignItems: 'center'
        },
        stepsGroup: {
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            width: "20%",
            borderRightColor: active ? "#9CA3AF" : "#6B7280",
            borderRightWidth: 1,
            marginRight: 14 * ratioY,
        },
        step: {
            fontSize: 20 * ratioY,
            lineHeight: 20 * ratioY,
            fontWeight: "600",
            color: "#fff",
            marginBottom: 4 * ratioY
        },
        details: {
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            height: "100%",
            alignItems: "center",
            paddingRight: 14 * ratioX,
        },
        payment: {
            fontSize: 14 * ratioY,
            fontWeight: "600",
            lineHeight: 14 * ratioY,
            color: active ? "#FFF" : "#FEC900"
        },
        numStepsContainer: {
            justifyContent: "center",
            alignItems: "center",
        },
        dueDate: {
            fontWeight: "500",
            fontSize: 14 * ratioY,
            lineHeight: 14 * ratioY,
            color: active ? "#D1D5DB" : "#9CA3AF"
        },
        stepsSub: {
            fontWeight: "500",
            fontSize: 10 * ratioY,
            lineHeight: 10 * ratioY,
            color: "#fff"
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.stepsGroup}>
                <View style={styles.numStepsContainer}>
                    <Text style={styles.step}>{step.toString()}</Text>
                    <Text style={styles.stepsSub}>OF {totalSteps.toString()}</Text>
                </View>
            </View>
            <View style={styles.details}>
                <Text style={styles.dueDate}>{getFormattedDate(dueDate)}</Text>
                <Currency value={payment} styles={styles.payment} />
            </View>
        </View>
    )
}

export default PaymentTermCard;