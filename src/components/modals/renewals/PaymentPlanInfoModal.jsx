import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Modal,
    Pressable
} from "react-native";

import BenefitsIcon from "../../../../assets/icons/benefits.svg"
import UserContext from "../../../context/context";
import Card from "../../card/Card";
import Size1 from "../../buttons/Size1";

import moment from "moment";


const PaymentPlanInfoModal = ({ visible, setVisible, partNumber, dueNow, schedule, paymentTerms, scheduledAmount, scheduledDate }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            height: 600 * ratioY,
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
            marginLeft: 10 * ratioX,
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
            color: "#4B5563"
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
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.page}>
                <Card>
                    <View style={styles.container}>
                        <View style={styles.cardHeader}>
                            <View style={styles.iconContainer}>
                                <BenefitsIcon
                                    style={styles.icon}
                                    height={styles.iconCustomSize.height}
                                    width={styles.iconCustomSize.width}
                                />
                            </View>
                        </View>
                        <View style={styles.cardSection}>
                            <Text style={styles.cardTitle}>{partNumber}-Part Payment Plan</Text>
                        </View>
                        <View style={styles.cardSection}>
                            <View style={[styles.tableHeader, styles.rowDirection]}>
                                <Text style={styles.tableHeaderText}>Payment Dates</Text>
                                <Text style={styles.tableHeaderText}>Amount</Text>
                            </View>
                            <View style={styles.tableBody}>
                                <View style={styles.tableRow}>
                                    <View style={[styles.tableData, styles.rowDirection]}>
                                        <Text style={styles.tableDataText}>Due Now</Text>
                                        <Text style={styles.tableDataText1}>{`$${dueNow}`}</Text>
                                    </View>
                                    <View style={styles.lineBar}></View>
                                </View>
                                {paymentTerms && paymentTerms.map((paymentTerm, index) => (
                                    <View style={styles.tableRow} key={index}>
                                        <View style={[styles.tableData, styles.rowDirection]}>
                                            <Text style={styles.tableDataText}>{moment(paymentTerm.expiry_date).format("MMM DD, YYYY")}</Text>
                                            <Text style={styles.tableDataText1}>{`$${scheduledAmount}`}</Text>
                                        </View>
                                        <View style={styles.lineBar}></View>
                                    </View>
                                ))}
                            </View>
                        </View>

                    </View>
                </Card>
                <Pressable onPress={() => setVisible(false)} style={styles.dismiss}>
                    <Size1
                        text="Dismiss"
                        activeColor="#6B7280"
                        disabled={false}
                    />
                </Pressable>
            </View>
        </Modal>
    );
}

export default PaymentPlanInfoModal;
