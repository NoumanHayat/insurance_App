import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, useWindowDimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import Modal from "react-native-modal";

import UserContext from '../../../context/context';
import SwipeIcon from "../../../../assets/icons/swipe-icon.svg";
import ScrollViewWithFade from '../../scrollviews/ScrollViewWithFade';
import PrelimQuestsCard from '../../card/PrelimQuestsCard';
import ContinueWithAnimation from '../../buttons/ContinueWithAnimation';

const PrelimQuestsModal = ({ prelimModalVisible, setPrelimModalVisible, setContactModalVisible, policy, benefits, vehicleIdentity, prevPremium, renewPolicy }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY, statusBarHeight, platform } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const [allQuesSelected, setAllQuesSelected] = useState(false)
    const [continuePressed, setContinuePressed] = useState(false);
    const [ques1Selected, setQues1Selected] = useState(false)
    const [ques2Selected, setQues2Selected] = useState(false)
    const [ques3Selected, setQues3Selected] = useState(false)
    const [ques4Selected, setQues4Selected] = useState(false)

    const [selectedOption1, setSelectedOption1] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState(false);
    const [selectedOption3, setSelectedOption3] = useState(false);
    const [selectedOption4, setSelectedOption4] = useState(false);

    const navigation = useNavigation()

    useEffect(() => {
        if (ques1Selected && ques2Selected && ques3Selected && ques4Selected) {
            setAllQuesSelected(true)
        } else {
            setAllQuesSelected(false)
            setContinuePressed(false)
        }
    }, [ques1Selected, ques2Selected, ques3Selected, ques4Selected])

    const styles = StyleSheet.create({
        modalView: {
            margin: 0,
            paddingTop: 77 * ratioY + statusBarHeight
        },
        backCard: {
            flex: 1,
            backgroundColor: "#374151",
            borderTopEndRadius: 24,
            borderTopStartRadius: 24,
        },
        swipeIcon: {
            marginTop: 12 * ratioY,
            alignSelf: "center",
        },
        title: {
            color: "#fff",
            fontSize: 25,
            marginTop: 32 * ratioY,
            paddingLeft: 24 * ratioX,
            paddingBottom: 10 * ratioY,
            borderBottomWidth: 1,
            borderBottomColor: "#6B7280"
        },
        spacer: {
            margin: 10,
        },
        button: {
            alignSelf: "center",
            marginTop: 16 * ratioY,
            marginBottom: 32 * ratioX,
        },
        line: {
            borderWidth: 0.5,
            borderColor: "#6B7280"
        },
        continue: {
            width: 342 * ratioX,
            alignSelf: "center",
            marginTop: 16 * ratioY,
            marginBottom: 32 * ratioX,
        }
    })

    const ques1 = "Have you or anyone driving your vehicle had any accidents in the past 12 months that has not been reported to Advantage General (regardless of fault)?"
    const ques2 = "Does the owner of the vehicle reside outside of Jamaica for more than six (6) months each year?"
    const ques3 = "Have you or any relative or close associate been entrusted with prominent public function (e.g. Politician, Senior Government, Judicial or Security Force Officials) in any Country?"
    const ques4 = "Do you or any driver have physical disability or infirmity that may impair your ability to drive?"

    const handleContinuePressed = () => {
        setContinuePressed(true)

        if (selectedOption1 && selectedOption2 && selectedOption3 && selectedOption4) {
            setPrelimModalVisible(false)
            navigation.navigate(renewPolicy ? "RenewPolicy" : "PayPremium", {
                policy,
                benefits,
                vehicleIdentity,
                prevPremium,
            })
        } else {
            setPrelimModalVisible(false)
            platform == "android" && setContactModalVisible(true) //platform android
        }
        console.log("continue pressed!")
    }

    return (
        <Modal
            isVisible={prelimModalVisible}
            onBackdropPress={() => setPrelimModalVisible(false)}
            style={styles.modalView}
            onModalHide={() => {
                platform == "ios" && setContactModalVisible(true)
            }} //platform ios
        >
            <View style={styles.backCard}>
                <View style={styles.swipeIcon}>
                    <SwipeIcon />
                </View>
                <Text style={styles.title}>Before Renewing...</Text>
                <ScrollViewWithFade fadeHeight={15 * ratioY} pageColor="#374151">
                    <View style={styles.spacer}></View>
                    <PrelimQuestsCard
                        text={ques1}
                        marginBottom={10}
                        marginTop={10}
                        setPrelimModalVisible={setPrelimModalVisible}
                        prelimModalVisible={prelimModalVisible}
                        setContactModalVisible={setContactModalVisible}
                        quesSelected={ques1Selected}
                        setQuesSelected={setQues1Selected}
                        selectedOption={selectedOption1}
                        setSelectedOption={setSelectedOption1}
                    />
                    <PrelimQuestsCard
                        text={ques2}
                        marginBottom={10}
                        marginTop={10}
                        setPrelimModalVisible={setPrelimModalVisible}
                        prelimModalVisible={prelimModalVisible}
                        setContactModalVisible={setContactModalVisible}
                        quesSelected={ques2Selected}
                        setQuesSelected={setQues2Selected}
                        selectedOption={selectedOption2}
                        setSelectedOption={setSelectedOption2}
                    />
                    <PrelimQuestsCard
                        text={ques3}
                        marginBottom={10}
                        marginTop={10}
                        setPrelimModalVisible={setPrelimModalVisible}
                        prelimModalVisible={prelimModalVisible}
                        setContactModalVisible={setContactModalVisible}
                        quesSelected={ques3Selected}
                        setQuesSelected={setQues3Selected}
                        selectedOption={selectedOption3}
                        setSelectedOption={setSelectedOption3}
                    />
                    <PrelimQuestsCard
                        text={ques4}
                        marginBottom={10}
                        marginTop={10}
                        setPrelimModalVisible={setPrelimModalVisible}
                        prelimModalVisible={prelimModalVisible}
                        setContactModalVisible={setContactModalVisible}
                        quesSelected={ques4Selected}
                        setQuesSelected={setQues4Selected}
                        selectedOption={selectedOption4}
                        setSelectedOption={setSelectedOption4}
                    />
                    <View style={styles.spacer}></View>
                </ScrollViewWithFade>
                <View style={styles.line}></View>
                <Pressable
                    disabled={!allQuesSelected}
                    style={styles.continue}
                    onPress={handleContinuePressed}
                >
                    <ContinueWithAnimation
                        disabled={!allQuesSelected}
                        pressed={continuePressed}
                        prelim={true}
                    />
                </Pressable>
            </View>

        </Modal>
    )
}

export default PrelimQuestsModal;