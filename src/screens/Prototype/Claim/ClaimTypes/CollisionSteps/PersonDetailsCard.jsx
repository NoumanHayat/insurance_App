import React, { useContext } from 'react';
import {
    View,
    StyleSheet,
    useWindowDimensions,
    Text,
    Pressable
} from "react-native";
import UserContext from '../../../../../context/context';
import TextButton2 from '../../../../../components/buttons/TextButton2';

const PersonDetailsCard = ({
    firstName,
    lastName,
    phoneNumber,
    index,
    editForm,
    setSelectedIndex,
    selectedIndex,
    showEditForm
}) => {
    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioY = height / modelY;
    const ratioX = width / modelX;

    const styles = StyleSheet.create({
        passengerCard: {
            backgroundColor: "#374151",
            width: "100%",
            height: 70 * ratioY,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
            marginBottom: 24,
            borderRadius: 6
        },
        innerPassengerCard: {
            flexDirection: "column",
        },
        passengerName: {
            fontSize: 16,
            fontWeight: "600",
            lineHeight: 16,
            color: "#FFF",
            marginBottom: 8
        },
        passengerNum: {
            fontSize: 14,
            lineHeight: 14,
            color: "#D1D5DB"
        }
    });

    const testEdit = () => {
        setSelectedIndex(index)
        editForm();
    }

    return (
        <View style={styles.passengerCard}>
            <View style={styles.innerPassengerCard}>
                <Text style={styles.passengerName}> {firstName} {lastName} </Text>
                <Text style={styles.passengerNum}> {phoneNumber} </Text>
            </View>

            {
                showEditForm !== true && selectedIndex !== index ?
                    < Pressable onPress={testEdit}>
                        <TextButton2
                            text="EDIT"
                            textColor="#FFFFFF"
                            backgroundColor="#6B7280"
                            width={38 * ratioX}
                            height={24 * ratioY}
                            borderRadius={6}
                            fontSize={12 * ratioY}
                        />
                    </Pressable>
                    :
                    < Pressable
                        onPress={testEdit}
                        disabled={true}
                    >
                        <TextButton2
                            text="EDIT"
                            textColor="#FFFFFF"
                            backgroundColor="#4B5563"
                            width={38 * ratioX}
                            height={24 * ratioY}
                            borderRadius={6}
                            fontSize={12 * ratioY}
                        />
                    </Pressable>
            }
        </View >
    );
}

export default PersonDetailsCard;