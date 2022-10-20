import React, { useContext } from "react";
import {
    View,
    StyleSheet,
    useWindowDimensions,
    Pressable,
    Modal,
} from "react-native";

import UserContext from "../../../context/context";
import Size1 from "../../buttons/Size1";

const BlankDetailsModal = ({ isModalVisible, setIsModalVisible, children }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY, statusBarHeight } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 24 * ratioX,
            paddingTop: 24 * ratioY + statusBarHeight,
            paddingBottom: 32 * ratioY,
            backgroundColor: "#1F2937"
        },
        innerContainer: {
            flex: 1,
            alignItems: "center",
            borderColor: "#000",
            borderWidth: 1,
            backgroundColor: "#fff",
            width: "100%",
            borderRadius: 8 * ratioY,
        },
        dismiss: {
            width: "100%",
            marginTop: 20 * ratioY,
        },

    });


    return (
        <Modal animationType="slide" transparent visible={isModalVisible}>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    {children}
                </View>
                <Pressable style={styles.dismiss} onPress={() => setIsModalVisible(false)}>
                    <Size1 text="Dismiss" disabled={false} activeColor="#6B7280" />
                </Pressable>
            </View>
        </Modal>
    );
}





export default BlankDetailsModal;
