import React, { useContext, useState } from 'react';
import {
    View,
    StyleSheet,
    useWindowDimensions,
    Text,
    Pressable
} from "react-native";
import ScrollViewWithFade from '../../../../../../components/scrollviews/ScrollViewWithFade';
import TextButton2 from '../../../../../../components/buttons/TextButton2';
import UserContext from '../../../../../../context/context';
import PassengerForm from './PassengerForm';
import PersonDetailsCard from '../PersonDetailsCard';

const PassengerDetails = () => {
    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioY = height / modelY;
    const ratioX = width / modelX;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            padding: 24,
            backgroundColor: "#1F2937",
            width: "100%",
            height: "100%",
        },
        inititalAddPassenger: {
            flexDirection: "column",

        },
        instructions: {
            fontSize: 14,
            lineHeight: 21,
            color: "#fff",
            marginBottom: 24
        },
        boldText: {
            fontWeight: "600"
        },
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
        },
    });

    const [showPassengerForm, setshowPassengerForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [phoneNumber, setphoneNumber] = useState();
    const [emailAddress, setemailAddress] = useState('');
    const [trn, setTrn] = useState('');
    const [description, setDescription] = useState('');

    const [isFirstNameValid, setisFirstNameValid] = useState();
    const [isLastNameValid, setisLastNameValid] = useState();
    const [isPhoneNumberValid, setisPhoneNumberValid] = useState();
    const [isEmailValid, setisEmailValid] = useState(true);
    const [isTrnValid, setisTrnValid] = useState();
    const [isDescriptionValid, setisDescriptionValid] = useState(false);

    const [passengerDetails, setPassengerDetails] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [disableEditBtn, showDisableEditBtn] = useState();

    const editPassengerForm = () => {
        setShowEditForm(true);
    }
    return (
        <ScrollViewWithFade fadeHeight={15 * ratioY} pageColor="#1F2937">
            <View style={styles.container}>
                {
                    showPassengerForm === true ?
                        <PassengerForm
                            setfirstName={setfirstName}
                            setlastName={setlastName}
                            setphoneNumber={setphoneNumber}
                            setemailAddress={setemailAddress}
                            setTrn={setTrn}
                            setDescription={setDescription}
                            setisFirstNameValid={setisFirstNameValid}
                            setisLastNameValid={setisLastNameValid}
                            setisPhoneNumberValid={setisPhoneNumberValid}
                            setisEmailValid={setisEmailValid}
                            setisTrnValid={setisTrnValid}
                            setisDescriptionValid={setisDescriptionValid}
                            passengerDetails={passengerDetails}
                            isFirstNameValid={isFirstNameValid}
                            isLastNameValid={isLastNameValid}
                            isPhoneNumberValid={isPhoneNumberValid}
                            isEmailValid={isEmailValid}
                            isTrnValid={isTrnValid}
                            isDescriptionValid={isDescriptionValid}
                            setshowPassengerForm={setshowPassengerForm}
                            firstName={firstName}
                            lastName={lastName}
                            phoneNumber={phoneNumber}
                            emailAddress={emailAddress}
                            trn={trn}
                            description={description}
                        />
                        :
                        <View style={styles.inititalAddPassenger}>
                            <Text style={styles.instructions}> Be sure to have the
                                <Text style={styles.boldText}> Name </Text> and <Text style={styles.boldText}> Contact Info</Text> for each of your passengers.
                            </Text>

                            {
                                passengerDetails.length === 0 ?
                                    <Pressable onPress={() => { setshowPassengerForm(true) }}>
                                        <TextButton2
                                            text="Add Passenger"
                                            textColor="#FFFFFF"
                                            backgroundColor="#047857"
                                            width="100%"
                                            height={42 * ratioY}
                                            borderRadius={6}
                                            fontSize={16 * ratioY}
                                        />
                                    </Pressable>
                                    :
                                    <View>
                                        {
                                            passengerDetails.map((item, index) => {
                                                return (
                                                    <PersonDetailsCard
                                                        index={index}
                                                        firstName={item.firstName}
                                                        lastName={item.lastName}
                                                        phoneNumber={item.phoneNumber}
                                                        setShowEditForm={setShowEditForm}
                                                        selectedIndex={selectedIndex}
                                                        setSelectedIndex={setSelectedIndex}
                                                        editForm={editPassengerForm}
                                                    />
                                                )
                                            }
                                            )
                                        }
                                        {
                                            showEditForm !== true ?
                                                <Pressable onPress={() => { setshowPassengerForm(true) }}>
                                                    <TextButton2
                                                        text="Add Passenger"
                                                        textColor="#FFFFFF"
                                                        backgroundColor="#047857"
                                                        width="100%"
                                                        height={42 * ratioY}
                                                        borderRadius={6}
                                                        fontSize={16 * ratioY}
                                                    />
                                                </Pressable>
                                                :
                                                <PassengerForm
                                                    setfirstName={setfirstName}
                                                    setlastName={setlastName}
                                                    setphoneNumber={setphoneNumber}
                                                    setemailAddress={setemailAddress}
                                                    setTrn={setTrn}
                                                    setDescription={setDescription}
                                                    setisFirstNameValid={setisFirstNameValid}
                                                    setisLastNameValid={setisLastNameValid}
                                                    setisPhoneNumberValid={setisPhoneNumberValid}
                                                    setisEmailValid={setisEmailValid}
                                                    setisTrnValid={setisTrnValid}
                                                    setisDescriptionValid={setisDescriptionValid}
                                                    passengerDetails={passengerDetails}
                                                    isFirstNameValid={isFirstNameValid}
                                                    isLastNameValid={isLastNameValid}
                                                    isPhoneNumberValid={isPhoneNumberValid}
                                                    isEmailValid={isEmailValid}
                                                    isTrnValid={isTrnValid}
                                                    isDescriptionValid={isDescriptionValid}
                                                    setshowPassengerForm={setshowPassengerForm}
                                                    firstName={firstName}
                                                    lastName={lastName}
                                                    phoneNumber={phoneNumber}
                                                    emailAddress={emailAddress}
                                                    trn={trn}
                                                    description={description}
                                                    showEditForm={showEditForm}
                                                    setShowEditForm={setShowEditForm}
                                                    setSelectedIndex={setSelectedIndex}
                                                />
                                        }
                                    </View>
                            }
                        </View>
                }
            </View >
        </ScrollViewWithFade>
    );
}

export default PassengerDetails;