import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Size1 from '../../buttons/Size1';
import UserContext from '../../../context/context';

// eslint-disable-next-line
const RenewalPolicyFooter = ({ page, stepCompleted, setPage, showCancelModal, getPlanOptions, onBackPress, inputsVisible, rightButtonText, onSavePress, policy }) => {

    const { width } = useWindowDimensions();
    const { modelX } = useContext(UserContext);
    const ratioX = width / modelX;

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
        }
    })

    return (
        <View style={styles.container}>
            <Pressable onPress={() => {
                if (page > 0 && page < 2 || page == 2 && !inputsVisible) {
                    setPage(page - 1);
                } else if (page == 2 && inputsVisible) {
                    onBackPress();
                } else if (page == 0) {
                    showCancelModal()
                }
            }}
            >
                <Size1
                    text="Back"
                    width={100 * ratioX}
                    activeColor="#6B7280"
                />
            </Pressable>
            <Pressable disabled={false} onPress={async () => {
                if (page == 0) {
                    setPage(1)
                    // getPlanOptions()
                    // .then(() => { setPage(1) })
                    // .catch(() => { console.log("An error occured while getting the payment plans")})
                }
                else if (page > 0 && page < 2) {
                    setPage(page + 1)
                } else if (page === 2 && stepCompleted) {
                    navigation.navigate("ConfirmRenewal", {
                        policy,
                    });
                } else if (page == 2 && rightButtonText == "Save") {
                    onSavePress()
                }
            }}>
                <Size1
                    text={rightButtonText}
                    width={190 * ratioX}
                    disabled={!stepCompleted}
                    activeColor="#2565BF"
                />
            </Pressable>
        </View>
    )

}

export default RenewalPolicyFooter;