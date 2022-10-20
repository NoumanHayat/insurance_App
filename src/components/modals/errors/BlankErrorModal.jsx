import React, { useContext } from 'react';
import { View, StyleSheet, Modal, Text, Pressable, useWindowDimensions } from 'react-native';

import UserContext from '../../../context/context';
import Size1 from '../../buttons/Size1';
import WarningIcon from "../../../../assets/icons/warning.svg"

const BlankErrorModal = ({ visible, customError, fontWeight }) => {

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
            paddingHorizontal: 24 * ratioX,
            backgroundColor: "rgba(0, 0, 0, .75)",

            // borderWidth: 1,
            // borderColor: "red"
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
            fontWeight: fontWeight ?? "600",
            textAlign: "center",
            color: "#111827",
            fontSize: 16 * ratioY,
            marginTop: 16 * ratioY,
            marginBottom: 12 * ratioY
        }
    })

    return (
        <Modal animationType="slide" visible={visible}>
            <View style={styles.page}>
                <View style={styles.modal}>
                    <WarningIcon height={30 * ratioY} width={32 * ratioX}/>
                    <Text style={styles.title}>{customError?.title}</Text>
                    <Text style={styles.modalText}>{customError?.message}</Text>
                </View>

                <Pressable onPress={customError?.blueBtnCallback} style={styles.cancelRenewal}>
                    <Size1
                        disabled={false}
                        activeColor="#2565BF"
                        text={customError?.blueBtnText}
                    />
                </Pressable>

                <Pressable onPress={customError?.greyBtnCallback} style={styles.dismiss}>
                    <Size1
                        disabled={false}
                        activeColor="#6B7280"
                        text={customError?.greyBtnText}
                    />
                </Pressable>
            </View>
        </Modal>
    )
}

export default BlankErrorModal;