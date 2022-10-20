import React, { useContext, useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

import UserContext from '../../context/context';
import { fontWeight } from '../../styles/global';
import ScheduleCard from './PaymentPlan/PaymentPlanCard';
import PaymentPlanInfoModal from '../modals/renewals/PaymentPlanInfoModalV2';
import RadioButton from '../buttons/RadioButtonV2';

const PaymentPlanOption = ({ active, numParts, downpayment, secondPayment, partNumber, paymentTerms, scheduledAmount, scheduledDate }) => {

    const { height, width } = useWindowDimensions();
    const { modelY, modelX } = useContext(UserContext);
    const ratioY = height / modelY;
    const ratioX = width / modelX;

    const [modal, setModal] = useState(false)

    const styles = StyleSheet.create({
        container: {
            height: 68 * ratioY,
            paddingHorizontal: 16 * ratioX,
            paddingVertical: 16 * ratioY,
            backgroundColor: active ? "#6B7280" : "#374151",
            borderRadius: 6 * ratioY,
            flexDirection: "row",
            width: 298 * ratioX,
        },
        partsGroup: {
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 14 * ratioY,
            paddingVertical: 1,
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
            justifyContent: numParts == "full" ? "center" : "space-between",
            height: "100%",
            flex: 1,
        },
        detailsFirstRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        icon: {
            height: 16 * ratioY,
            width: 16 * ratioY
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
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        radioButton: {
            alignSelf: "center",
            marginRight: 7 * ratioX,
        },
        partItem: {
            flexDirection: "row",
            marginVertical: 10,
        },
    })

    return (
        <View style={styles.partItem}>
            <View style={styles.radioButton}>
                <RadioButton
                    pageColour="#1F2937"
                    selected={active}
                />
            </View>
            <ScheduleCard
                active={active}
                numParts={numParts}
                firstPayment={downpayment}
                secondPayment={secondPayment}
                openModal={() => setModal(true)}
            />
            <PaymentPlanInfoModal
                paymentTerms={paymentTerms}
                visible={modal}
                setVisible={setModal}
                partNumber={partNumber}
                dueNow={downpayment}
                scheduledAmount={scheduledAmount}
                scheduledDate={scheduledDate}
            />
        </View>
    )
}

export default PaymentPlanOption;