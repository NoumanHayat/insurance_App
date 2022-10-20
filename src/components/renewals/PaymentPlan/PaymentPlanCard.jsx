import React, { useContext } from 'react';
import { View, StyleSheet, Text, useWindowDimensions, Pressable } from 'react-native';

import UserContext from '../../../context/context';
import { fontWeight } from '../../../styles/global';
import Currency from '../../misc/Currency';
import Icon from "../../../../assets/icons/Info-Icon-Grey.svg"

const ScheduleCard = ({ active, numParts, firstPayment, secondPayment, openModal }) => {

    const { height, width } = useWindowDimensions();
    const { modelY, modelX } = useContext(UserContext);
    const ratioY = height / modelY;
    // eslint-disable-next-line
    const ratioX = width / modelX;

    const styles = StyleSheet.create({
        container: {
            backgroundColor: active ? "#6B7280" : "#374151",
            borderRadius: 6 * ratioY,
            flexDirection: "row",
            flex: 1,
            width: "100%",
        },
        partsGroup: {
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            width: "25%",
            paddingVertical: 16 * ratioY,
            borderRightColor: active ? "#9CA3AF" : "#6B7280",
            borderRightWidth: 1,
            marginRight: 14 * ratioY,
        },
        numParts: {
            fontSize: 24 * ratioY,
            lineHeight: 24 * ratioY,
            fontWeight: fontWeight['font-weight-3'],
            color: "#fff",
        },
        partsText: {
            fontSize: 12 * ratioY,
            lineHeight: 12 * ratioY,
            fontWeight: fontWeight['font-weight-2'],
            color: "#fff"
        },
        details: {
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            height: "100%",
        },
        iconContainer: {
            height: "100%",
            width: "20%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 14 * ratioY
        },
        icon: {
            height: 18 * ratioY,
            width: 18 * ratioY
        },
        downpayment: {
            fontSize: 14 * ratioY,
            fontWeight: fontWeight['font-weight-3'],
            color: active ? "#fff" : "#FEC900"
        },
        downpaymentNowGroup: {
            flexDirection: "row",
            alignItems: "flex-end",
        },
        monthlyPayment: {
            fontSize: 12 * ratioY,
            fontWeight: fontWeight['font-weight-2'],
            lineHeight: 12 * ratioY,
            color: active ? "#D1D5DB" : "#9CA3AF"
        },
        nowText: {
            fontSize: 14 * ratioY,
            color: "#fff"
        },
        monthlyPaymentGroup: {
            flexDirection: "row",
        },
        numPartsContainer: {
            justifyContent: "center",
            alignItems: "center",
        },
        paymentGroup: {
            justifyContent: "space-between",
            paddingVertical: 16 * ratioY
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.partsGroup}>
                {numParts !== "full" ?
                    <View style={styles.numPartsContainer}>
                        <Text style={styles.numParts}>{numParts}</Text>
                        <Text style={styles.partsText}>Parts</Text>
                    </View> :
                    <View style={styles.numPartsContainer}>
                        <Text style={styles.numParts}>Full</Text>
                    </View>
                }
            </View>
            <View style={styles.details}>
                <View style={styles.paymentGroup}>
                    <View style={styles.downpaymentNowGroup}>
                        <Currency value={firstPayment} styles={styles.downpayment} />
                        <Text style={styles.nowText}> now</Text>
                    </View>
                    {numParts !== "full" &&
                        <View style={styles.monthlyPaymentGroup}>
                            <Currency value={secondPayment} styles={styles.monthlyPayment} />
                            {numParts !== "full" && <Text style={styles.monthlyPayment}> /mo.</Text>}
                        </View>
                    }
                </View>
                <Pressable style={styles.iconContainer} onPress={openModal}>
                    <Icon style={styles.icon} />
                </Pressable>
            </View>
        </View>
    )
}

export default ScheduleCard;