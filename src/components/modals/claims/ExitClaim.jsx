import React, { useContext } from 'react'
import { Modal, Pressable, Text, View, StyleSheet, useWindowDimensions } from 'react-native'
import WarningIcon from "../../../../assets/icons/warning.svg"
import UserContext from '../../../context/context'
import { fontWeight } from '../../../styles/global'
import Size1 from '../../buttons/Size1'

const ExitClaim = ({ visible, setVisible, exitWithoutSaving, saveAndExit }) => {
    const { height, width } = useWindowDimensions();
    const { modelX, modelY, platform } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        modal: {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 32 * ratioY,
            paddingHorizontal: 24 * ratioX,
            backgroundColor: "rgba(0, 0, 0, .75)",
        },
        card: {
            padding: 36 * ratioY,
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 8 * ratioY,
            marginBottom: 20 * ratioY,
            justifyContent: "center",
            alignItems: "center"
        },
        cardHeader: {
            fontSize: 16,
            fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
            color: "#111827",
            marginVertical: 12,
            textAlign: 'center'
        },
        buttons: {
            marginBottom: 16 * ratioY,
            width: "100%"
        }
    })

    const hide = () => {
        setVisible(false)
    }

    return (
        <Modal animationType="slide" transparent visible={visible}>
            <View style={styles.modal}>
                <View style={styles.card}>
                    <WarningIcon height={30 * ratioY} width={32 * ratioX} />
                    <Text style={styles.cardHeader}>Are you sure you want to exit this claim process?</Text>
                    <Text>Changes made will not be saved</Text>
                </View>
                <Pressable onPress={saveAndExit} style={styles.buttons}>
                    <Size1
                        disabled={false}
                        activeColor="#2565BF"
                        text={'Save & Exit'}
                    />
                </Pressable>
                <Pressable onPress={exitWithoutSaving} style={styles.buttons}>
                    <Size1
                        disabled={false}
                        activeColor="#6B7280"
                        text={'Exit Without Saving'}
                    />
                </Pressable>
                <Pressable onPress={hide} style={styles.buttons}>
                    <Size1
                        disabled={false}
                        activeColor="#6B7280"
                        text={'Cancel'}
                    />
                </Pressable>
            </View>
        </Modal >
    )
}

export default ExitClaim