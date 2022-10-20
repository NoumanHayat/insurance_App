import React from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';

const ExpirationWarningModal = ({ visible }) => {

    const styles = StyleSheet.create({
        modal: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2
        },
        innerModal: {
            padding: 20,
            backgroundColor: "#fff",
            borderRadius: 5
        }
    })

    return (
        <Modal transparent visible={visible}>
            <View style={styles.modal}>
                <View style={styles.innerModal}>
                    <Text>Your session is about to expire</Text>
                </View>
            </View>
        </Modal>
    )
}

export default ExpirationWarningModal;