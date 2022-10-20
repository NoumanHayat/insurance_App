import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Pressable,
} from "react-native";

import UserContext from "../../context/context";

const PrelimQuestsCard = ({ text, marginBottom, marginTop, quesSelected, setQuesSelected, selectedOption, setSelectedOption, claimFlow }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const [yesBorderColor, setYesBorderColor] = useState(false);
    const [noBorderColor, setNoBorderColor] = useState(false);
    const [horizontalLineVisible, setHorizontalLineVisible] = useState(true)

    const styles = StyleSheet.create({
        container: {
            width: 342 * ratioX,
            backgroundColor: "#4B5563",
            borderRadius: 8,
            marginBottom: marginBottom,
            marginTop: marginTop,
            padding: 12,
            alignSelf: "center",
        },
        text: {
            color: "#FFFFFF",
            fontSize: 12,
            width: 318 * ratioX,
            alignSelf: "center",
        },
        toggle: {
            flexDirection: "row",
            marginTop: 20 * ratioY,
            justifyContent: "space-between",
            backgroundColor: "#1F2937",
            borderRadius: 14,
            padding: 4,
        },
        yes: {
            fontSize: 12,
            color: "#FFFFFF",
            width: 145 * ratioX,
            backgroundColor: yesBorderColor ? "#6B7280" : "#1F2937",
            borderRadius: 10,
            paddingHorizontal: 8,
            paddingVertical: 2,
            textAlign: "center",
            overflow: "hidden",
        },
        no: {
            fontSize: 12,
            color: "#FFFFFF",
            width: 145 * ratioX,
            backgroundColor: noBorderColor ? "#6B7280" : "#1F2937",
            borderRadius: 10,
            paddingHorizontal: 8,
            paddingVertical: 2,
            textAlign: "center",
            overflow: "hidden",
        },
        line: {
            width: 2 * ratioX,
            height: "100%",
            borderRadius: 4,
            backgroundColor: "#6B7280",
        },
    });

    useEffect(() => {
        setQuesSelected(false)
    }, [])

    const yesButtonPressed = () => {
        setYesBorderColor(true)
        setNoBorderColor(false)
        setHorizontalLineVisible(false)
        setQuesSelected(true)
        setSelectedOption(!selectedOption)
    }

    const noButtonPressed = () => {
        setNoBorderColor(true)
        setYesBorderColor(false)
        setHorizontalLineVisible(false)
        claimFlow ? setQuesSelected(false) : setQuesSelected(true)
        setSelectedOption(!selectedOption)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.toggle}>
                <Pressable onPress={yesButtonPressed}>
                    <Text style={styles.yes}>YES</Text>
                </Pressable>
                {horizontalLineVisible && <View style={styles.line}></View>}
                <Pressable onPress={noButtonPressed}>
                    <Text style={styles.no}>NO</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default PrelimQuestsCard;
