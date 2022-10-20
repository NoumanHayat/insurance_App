import React, { useContext } from 'react';
import { View, StyleSheet, Modal, Pressable, Text, useWindowDimensions } from 'react-native';

import UserContext from '../../../context/context';
import getHTTPFailureResponseText from '../../../copy/HTTP Req Failure Responses';

const GeneralErrorModal = ({ status, isVisible, setIsVisible }) => {

    const { height, width } = useWindowDimensions();
	const { modelX, modelY } = useContext(UserContext);
    // eslint-disable-next-line
	const ratioX = width / modelX;
	const ratioY = height / modelY;

    const styles = StyleSheet.create({
        page: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        modal: {
            backgroundColor: "#fff",
            padding: 30 * ratioY,
            borderRadius: 6,
        },
        modalCancel: {
            position: "absolute",
            top: 8 * ratioY,
            right: 8 * ratioY,
            height: 30 * ratioY,
            width: 30 * ratioY,
            borderColor: "#000",
            borderWidth: 1,
            borderRadius: 15 * ratioY,
            alignItems: "center",
            padding: 2 * ratioY,
        },
        modalX: {
            height: 20 * ratioY,
            lineHeight: 20 * ratioY
        },
        title: {
            fontSize: 16,
            textDecorationLine: "underline",
            marginBottom: 10 * ratioY
        }
    })

    const defaultMessage = {
        title: "An error occured",
        prompt: "If this issue persists, please contact technical support at support@testing.com"
    }

    const message = status ? getHTTPFailureResponseText(status) : defaultMessage;

    return (
        < Modal animationType="fade" transparent visible={isVisible} >
            <View style={styles.page}>
                <View style={styles.modal}>
                    <Pressable
                        style={styles.modalCancel}
                        onPress={() => setIsVisible(false)}>
                        <View>
                            <Text style={styles.modalX}>x</Text>
                        </View>
                    </Pressable>
                    <Text style={styles.title}>{message?.title}</Text>
                    <Text style={styles.prompt}>{message?.prompt}</Text>
                </View>
            </View>
        </Modal >
    )

}


export default GeneralErrorModal;