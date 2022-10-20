import React, { useContext } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import ProgressBar from "../animations/ProgressBar";

import { getCalendarDate, getAbbreviatedTime } from "../../lib/utils/formatters/dates and times";
import UserContext from "../../context/context"

const InsurancePeriod = ({ params }) => {

    const { height } = useWindowDimensions();
	const { modelY } = useContext(UserContext);
	const ratioY = height / modelY;

    const { period, start, end } = params;

    const startDate = getCalendarDate(start);
    const startTime = getAbbreviatedTime(start);
    const endDate = getCalendarDate(end);
    const endTime = getAbbreviatedTime(end);

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: 16 * ratioY,
            backgroundColor: "#525B64",
            borderRadius: 6,
        },
        section: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
        },
        cardHeaderText: {
            fontSize: 16 * ratioY,
            fontWeight: "600",
            lineHeight: 16 * ratioY,
        },
        cardDetailsText: {
            fontSize: 10 * ratioY,
            fontWeight: "500",
            lineHeight: 10 * ratioY,
        },
        textColor: {
            color: "#FFFFFF"
        },
        margin8: {
            marginBottom: 8,
        },
        margin4: {
            marginBottom: 4,
        },
    });

    return (
        <View style={styles.container}>
            <View style={[styles.margin8, styles.section]}>
                <Text style={[styles.cardHeaderText, styles.textColor]}>Period of Insurance</Text>
                <Text style={[styles.cardHeaderText, styles.textColor]}>{period} Days</Text>
            </View>
            <View style={styles.margin8}>
                <View style={[styles.section, styles.margin4]}>
                    <Text style={[styles.cardDetailsText, styles.textColor]}>{startTime}</Text>
                    <Text style={[styles.cardDetailsText, styles.textColor]}>{endTime}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={[styles.cardDetailsText, styles.textColor]}>{startDate}</Text>
                    <Text style={[styles.cardDetailsText, styles.textColor]}>{endDate}</Text>
                </View>
            </View>
            <ProgressBar period={period} startDate={startDate} endDate={endDate}/>
        </View>
    );
}

export default InsurancePeriod;