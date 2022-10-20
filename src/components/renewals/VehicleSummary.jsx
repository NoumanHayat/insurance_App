import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
} from "react-native";

import NewsIcon from "../../../assets/icons/news-icon.svg";

import Card from "../../components/card/Card";
import UserContext from "../../context/context";


const VehicleSummary = ({ policy }) => {

    const { height, width, scale, fontScale } = useWindowDimensions();
    const { modelX, modelY, platform } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const { policy_prefix, policy_number, other_risk_details, risks } = policy;
    const coverNoteId = other_risk_details[0]?.cover_notes[0]?.covet_note_id;

    const styles = StyleSheet.create({
        vehicleTypeLabel: {
            marginBottom: 4 * ratioY,
        },
        vehicleType: {
            color: "#2565BF",
            fontSize: 10,
            letterSpacing: 1,
            fontWeight: "500",
        },
        vehicleDetails: {
            color: "#1F2937",
            fontSize: 14,
            fontWeight: "600",
            lineHeight: 14,
        },
        flexDirection: {
            flexDirection: "row",
        },
        iconContainer: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F3F4F6",
            borderRadius: 6,
            minWidth: 32 * ratioY,
            height: 32 * ratioY,
            marginRight: 8 * ratioX,
        },
        vehicleDataContainer: {
            flexDirection: "row",
            marginTop: 12 * ratioY,
        },
        infoTitle: {
            color: "#4B5563",
            fontSize: 10 * ratioY,
            fontWeight: "400",
            lineHeight: 10 * ratioY,
            marginTop: 3 * ratioY,
        },
        info: {
            color: "#1F2937",
            fontSize: 12 * ratioY,
            fontWeight: "400",
            lineHeight: 16 * ratioY,
        },
        policyNumberContainer: {
            marginLeft: 10 * ratioX,
        },
    });

    return (
        <Card>
            <View style={styles.vehicleTypeLabel}>
                <Text style={styles.vehicleType}>YEAR MAKE MODEL</Text>
            </View>
            <View style={styles.vehicleTypeDetails}>
                <Text style={styles.vehicleDetails}>{`${risks[0].year} ${risks[0].make} ${risks[0].model}`}</Text>
            </View>
            <View style={styles.vehicleDataContainer}>
                <View style={styles.flexDirection}>
                    <View style={styles.iconContainer}>
                        <NewsIcon />
                    </View>
                </View>
                <View style={styles.flexDirection}>
                    <View style={styles.coverNoteContainer}>
                        <Text style={styles.infoTitle}>Cover Note</Text>
                        <Text style={styles.info}>{coverNoteId}</Text>
                    </View>
                    <View style={styles.policyNumberContainer}>
                        <Text style={styles.infoTitle}>Policy Number</Text>
                        <Text style={styles.info}>{`${policy_prefix}-${policy_number}`}</Text>
                    </View>
                </View>
            </View>
        </Card>
    );
}

export default VehicleSummary;
