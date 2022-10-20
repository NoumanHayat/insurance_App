import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from "react-native";
import CoverageIcon from "../misc/CoverageIcon";
import { Shadow } from 'react-native-shadow-2';
import GestureRecognizer from 'react-native-swipe-gestures';
import SwipeIcon from "../../../assets/icons/swipe-icon.svg"
import Modal from "react-native-modal";
import { fontWeight } from "../../styles/global";

const CoverageButton = ({ text, textColor, backgroundColor, width, height, borderRadius, fontSize, source, iconBackgroundColor, openModal, limits }) => {

    const platform = Platform.OS;

    const styles = StyleSheet.create({
        text: {
            color: textColor,
            fontSize: fontSize,
            // fontFamily: "Roboto",
            fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
        },
        buttonContainer: {
            width: width,
            height: height,
            borderRadius: borderRadius,
            backgroundColor: backgroundColor,
        },
        center: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        iconContainer: {
            width: 44,
            height: 44,
            backgroundColor: iconBackgroundColor,
            borderRadius: 36,
            marginBottom: 3,
        },
        icon: {
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 6,
        },
        modalView: {
            margin: 0,
            justifyContent: "flex-end",
        },
        backCard: {
            alignItems: "center",
            height: "90%",
            width: "100%",
            paddingTop: "3%",
            backgroundColor: "#374151",
            borderTopEndRadius: 24,
            borderTopStartRadius: 24,
        },
        contentContainerStyle: {
            backgroundColor: "red",
        },
        innerCard: {
            height: "90%",
        },
        cardTitle: {
            color: "#FFFFFF",
            fontSize: 25,
        },
        cardTitleContainer: {
            width: "100%",
            alignSelf: "flex-start",
            // marginLeft: "4.5%",
            marginTop: 32,
            marginBottom: 10,
        },
        swipeIconContainer: {
            alignItems: "center"
        },
        gestureRecog: {
            flex: 1,
            width: "100%",
            backgroundColor: "yellow"
            // zIndex: 2,
            // borderWidth: 1,
            // borderColor: "yellow"
        },
    });

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    return (
        <View>
            <Shadow
                startColor="rgba(0,0,0,0.12)"
                radius={15}
                offset={[0, 5]}
            >
                <View style={[styles.buttonContainer, styles.center]}>
                    <View style={[styles.iconContainer, styles.center]}>
                        <View style={styles.icon}>
                            <CoverageIcon source={source} />
                        </View>
                    </View>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </Shadow>
        </View >
    );
}

export default CoverageButton;
