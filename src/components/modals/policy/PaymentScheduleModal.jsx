import React, { useContext } from 'react';
import { View, StyleSheet, useWindowDimensions, Text } from 'react-native';

import UserContext from '../../context/context';
import BlankDetailsModal from '../modals/general/BlankDetailsModal';
import PaymentScheduleIcon from "../../../assets/icons/payment-schedule-icon";
import Currency from './Currency';
import moment from 'moment';

import samplePaymentData from "../../../dont_upload/full-payment"

const PaymentScheduleModal = ({ isModalVisible, setIsModalVisible }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY, platform } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const { payment_plans } = samplePaymentData;
    const { payment_terms } = payment_plans[0];
    let sampleTerms = payment_terms

    const styles = StyleSheet.create({
        contents: {
            width: "100%",
            paddingHorizontal: 20 * ratioX,
            alignItems: "center"
        },
        icon: {
            marginVertical: 32 * ratioY
        },
        title: {
            fontSize: 20 * ratioY,
            fontWeight: "600",
            color: "#2565BF",
            marginBottom: 24 * ratioY
        },
        tableHeading: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#E5E7EB",
            padding: 8 * ratioY
        },
        tableHeadingText: {
            fontSize: 12 * ratioY,
            color: "#4B5563"
        },


    })

    const ScheduleEntry = ({ date, amount, step, totalSteps, status }) => {

        const statusBackgroundColors = {
            'Paid': "#D1FAE5",
            'Upcoming': "#F3F4F6",
            'Payment Due' : "#FFEDD5"
        }

        const styles = StyleSheet.create({
            container: {
                width: "100%",
                paddingHorizontal: 8 * ratioX,
                paddingTop: 16 * ratioY,
                paddingBottom: 12 * ratioY,
                borderBottomColor: "#E5E7EB",
                borderBottomWidth: 1
            },
            row: {
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12 * ratioY
            },
            date: {
                fontSize: 14 * ratioY,
                color: "#6B7280",
                fontWeight: platform == "ios" ? "600" : "700"
            },
            amount: {
                fontSize: 14 * ratioY,
                color: "#374151",
            },
            expiredText: {
                color: "#9CA3AF",
                fontWeight: "400",
                fontSize: 14 * ratioY
            },
            steps: {
                color: "#9CA3AF",
                fontSize: 12 * ratioY
            },
            Paid: {
                fontSize: 12 * ratioY,
                color: "#065F46",
                backgroundColor: "#D1FAE5",
            },
            "Payment Due": {
                fontSize: 12 * ratioY,
                color: "#9A3412",
                backgroundColor: "#FFEDD5",
            },
            Upcoming: {
                fontSize: 12 * ratioY,
                color: "#6B7280",
                backgroundColor: "#F3F4F6",
            },
            statusContainerBase: {
                padding: 3 * ratioY,
                borderRadius: 8,
                backgroundColor: statusBackgroundColors[status]
            },
        })

        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.date}>{moment(date).format('ll')}</Text>
                    <Currency styles={styles.amount} value={amount}/>
                </View>
                <View style={styles.row}>
                    <Text style={styles.steps}>Payment {step.toString()} of {totalSteps.toString()}</Text>
                    <View style={styles.statusContainerBase}>
                        <Text style={styles[status]}>{status}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
            <BlankDetailsModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            >
                <View style={styles.contents}>
                    <View style={styles.icon}>
                        <PaymentScheduleIcon height={44} width={44} />
                    </View>
                    <Text style={styles.title}>Payment Schedule</Text>
                    <View style={styles.tableHeading}>
                        <Text style={styles.tableHeadingText}>Payment Dates</Text>
                        <Text style={styles.tableHeadingText}>Amount Due</Text>
                    </View>
                    {sampleTerms?.map((term, index) => {
                        return (
                            <ScheduleEntry
                                key={index}
                                date={term.effective_date}
                                amount={term.payment_term_premium}
                                step={index + 1}
                                totalSteps={sampleTerms.length}
                                status={"Paid"}
                            />
                        )
                    })}
                </View>

            </BlankDetailsModal>
    )
}

export default PaymentScheduleModal;