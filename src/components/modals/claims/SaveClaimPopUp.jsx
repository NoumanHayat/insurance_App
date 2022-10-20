import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import UserContext from '../../../context/context'
import { fontWeight } from '../../../styles/global'
import Size1 from '../../buttons/Size1'
import InputText from '../../inputs/InputTextV4'

const SaveClaimPopUp = ({ visible, setVisible }) => {
    const { height, width } = useWindowDimensions();
    const { modelX, modelY, platform } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        container: {
            backgroundColor:"black"
        },
        popUp:{
            flex: 1,
            justifyContent: "center",
            paddingBottom: 32 * ratioY,
            height:"50%",
            paddingHorizontal: 24 * ratioX,
            backgroundColor:"#1F2937"
        },
        header: {
            fontSize: 18,
            fontWeight: platform == "android" ? fontWeight["font-weight-3"] : fontWeight["font-weight-2"],
            color: "#fff",
            marginVertical: 12,
            marginBottom: 16 * ratioY,
        },
        text: {
            marginBottom: 32 * ratioY,
        },
        buttons: {
            marginBottom: 18 * ratioY,
        }
    })

    const saveClaim = () => {
        navigation.navigate("ClaimSaved")
    }


    const hide = () => {
        setVisible(false)
    }


    return (
        <Modal style={styles.container} transparent visible={visible}>
            <View style={styles.popUp}>
                <Text style={styles.header}>Save claim as...</Text>
                <View style={styles.text}>
                    <InputText
                        editable
                        placeholder={'Claim Name'}
                        keyboardType="default"
                    />
                </View>
                <Pressable onPress={saveClaim} style={styles.buttons}>
                    <Size1
                        disabled={false}
                        activeColor="#2565BF"
                        text={'Save Claim'}
                        btnHeight={50 * ratioY}
                    />
                </Pressable>
                <Pressable onPress={hide} style={styles.buttons}>
                    <Size1
                        disabled={false}
                        activeColor="#6B7280"
                        text={'Go Back'}
                        btnHeight={50 * ratioY}
                    />
                </Pressable>
            </View>
        </Modal>
    )
}

export default SaveClaimPopUp