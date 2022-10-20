import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, useWindowDimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import Modal from "react-native-modal";

import UserContext from '../../../context/context';
import SwipeIcon from "../../../../assets/icons/swipe-icon.svg";
import ScrollViewWithFade from '../../scrollviews/ScrollViewWithFade';
import PrelimQuestsCard from '../../card/PrelimQuestsCard';
import ContinueWithAnimation from '../../buttons/ContinueWithAnimation';
import Size1 from '../../buttons/Size1';
import AboutFilingClaimModal from './AboutFilingClaim';


const ClaimQuestsModal = ({ claimQuestsModal, setClaimQuestsModal, onBackPress, policy, benefits, vehicleIdentity, prevPremium, renewPolicy }) => {

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
    const [ques5Selected, setQues5Selected] = useState(false)
    const [ques6Selected, setQues6Selected] = useState(false)
    const [ques7Selected, setQues7Selected] = useState(false)
    const [ques8Selected, setQues8Selected] = useState(false)
    const [ques9Selected, setQues9Selected] = useState(false)

    const [ques4iSelected, setQues4iSelected] = useState(false)
    const [ques4iiSelected, setQues4iiSelected] = useState(false)
    const [ques5iSelected, setQues5iSelected] = useState(false)
    const [ques5iiSelected, setQues5iiSelected] = useState(false)
    const [ques5iiiSelected, setQues5iiiSelected] = useState(false)

    const [selectedOption1, setSelectedOption1] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState(false);
    const [selectedOption3, setSelectedOption3] = useState(false);
    const [selectedOption4, setSelectedOption4] = useState(false);
    const [selectedOption5, setSelectedOption5] = useState(false);
    const [selectedOption6, setSelectedOption6] = useState(false);
    const [selectedOption7, setSelectedOption7] = useState(false);
    const [selectedOption8, setSelectedOption8] = useState(false);
    const [selectedOption9, setSelectedOption9] = useState(false);

    const [selectedOption4i, setSelectedOption4i] = useState(false);
    const [selectedOption4ii, setSelectedOption4ii] = useState(false);
    const [selectedOption5i, setSelectedOption5i] = useState(false);
    const [selectedOption5ii, setSelectedOption5ii] = useState(false);
    const [selectedOption5iii, setSelectedOption5iii] = useState(false);

    

    const navigation = useNavigation()

    useEffect(() => {
        if (ques1Selected ||
            ques2Selected ||
            ques3Selected ||
            ques4Selected ||
            ques5Selected ||
            ques6Selected ||
            ques7Selected ||
            ques8Selected ||
            ques9Selected) {
            setAllQuesSelected(true)
        } else {
            setAllQuesSelected(false)
            setContinuePressed(false)
        }
    }, [ques1Selected,
        ques2Selected,
        ques3Selected,
        ques4Selected,
        ques5Selected,
        ques6Selected,
        ques7Selected,
        ques8Selected,
        ques9Selected])

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
        footer: {
            flexDirection: "row",
            width: 342 * ratioX,
            justifyContent: "space-between",
            alignSelf: "center",
            marginTop: 16 * ratioY,
            marginBottom: 32 * ratioX,
        },
    })

    const ques1 = "Were you the driver of the vehicle?"
    const ques2 = "Were there passengers in your vehicle?"
    const ques3 = "Do you have any witnesses not physically involved willing to giva an account of the accident?"
    const ques4 = "Was your vehicle damaged?"
    const ques4i = "Will you be claiming damages on your vehicle?"
    const ques4ii = "Do you have an estimate of the repairs?"
    const ques5 = "Did the collision occur with any other vehicle(s)?"
    const ques5i = "Do you have information on the other vehicles involved?"
    const ques5ii = "Were there any damages to the other vehicle(s)?"
    const quesiii = "Were there any passengers in the other vehicle(s) besides the driver(s)?"
    const ques6 = "Was any non-vehicular property damaged (fences, walls, poles, sign-posts)?"
    const ques7 = "Were any pedestrians involved?"
    const ques8 = "Do you believe you were at fault for the accident?"
    const ques9 = "Was this accident reported to the police?"

    const handleContinuePressed = () => {
        setContinuePressed(true)

        if (selectedOption1 ||
            selectedOption2 ||
            selectedOption3 ||
            selectedOption4) {
            setClaimQuestsModal(false)
            navigation.navigate("CollisionClaim", {
                // policy,
                // benefits,
                vehicleIdentity,
                selectedOption1,
                // premiumData,
                // prevPremium: total,
            })
        } else {
            setClaimQuestsModal(false)
        }
    }

    return (
        <Modal
            isVisible={claimQuestsModal}
            onBackdropPress={() => setClaimQuestsModal(!claimQuestsModal)}
            style={styles.modalView}
        >
            <View style={styles.backCard}>
                <View style={styles.swipeIcon}>
                    <SwipeIcon />
                </View>
                <Text style={styles.title}>About Your Collision</Text>
                <ScrollViewWithFade fadeHeight={15 * ratioY} pageColor="#374151">
                    <View style={styles.spacer}></View>
                    <PrelimQuestsCard
                        text={ques1}
                        marginBottom={10}
                        marginTop={10}
                        quesSelected={ques1Selected}
                        setQuesSelected={setQues1Selected}
                        selectedOption={selectedOption1}
                        setSelectedOption={setSelectedOption1}
                        claimFlow={true}
                    />
                    <PrelimQuestsCard
                        text={ques2}
                        marginBottom={10}
                        marginTop={10}
                        quesSelected={ques2Selected}
                        setQuesSelected={setQues2Selected}
                        selectedOption={selectedOption2}
                        setSelectedOption={setSelectedOption2}
                        claimFlow={true}
                    />
                    <PrelimQuestsCard
                        text={ques3}
                        marginBottom={10}
                        marginTop={10}
                        quesSelected={ques3Selected}
                        setQuesSelected={setQues3Selected}
                        selectedOption={selectedOption3}
                        setSelectedOption={setSelectedOption3}
                        claimFlow={true}
                    />
                    <PrelimQuestsCard
                        text={ques4}
                        marginBottom={10}
                        marginTop={10}
                        quesSelected={ques4Selected}
                        setQuesSelected={setQues4Selected}
                        selectedOption={selectedOption4}
                        setSelectedOption={setSelectedOption4}
                        claimFlow={true}
                    />
                    {ques4Selected &&
                        <PrelimQuestsCard
                            text={ques4i}
                            marginBottom={10}
                            marginTop={10}
                            quesSelected={ques4iSelected}
                            setQuesSelected={setQues4iSelected}
                            selectedOption={selectedOption4i}
                            setSelectedOption={setSelectedOption4i}
                            claimFlow={true}
                        />
                    }
                    {ques4iSelected &&
                        <PrelimQuestsCard
                            text={ques4ii}
                            marginBottom={10}
                            marginTop={10}
                            quesSelected={ques4iiSelected}
                            setQuesSelected={setQues4iiSelected}
                            selectedOption={selectedOption4ii}
                            setSelectedOption={setSelectedOption4ii}
                            claimFlow={true}
                        />
                    }
                    <PrelimQuestsCard
                        text={ques5}
                        marginBottom={10}
                        marginTop={10}
                        quesSelected={ques5Selected}
                        setQuesSelected={setQues5Selected}
                        selectedOption={selectedOption5}
                        setSelectedOption={setSelectedOption5}
                        claimFlow={true}
                    />
                    {ques5Selected &&
                        <PrelimQuestsCard
                            text={ques5i}
                            marginBottom={10}
                            marginTop={10}
                            quesSelected={ques5iSelected}
                            setQuesSelected={setQues5iSelected}
                            selectedOption={selectedOption5i}
                            setSelectedOption={setSelectedOption5i}
                            claimFlow={true}
                        />
                    }
                    {ques5iSelected &&
                        <PrelimQuestsCard
                            text={ques5ii}
                            marginBottom={10}
                            marginTop={10}
                            quesSelected={ques5iiSelected}
                            setQuesSelected={setQues5iiSelected}
                            selectedOption={selectedOption5ii}
                            setSelectedOption={setSelectedOption5ii}
                            claimFlow={true}
                        />
                    }
                    {ques5iSelected &&
                        <PrelimQuestsCard
                            text={quesiii}
                            marginBottom={10}
                            marginTop={10}
                            quesSelected={ques5iiiSelected}
                            setQuesSelected={setQues5iiiSelected}
                            selectedOption={selectedOption5iii}
                            setSelectedOption={setSelectedOption5iii}
                            claimFlow={true}
                        />
                    }
                    <PrelimQuestsCard
                        text={ques6}
                        marginBottom={10}
                        marginTop={10}
                        quesSelected={ques6Selected}
                        setQuesSelected={setQues6Selected}
                        selectedOption={selectedOption6}
                        setSelectedOption={setSelectedOption6}
                        claimFlow={true}
                    />
                    <PrelimQuestsCard
                        text={ques7}
                        marginBottom={10}
                        marginTop={10}
                        quesSelected={ques6Selected}
                        setQuesSelected={setQues7Selected}
                        selectedOption={selectedOption7}
                        setSelectedOption={setSelectedOption7}
                        claimFlow={true}
                    />
                    <PrelimQuestsCard
                        text={ques8}
                        marginBottom={10}
                        marginTop={10}
                        quesSelected={ques8Selected}
                        setQuesSelected={setQues8Selected}
                        selectedOption={selectedOption8}
                        setSelectedOption={setSelectedOption8}
                        claimFlow={true}
                    />
                    <PrelimQuestsCard
                        text={ques9}
                        marginBottom={10}
                        marginTop={10}
                        quesSelected={ques9Selected}
                        setQuesSelected={setQues9Selected}
                        selectedOption={selectedOption9}
                        setSelectedOption={setSelectedOption9}
                        claimFlow={true}
                    />
                    <View style={styles.spacer}></View>
                </ScrollViewWithFade>
                <View style={styles.line}></View>
                <View style={styles.footer}>
                    <Pressable onPress={onBackPress}>
                        <Size1
                            text="Back"
                            width={112 * ratioX}
                            activeColor="#6B7280"
                        />
                    </Pressable>
                    <Pressable onPress={handleContinuePressed}>
                        <ContinueWithAnimation
                            disabled={!allQuesSelected}
                            pressed={continuePressed}
                            prelim={true}
                            width={214 * ratioY}
                            btnHeight={48 * ratioY}
                        />
                    </Pressable>
                </View>
            </View>

        </Modal>
    )
}

export default ClaimQuestsModal;