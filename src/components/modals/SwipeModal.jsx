import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';



const Modal = ({ text }) => {
    return(
        <View style={styles.container}>
            <View style={styles.modal}>
                <View style={styles.modalTitleContainer} >
                    <Text style={styles.modalTitle}>Pending Items</Text>
                </View>
                <View style={styles.modalDescriptionContainer}>
                    <Text style={styles.modalDescription}>Some items in your catalogue may need your attention</Text>
                </View>
                <View style={styles.messageOuterContainer}>
                    <View style={styles.messageInnerContainer}>
                        <Text styles={styles.textColor}>Error Message</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text styles={styles.textColor}>{text}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.messageInnerContainer}>
                        <Text styles={styles.textColor}>Error Message</Text>
                        {/* <TouchableOpacity style={styles.button}>
                            <Text styles={styles.textColor}>Update</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.messageInnerContainer}>
                        <Text styles={styles.textColor}>Error Message</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text styles={styles.textColor}>{text}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.largeButtonContainer}>
                    <ReusableButton text="Fix Errors" disabled={false} />
                    <ReusableButton text="Dismiss" height={35} disabled={true} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333333"
    },
    modal: {
        width: 296,
        height: 327,
        backgroundColor: "#ffffff",
    },
    modalTitleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 35,
        marginBottom: 5,
    },
    modalTitle: {
        color: "#000000",
        // fontFamily: "Roboto",
        fontSize: 16,
        fontWeight: "bold"
    },
    modalDescriptionContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 28,
        backgroundColor: "lightgrey",
    },
    modalDescription: {
        color: "#000000",
        // fontFamily: "Roboto",
        fontSize: 10,
    },
    button: {
        width: 47,
        height: 22,
        backgroundColor: "darkgrey",
    },
    textColor: {
        color: "#ffffff",
    },
    errorSection: {
        width: "248",
        height: "38",
        padding: "8"
    },
    messageInnerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        alignItems: "center",
        width: 248,
        height: 38,
        marginBottom: 5,
    },
    messageOuterContainer: {
        width: "100%",
        height: 38,
        marginTop: 15,
        flex: 1
    },
    largeButtonContainer: {
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        width: 248,
        marginBottom: 15,
    }
});

//TODO:
//change color on dismiss button
//get the hex values

export default Modal;
