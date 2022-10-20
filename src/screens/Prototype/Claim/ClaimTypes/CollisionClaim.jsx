import React, { useContext, useState, useEffect } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
} from "react-native";
import UserContext from "../../../../context/context";

import AppLayout from "../../../../components/layouts/AppLayout";
import ClaimHeader from "../../../../components/Claims/Claim/ClaimHeader";
import ClaimFooter from "../../../../components/Claims/Claim/ClaimFooter";

import ExitClaim from "../../../../components/modals/claims/ExitClaim";
import { StackActions } from "@react-navigation/native";

import AccidentDetails from "./CollisionSteps/AccidentDetails";
import AboutFilingClaimModal from "../../../../components/modals/claims/AboutFilingClaim";
import SaveClaimPopUp from "../../../../components/modals/claims/SaveClaimPopUp";
import DriverDetails from "./CollisionSteps/DriverDetails";
import PassengerDetails from "./CollisionSteps/PassengerDetails/PassengerDetails";


const CollisionClaim = ({ route, navigation }) => {
    const popAction = StackActions.pop(2);
    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    // const { policy, benefits: benefitsOptions, vehicleIdentity, prevPremium } = route.params;
    const { vehicleIdentity } = route.params;
    // const { policy_id, policy_prefix, tax_percent, currency, risks, limits } = policy;

    const [page, setPage] = useState(0);
    const [cancelModal, setCancelModal] = useState(false);
    const [showAboutModal, setshowAboutModal] = useState(false);
    const [saveClaimPopup, setSaveClaimPopup] = useState(false);

    const styles = StyleSheet.create({
        page: {
            backgroundColor: "#1F2937",
            flex: 1,
            paddingTop: 30 * ratioY,
            justifyContent: "space-between",
            paddingBottom: 32 * ratioY,
        },
        footer: {
            paddingHorizontal: 24 * ratioX
        },
    });

    useEffect(() => {
        setshowAboutModal(true)
    }, []);

    const showCancelModal = () => {
        setCancelModal(true);
        console.log("Exit Claim Pressed!")
    }

    const exitClaim = () => {
        navigation.goBack();
    }

    const savedata = () => {
        console.log('first - 1')
        setCancelModal(false);
        setSaveClaimPopup(true);
    }

    const getNextButtonText = (page) => {
        if (page !== 10) {
            return 'Next'
        } else {
            return "Review Claim"
        }
    }

    const onBackButtonPress = (page) => {
        if (page !== 0) {
            setPage(page - 1)
        } else {
            console.log("Back Pressed!")
            showCancelModal()
        }
    }

    const onNextButtonPress = (page) => {
        if (page === 10) {
            console.log("Navigate to the Review Sceen")
        } else {
            setPage(page + 1)
        }
    }

    return (
        <AppLayout>
            <View style={styles.page}>
                <ClaimHeader
                    vehicleIdentity={vehicleIdentity}
                    handleCancelPress={showCancelModal}
                    page={page}
                    steps={true}
                    heading="Collision Claim"
                />


                <DriverDetails params={route.params.selectedOption1} />
            
                {/* <AccidentDetails/> */}

                {/* <PassengerDetails/> */}
                
                <View style={styles.footer}>
                    <ClaimFooter
                        onBackPress={() => onBackButtonPress(page)}
                        nextButtonText={getNextButtonText(page)}
                        onNextButtonPress={() => onNextButtonPress(page)}
                    />
                </View>
                <ExitClaim
                    visible={cancelModal}
                    setVisible={setCancelModal}
                    exitWithoutSaving={exitClaim}
                    saveAndExit={savedata}
                />
                <SaveClaimPopUp
                    visible={saveClaimPopup}
                    setVisible={setSaveClaimPopup}
                />
            </View>

            <AboutFilingClaimModal
                visible={showAboutModal}
                setVisible={setshowAboutModal}
            />
        </AppLayout>
    )
}

export default CollisionClaim;
