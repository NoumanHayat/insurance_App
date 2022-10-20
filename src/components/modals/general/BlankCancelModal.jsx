import React, { useContext } from 'react';
import { View, StyleSheet, Modal, Text, Pressable, useWindowDimensions } from 'react-native';

import UserContext from '../../../context/context';
import Size1 from '../../buttons/Size1';

const CancelModal = ({ visible, setVisible, cancelRenewal, modalText, blueButtonText, greyButtonText, title }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        page: {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 32 * ratioY,
            paddingHorizontal: 24 * ratioX
        },
        modal: {
            padding: 36 * ratioY,
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 8 * ratioY,
            marginBottom: 20 * ratioY,
            justifyContent: "center",
            alignItems: "center"
        },
        modalText: {
          textAlign: "center",
          color: "#111827",
          fontSize: 16 * ratioY,
          lineHeight: 24 * ratioY  
        },
        cancelRenewal: {
            marginBottom: 16 * ratioY,
            width: "100%"
        },
        dismiss: {
            width: "100%"
        },
        title: {
            fontWeight: "600",
            color: "#111827",
            fontSize: 16 * ratioY
        }
    })

    const hide = () => {
        setVisible(false)
    }

    return (
        <Modal animationType="slide" transparent visible={visible}>
            <View style={styles.page}>
                <View style={styles.modal}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.modalText}>{modalText}</Text>
                </View>

                <Pressable onPress={cancelRenewal} style={styles.cancelRenewal}>
                    <Size1
                        disabled={false}
                        activeColor="#2565BF"
                        text={blueButtonText}
                    />
                </Pressable>

                <Pressable onPress={hide} style={styles.dismiss}>
                    <Size1
                        disabled={false}
                        activeColor="#6B7280"
                        text={greyButtonText}
                    />
                </Pressable>
            </View>
        </Modal>
    )
}

export default CancelModal;