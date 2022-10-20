import React, { useContext, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
} from "react-native";

import BenefitsIcon from "../../../../assets/icons/benefits.svg"
import ScheduleIcon from "../../../../assets/icons/payment-schedule-icon.svg"
import UserContext from "../../../context/context";

import moment from "moment";

import BlankDetailsModal from "../general/BlankDetailsModal";
import Currency from "../../misc/Currency";

// eslint-disable-next-line
const PaymentPlanScheduleModal = ({ visible, setVisible, paymentTerms, scheduledAmount }) => {

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
        cardHeader: {
            marginTop: 20 * ratioY,
            marginBottom: 32 * ratioY,
        },
        iconContainer: {
            width: 44 * ratioY,
            height: 44 * ratioY,
            backgroundColor: "#186B48",
            borderRadius: 22 * ratioY,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
        },
        icon: {
            marginTop: 8 * ratioY,
            marginBottom: 10 * ratioX,
        },
        iconCustomSize: {
            height: 28 * ratioY,
            width: 28 * ratioY
        },
        cardTitle: {
            color: "#2565BF",
            fontSize: 20,
            fontWeight: "600",
            alignSelf: "center",
            marginBottom: 24 * ratioY,
        },
        tableHeader: {
            backgroundColor: "#E5E7EB",
            paddingHorizontal: 8 * ratioY,
            paddingVertical: 8 * ratioY,
            borderRadius: 4,
            justifyContent: "space-between",
            marginBottom: -8 * ratioY,
        },
        tableHeaderText: {
            fontSize: 12,
            fontWeight: "400",
            color: "#4B5563",
        },
        rowDirection: {
            flexDirection: "row",
        },
        tableBody: {
            paddingHorizontal: 8 * ratioY,
            paddingVertical: 8 * ratioY,
        },
        tableRow: {
            marginTop: 16 * ratioY,
        },
        tableData: {
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14 * ratioY,
        },
        lineBar: {
            height: 1,
            width: "100%",
            backgroundColor: "#D3D9DE",
        },
        tableDataText: {
            color: "#6B7280",
            fontSize: 14,
            fontWeight: "600",
        },
        tableDataTextPaid: {
            color: "#9CA3AF",
            fontSize: 14,
            fontWeight: "600",
        },
        tableDataTextPlanPayment: {
            color: "#6B7280",
            fontSize: 12,
            fontWeight: "400",
            marginTop: 4,
        },
        tableDataTextStatus: {
            color: "#6B7280",
            fontSize: 12,
            fontWeight: "400",
            backgroundColor: "#F3F4F6",
            borderRadius: 18,
            alignItems: "center",
            alignSelf: "center",
            padding: 2,
            marginTop: 4,
        },
        tableDataTextStatusPaid: {
            color: "#065F46",
            fontSize: 12,
            fontWeight: "400",
            backgroundColor: "#D1FAE5",
            borderRadius: 18,
            alignItems: "center",
            alignSelf: "center",
            padding: 2,
            marginTop: 4,
        },
        tableDataText1: {
            color: "#4B5563",
            fontSize: 14,
            fontWeight: "400",
        },
        page: {
            flex: 1,
            justifyContent: "flex-end",
            paddingBottom: 56 * ratioY
        },
        dismiss: {
            marginTop: 18 * ratioY
        }
    });

    return (
        <BlankDetailsModal isModalVisible={visible} setIsModalVisible={setVisible}>
            <View style={styles.container}>
                <View style={styles.cardHeader}>
                    <View style={styles.iconContainer}>
                        <ScheduleIcon
                            style={styles.icon}
                        // height={styles.iconCustomSize.height}
                        // width={styles.iconCustomSize.width}
                        />
                    </View>
                </View>
                <View style={styles.cardSection}>
                    <Text style={styles.cardTitle}>Payment Schedule</Text>
                </View>
                <ScrollView style={styles.cardSection}>
                    <View style={[styles.tableHeader, styles.rowDirection]}>
                        <Text style={styles.tableHeaderText}>Payment Dates</Text>
                        <Text style={styles.tableHeaderText}>Amount Paid</Text>
                    </View>
                    <View style={styles.tableBody}>
                        {/* <View style={styles.tableRow}>
                            <View style={[styles.tableData, styles.rowDirection]}>
                                <Text style={styles.tableDataText}>Due Now</Text>
                                <Text style={styles.tableDataText1}>{`$${dueNow}`}</Text>
                            </View>
                            <View style={styles.lineBar}></View>
                        </View> */}
                        {paymentTerms && paymentTerms.map((paymentTerm, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={[styles.tableData, styles.rowDirection]}>
                                    {paymentTerm.transaction_id === '' ?
                                        <View>
                                            <Text style={styles.tableDataText}>{moment(paymentTerm.expiry_date).format("MMM DD, YYYY")}</Text>
                                            <Text style={styles.tableDataTextPlanPayment}>{`Payment ${paymentTerm.payment_number} of ${paymentTerms.length}`}</Text>
                                        </View>
                                        :
                                        <View>
                                            <Text style={styles.tableDataTextPaid}>{moment(paymentTerm.expiry_date).format("MMM DD, YYYY")}</Text>
                                            <Text style={styles.tableDataTextPlanPayment}>{`Payment ${paymentTerm.payment_number} of ${paymentTerms.length}`}</Text>
                                        </View>
                                    }
                                    {paymentTerm.transaction_id === '' ?

                                        <View>
                                            <Text style={styles.tableDataText1}>
                                                <Currency value=
                                                    {`$${paymentTerm.payment_term_premium}`} /></Text>

                                            <Text style={styles.tableDataTextStatus}>Upcoming</Text>

                                        </View>
                                        :
                                        <View>
                                            <Text style={styles.tableDataTextPaid}>
                                                <Currency value=
                                                    {`$${paymentTerm.payment_term_premium}`} /></Text>


                                            <Text style={styles.tableDataTextStatusPaid}>Paid</Text>
                                        </View>
                                    }


                                </View>
                                <View style={styles.lineBar}></View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </BlankDetailsModal>
    );
}

export default PaymentPlanScheduleModal;
