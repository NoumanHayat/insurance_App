import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

import UserContext from "../../../../context/context"
import RenewPolicyHeader from '../../../../components/renewals/RenewPolicy/RenewPolicyHeader';
import AppLayout from '../../../../components/layouts/AppLayout';
import AddBenefits from './Steps/AddBenefits';

import SelectPaymentSchedule from "./Steps/SelectPaymentSchedule";
import SelectPaymentMethod from './Steps/SelectPaymentMethod';
import ShortCancelModal from '../../../../components/modals/general/BlankCancelModal';

import { getPaymentPlanOptions } from '../../../../../network/payments';
import { getAccess } from "../../../../../store/v2/slices/session"

// For testing only
// import testDataVerify from "../../../../../dont_upload/test-data-verify";
// import testBenefits from '../../../../../dont_upload/testBenefits';
// import testBenefits from '../../../../sample-data/testBenefitsV2.json'
// import testPaymentScheduleOptions from '../../../../sample-data/payment-schedule.json'
import RenewalPolicyFooter from '../../../../components/renewals/RenewPolicy/RenewPolicyFooterV2';
import { useHandleTopLevelAxiosError } from '../../../../lib/utils/hooks/error handling';

const RenewPolicy = ({ route, navigation }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const handleTopLevelAxiosError = useHandleTopLevelAxiosError()

    // For testing only
    // const { policies } = testDataVerify;
    // const policy = policies[0];
    // const { benefits: benefitsOptions } = testBenefits;

    const { policy, benefits: benefitsOptions, vehicleIdentity, prevPremium } = route.params;
    const { policy_id, policy_prefix, tax_percent, currency, risks, limits } = policy;

    // eslint-disable-next-line
    const userToken = useSelector(getAccess)
    
    const [page, setPage] = useState(0);
    const [chosenBenefits, setChosenBenefits] = useState([]);
    const [chosenPaymentPlan, setChosenPaymentPlan] = useState(undefined);
    const [paymentScheduleOptions, setPaymentScheduleOptions] = useState(undefined);
    const [paymentMethod, setPaymentMethod] = useState({});
    const [billingAddress, setBillingAddress] = useState(undefined);
    const [cancelRenewalModal, setCancelRenewalModal] = useState(false);
    const [fullPaymentType, setFullPaymentType] = useState(false);

    const extensions = chosenBenefits.filter(Boolean).map(benefit => {
        const result = benefit?.tier?.manual_extension?.map(extension => {
            if (extension) {
                return {
                    "extension_code": extension.extension_code,
                    "limit_amount": extension.limit
                }
            }
        })
        return result[0];
    })

    const carouselSV = useSharedValue(0);
    const carouselStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: -carouselSV.value }
            ]
        }
    })

    const styles = StyleSheet.create({
        page: {
            backgroundColor: "#1F2937",
            flex: 1,
            paddingTop: 30 * ratioY,
            justifyContent: "space-between",
            paddingBottom: 32 * ratioY,
        },
        carousel: {
            flex: 1,
            width: 3 * width,
            flexDirection: "row",
            paddingTop: 24 * ratioY,
            paddingBottom: 20 * ratioY,
            justifyContent: "space-around",
        },
        content: {
            height: "100%",
            width: width - 48 * ratioX,
        },
        footer: {
            paddingHorizontal: 24 * ratioX
        },
        // line: {
        //     position: "absolute",
        //     width: "100%",
        //     borderWidth: 0.5,
        //     borderColor: "#4B5563",
        //     marginTop: 670,
        // }
    })

    /** Transition to the next page in the carousel */
    useEffect(() => {
        if (page == 0) {
            carouselSV.value = withTiming(0);
        } else if (page == 1) {
            carouselSV.value = withTiming(width);
        } else if (page == 2) {
            carouselSV.value = withTiming(2 * width);
        }
    }, [page, carouselSV, width])

    const getPlanOptions = async () => {
        const paymentOptionsPayload = {
            policy_id,
            policy_prefix,
            tax_percent,
            currency,
            risks,
            limits,
            extensions
        }


        let response = await getPaymentPlanOptions(userToken, paymentOptionsPayload).catch(err => {
            handleTopLevelAxiosError(err, getPlanOptions)
        });
        if (response.success == false) {
            console.error(response.error_message)
        } else {
            setPaymentScheduleOptions(response);
        }
    }

    const showCancelModal = () => {
        setCancelRenewalModal(true);
    }

    const cancelRenewal = () => {
        navigation.goBack()
    }

    const isNextButtonEnabled = (page) => {
        if (page == 0) return true;
        if (page == 1) {
            if (chosenPaymentPlan) {
                return true
            } else {
                return false
            }
        }
        if (page == 2) {
            if (paymentMethod && billingAddress) {
            return true
            } else {
            return false
            }
        }
    }

    const getNextButtonText = (page) => {
        if (page == 0) {
            if (chosenBenefits.length == 0) {
                return 'Skip'
            } else {
                return 'Next'
            }
        }
        if (page == 1) return "Next"
        if (page == 2) return "Save & Continue"
    }

    const onBackButtonPress = (page) => {
        if (page !== 0) {
            setPage(page - 1)
        } else {
            showCancelModal()
        }
    }

    const onNextButtonPress = (page) => {
        if (page == 0) getPlanOptions().then(() => setPage(1)).catch(console.error)
        if (page == 1) setPage(2)
        if (page == 2) {
            navigation.navigate("ConfirmRenewal", {
                policy,
                testBenefits: chosenBenefits,
                testPaymentScheduleOptions: paymentScheduleOptions,
                chosenPaymentPlan,
                prevPremium,
                paymentMethod,
                billingAddress,
                fullPaymentType,
                manual_extension: extensions
            })
        }
    }

    return (
        <AppLayout>
            <View style={styles.page}>
                <RenewPolicyHeader
                    vehicleIdentity={vehicleIdentity}
                    handleCancelPress={showCancelModal}
                    page={page}
                    steps={true}
                    heading="Renew Policy"
                />
                <Animated.View style={[styles.carousel, carouselStyles]}>
                    <View style={styles.content}>
                        <AddBenefits
                            chosenBenefits={chosenBenefits}
                            setChosenBenefits={setChosenBenefits}
                            benefitsOptions={benefitsOptions}
                            pageColour={styles.page.backgroundColor}
                        />
                    </View>
                    <View style={styles.content}>
                        <SelectPaymentSchedule
                            schedule={chosenPaymentPlan}
                            setSchedule={setChosenPaymentPlan}
                            paymentScheduleOptions={paymentScheduleOptions}
                            setFullPaymentType={setFullPaymentType}
                        />
                    </View>
                    <View style={styles.content}>
                        <SelectPaymentMethod
                        setPaymentMethodLocal={setPaymentMethod}
                        paymentMethodLocal={paymentMethod}
                        billingAddress={billingAddress}
                        setBillingAddress={setBillingAddress}
                        />
                    </View>
                </Animated.View>

                {/* <View style={styles.line}></View> */}

                <View style={styles.footer}>
                    <RenewalPolicyFooter
                        onBackPress={() => onBackButtonPress(page)}
                        nextButtonText={getNextButtonText(page)}
                        onNextButtonPress={() => onNextButtonPress(page)}
                        isNextButtonEnabled={isNextButtonEnabled(page)}
                    />
                </View>

                <ShortCancelModal
                    visible={cancelRenewalModal}
                    setVisible={setCancelRenewalModal}
                    cancelRenewal={cancelRenewal}
                    modalText={"Are you sure you want to cancel renewing your policy?"}
                    blueButtonText={"Cancel Renewal"}
                    greyButtonText={"Dismiss"}
                />
            </View>
        </AppLayout>
    );
}

export default RenewPolicy;
