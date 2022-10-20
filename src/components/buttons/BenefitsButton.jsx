import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Shadow } from 'react-native-shadow-2';
import { getAccess } from "../../../store/v2/slices/session";
import { useSelector } from "react-redux";

import { fontWeight } from "../../styles/global";
import BenefitsIcon from "../misc/BenefitsIcon";
import { SERVER } from "@env"



const BenefitsButton = ({ text, textColor, backgroundColor, width, height, borderRadius, fontSize, source, iconBackgroundColor }) => {

    const platform = Platform.OS;
    const [benefits, setBenefits] = useState(undefined);

    const accessToken = useSelector(getAccess);

    const getBenefits = async () => {
        return await fetch(`${SERVER}/api/benefits`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            }
        })
            .then(res => res.json())
            .then(res => res.benefits)
            .catch(console.log);
    }

    useEffect(() => {
        (async () => {
            getBenefits()
                .then(setBenefits)
                .catch(console.log);
        })();
    }, [])

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
            marginLeft: 4, //maybe should be 8
        },
        modalView: {
            margin: 0,
            justifyContent: "flex-end",
            // flex: 1,
            // minWidth: "100%",
            // alignItems: "center",
            // backgroundColor: "rgba(0, 0, 0, 0.7)",

            // borderWidth: 1,
            // borderColor: "yellow",
        },
        backCard: {
            justifyContent: "flex-end",
            alignItems: "center",
            height: "90%",
            width: "100%",
            paddingTop: "3%",
            backgroundColor: "#374151",
            borderTopEndRadius: 24,
            borderTopStartRadius: 24,

            // borderWidth: 1,
            // borderColor: "red",
        },
        innerCard: {
            height: "90%",// formerly 559
            width: "90%",
            // marginBottom: 50,

            // borderWidth: 1,
            // borderColor: "red",
        },
        cardTitle: {
            color: "#FFFFFF",
            fontSize: 25,
        },
        cardTitleContainer: {
            width: "90%",
            alignSelf: "flex-start",
            marginLeft: "4.5%",
            marginTop: 32,
            marginBottom: 10,
        },
        swipeIconContainer: {
            alignItems: "center"
        },
        gestureRecog: {
            flex: 1,
            width: "100%",
            // zIndex: 2,
            // borderWidth: 1,
            // borderColor: "yellow"
        },
    });


    return (
        <View>
            <Shadow
                startColor="rgba(0,0,0,0.12)"
                radius={15}
                offset={[0, 5]}
            >
                <View
                style={[styles.buttonContainer, styles.center]}>
                    <View style={[styles.iconContainer, styles.center]}>
                        <View style={styles.icon}>
                            <BenefitsIcon source={source} />
                        </View>
                    </View>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </Shadow>




            {/* Put the GestureRecognizer around SwipeIcon */}
            {/* <GestureRecognizer
                style={{ flex: 1, borderWidth: 1, borderColor: "red" }}
                onSwipeDown={() => {
                    setModalVisible(!modalVisible)
                }}
            > */}
            {/* <Modal
                style={styles.modalView}
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(!modalVisible)}
                onBackButtonPress={() => setModalVisible(!modalVisible)}
                animationInTiming={800}
                animationOutTiming={800}
                backdropTransitionInTiming={2000}
                backdropTransitionOutTiming={500}
                useNativeDriver={true}
            >
                <View style={styles.backCard}>
                        <View style={styles.swipeIconContainer}>
                            <SwipeIcon />
                        </View>
                        <View style={styles.cardTitleContainer}>
                            <Text style={styles.cardTitle}>Benefits</Text>
                        </View>
                    <View style={styles.innerCard}>
                        <BenefitsInfo benefits={benefits} />
                    </View>
                </View>
            </Modal> */}
        </View >

        // <Shadow
        //     startColor="rgba(0,0,0,0.12)"
        //     radius={15}
        //     offset={[0, 5]}
        // >
        //     <Pressable style={[styles.buttonContainer, styles.center]}>
        //         <View style={[styles.iconContainer, styles.center]}>
        //             <View style={styles.icon}>
        //                 <CoverageIcon source={source} />
        //             </View>
        //         </View>
        //         <Text style={styles.text}>{text}</Text>
        //     </Pressable>
        // </Shadow>
    );
}

export default BenefitsButton;
