import React, { useContext } from "react";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";
import debounceRender from "react-debounce-render"

import SlotMachine from "./SlotMachine";
import { fontWeight } from "../../../styles/global";
import UserContext from "../../../context/context";

const DynamicTotal = ({ value }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            justifyContent: "flex-end",
            marginTop: 42 * ratioY,
        },
        primaryCard: {
            paddingLeft: 16 * ratioX,
            backgroundColor: "#fff",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 8 * ratioY,
        },
        title: {
            fontSize: 16 * ratioY,
            lineHeight: 16 * ratioY,
            color: "#2565BF",
            fontWeight: fontWeight["font-weight-3"]
        },
        total: {
            fontSize: 19.76 * ratioY,
            lineHeight: 19.76 * ratioY,
            fontWeight: fontWeight["font-weight-3"],
            color: "#111827"
        },
        cardContainer: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
        },
        secondaryCard: {
            position: "absolute",
            paddingTop: 16 * ratioY,
            paddingHorizontal: 16 * ratioY,
            borderTopLeftRadius: 6 * ratioY,
            borderTopRightRadius: 6 * ratioY,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#374151",
            width: "100%",
            height: "100%"
        },
        cardShadowIOS: {
            shadowColor: "#000",
            shadowOffset: {
                width: 1,
                height: 4,
            },
            shadowRadius: 8,
            shadowOpacity: 0.8,
        },
        benefit: {
            fontWeight: fontWeight["font-weight-3"],
            fontSize: 14 * ratioY,
            lineHeight: 14 * ratioY,
            color: "#fff"
        },
        addition: {
            fontWeight: fontWeight["font-weight-3"],
            fontSize: 14 * ratioY,
            lineHeight: 14 * ratioY,
            color: "#FFD53D"
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.primaryCard}>
                <Text style={styles.title}>Coverage Total</Text>
                <SlotMachine value={value} />
            </View>
        </View>
    )
}

export default debounceRender(DynamicTotal, 1500);