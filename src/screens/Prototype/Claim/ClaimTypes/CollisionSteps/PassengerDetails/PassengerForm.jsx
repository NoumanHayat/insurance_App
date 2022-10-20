import React, { useContext } from 'react';
import {
    View,
    StyleSheet,
    useWindowDimensions,
    Text,
    Pressable
} from "react-native";
import { useToast } from 'react-native-toast-notifications';
import ScrollViewWithFade from '../../../../../../components/scrollviews/ScrollViewWithFade';
import TextButton2 from '../../../../../../components/buttons/TextButton2';
import UserContext from '../../../../../../context/context';
import InputText from '../../../../../../components/inputs/InputText';
import InputTextV3 from '../../../../../../components/inputs/InputTextV3';
import InputPhoneNum from '../../../../../../components/inputs/InputPhoneNumV2';
import InputEmail from '../../../../../../components/inputs/InputEmail';
import InputTRN from '../../../../../../components/inputs/InputTRN';
import InputTextV4 from '../../../../../../components/inputs/InputTextV4';
import InputEmailV2 from '../../../../../../components/inputs/InputEmailV2';

const PassengerForm = ({
    setfirstName,
    setlastName,
    setphoneNumber,
    setemailAddress,
    setTrn,
    setDescription,
    isFirstNameValid,
    isLastNameValid,
    isPhoneNumberValid,
    isEmailValid,
    isTrnValid,
    isDescriptionValid,
    setisFirstNameValid,
    setisLastNameValid,
    setisPhoneNumberValid,
    setisEmailValid,
    setisTrnValid,
    setisDescriptionValid,
    passengerDetails,
    setshowPassengerForm,
    firstName,
    lastName,
    phoneNumber,
    emailAddress,
    trn,
    description,
    showEditForm,
    setShowEditForm,
    setSelectedIndex
}) => {
    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioY = height / modelY;
    const ratioX = width / modelX;

    const toast = useToast();

    const styles = StyleSheet.create({
        formContainer: {
            flex: 1,
            backgroundColor: "#374151",
            borderRadius: 8,
            flexDirection: "column",
            paddingHorizontal: 14,
            paddingVertical: 20,
            // width: "100%"
        },
        formTitle: {
            fontSize: 16,
            lineHeight: 16,
            color: "#fff",
            fontWeight: "500"
        },
        formHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20
        },
        inputGroup: {
            marginBottom: 30 * ratioY,
            width: "100%"
        },
        formLabel: {
            color: "#8D9AA5",
            marginBottom: 8 * ratioY,
            fontSize: 10 * ratioY,
            fontWeight: "600"
        },
        formLabelDescription: {
            marginBottom: 85 * ratioY,
        },
        doubleLabel: {
            flexDirection: "row",
            justifyContent: "space-between"
        },
        largeInput: {
            marginBottom: 100
        }
    });

    const addPassenger = () => {
        let params = { firstName, lastName, phoneNumber, emailAddress, trn, description }
        passengerDetails.push(params)
        setshowPassengerForm(false);
    }

    const cancelEditPassenger = () => {
        setShowEditForm(false)
        setSelectedIndex(null)
    }

    const testToast = () => {
        toast.show("Tap to undo this action",
            { data: "Passenger Deleted", type: "claims_delete" },
        );
    }
    return (
        <View style={styles.formContainer}>
            {
                showEditForm !== true ?
                    <View style={styles.formHeader}>
                        <Text style={styles.formTitle}> Add Passenger </Text>
                        <Pressable onPress={() => setshowPassengerForm(false)}>
                            <TextButton2
                                text="CANCEL"
                                textColor="#FFFFFF"
                                backgroundColor="#6B7280"
                                width={62 * ratioX}
                                height={24 * ratioY}
                                borderRadius={6}
                                fontSize={12 * ratioY}
                            />
                        </Pressable>
                    </View>
                    :
                    <View style={styles.formHeader}>
                        <Text style={styles.formTitle}> Editing Passenger </Text>
                        <Pressable onPress={cancelEditPassenger}>
                            <TextButton2
                                text="CANCEL"
                                textColor="#FFFFFF"
                                backgroundColor="#6B7280"
                                width={62 * ratioX}
                                height={24 * ratioY}
                                borderRadius={6}
                                fontSize={12 * ratioY}
                            />
                        </Pressable>
                    </View>
            }

            <View style={styles.inputGroup}>
                <Text style={styles.formLabel}> FIRST NAME </Text>
                <InputTextV4
                    minLength={3}
                    maxLength={20}
                    setExtracted={setfirstName}
                    editable
                    placeholder={"Enter first name"}
                    valid={isFirstNameValid}
                    setValid={setisFirstNameValid}
                    keyboardType="default"
                    background="#4B5563"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.formLabel}> LAST NAME </Text>

                <InputTextV4
                    minLength={3}
                    maxLength={20}
                    setExtracted={setlastName}
                    editable
                    placeholder={"Enter last name"}
                    valid={isLastNameValid}
                    setValid={setisLastNameValid}
                    keyboardType="default"
                    background="#4B5563"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.formLabel}> PHONE </Text>
                <InputTextV4
                    valid={isPhoneNumberValid}
                    setValid={setisPhoneNumberValid}
                    setExtracted={setphoneNumber}
                    editable
                    placeholder="Enter contact number"
                    background="#4B5563"
                />
            </View>

            <View style={styles.inputGroup}>
                <View style={styles.doubleLabel}>
                    <Text style={styles.formLabel}> EMAIL </Text>
                    <Text style={styles.formLabel}> (OPTIONAL) </Text>
                </View>
                <InputEmailV2
                    BGColor={true}
                    valid={isEmailValid}
                    setValid={setisEmailValid}
                    editable
                    keyboardType="email-address"
                    placeholder="Enter email address"
                    setExtracted={setemailAddress}
                    pageColour="#6B7280"
                />
            </View>

            <View style={styles.inputGroup}>
                <View style={styles.doubleLabel}>
                    <Text style={styles.formLabel}> TRN </Text>
                    <Text style={styles.formLabel}> (OPTIONAL) </Text>
                </View>
                <InputTextV4
                    valid={isTrnValid}
                    setValid={setisTrnValid}
                    editable
                    setExtracted={setTrn}
                    placeholder={"Enter TRN"}
                    background="#4B5563"
                />
            </View>

            <View style={[styles.inputGroup, styles.largeInput]}>
                <View style={styles.doubleLabel}>
                    <Text style={[styles.formLabel, styles.formLabelDescription]}> DESCRIPTION OF INJURIES </Text>
                    <Text style={styles.formLabel}> (OPTIONAL) </Text>
                </View>

                <InputTextV3
                    valid={isDescriptionValid}
                    setValid={setisDescriptionValid}
                    inputHeight={200 * ratioY}
                    keyboardType="default"
                    setExtracted={setDescription}
                    placeholder="Describe the injuries from the incident in detail"
                    BGColor={true}
                />
            </View>

            {
                showEditForm !== true ?
                    <Pressable onPress={addPassenger}>
                        <TextButton2
                            text="Save Passenger"
                            textColor="#FFFFFF"
                            backgroundColor="#047857"
                            width="100%"
                            height={42 * ratioY}
                            borderRadius={6}
                            fontSize={16 * ratioY}
                        />
                    </Pressable>
                    :
                    <View style={styles.doubleLabel}>
                        <Pressable onPress={testToast}>
                            <TextButton2
                                text="Delete"
                                textColor="#FFFFFF"
                                backgroundColor="#6B7280"
                                width={80 * ratioX}
                                height={42 * ratioY}
                                borderRadius={6}
                                fontSize={16 * ratioY}
                            />
                        </Pressable>

                        <Pressable onPress={addPassenger}>
                            <TextButton2
                                text="Save Changes"
                                textColor="#FFFFFF"
                                backgroundColor="#047857"
                                width={184 * ratioX}
                                height={42 * ratioY}
                                borderRadius={6}
                                fontSize={16 * ratioY}
                            />
                        </Pressable>
                    </View>
            }
        </View>
    );
}

export default PassengerForm;