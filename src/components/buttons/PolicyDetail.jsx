import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, useWindowDimensions, Image } from "react-native";
import { Shadow } from 'react-native-shadow-2';
import { fontWeight } from "../../styles/global";

import UserContext from "../../context/context";

const PolicyDetailButton = ({ text,  backgroundColor, source, iconBackgroundColor, children }) => {

    const { height, width, scale, fontScale } = useWindowDimensions();
	const { modelX, modelY, platform } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

    const styles = StyleSheet.create({
        text: {
            color: "#fff",
            fontSize: 10 * ratioY,
            lineHeight: 12 * ratioY,
            // fontFamily: "Roboto",
            fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
        },
        buttonContainer: {
            width: 104 * ratioX,
            height: 78 * ratioY,
            paddingTop: 10 * ratioY,
            paddingBottom: 8 * ratioY,
            borderRadius: 4,
            backgroundColor,
            justifyContent: "center",
            alignItems: "center",
        },
        iconContainer: {
            width: 44 * ratioY,
            height: 44 * ratioY,
            backgroundColor: iconBackgroundColor,
            borderRadius: 22 * ratioY,
            marginBottom: 4 * ratioY,
            justifyContent: "center",
            alignItems: "center",
        },
        icon: {
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 6 * ratioY,
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
                <View style={styles.buttonContainer}>
                    <View style={styles.iconContainer}>
                        <View style={styles.icon}>
                            {children}
                        </View>
                    </View>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </Shadow>
        </View >
    );
}

export default PolicyDetailButton;
