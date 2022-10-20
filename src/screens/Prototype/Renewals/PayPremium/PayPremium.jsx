import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import Header from '../../../../components/renewals/PayPremium/PayPremiumHeader';
import UserContext from '../../../../context/context';
import AppLayout from '../../../../components/layouts/AppLayout';
import SelectPaymentMethod from '../RenewPolicy/Steps/SelectPaymentMethod';
import SelectPaymentTerms from './Steps/SelectPaymentTerms';
import ShortCancelModal from '../../../../components/modals/general/BlankCancelModal';
import { getAccess } from '../../../../../store/v2/slices/session';
import { getPaymentPlanOptions, getPolicyPaymentPlan } from '../../../../../network/payments';
import { useHandleTopLevelAxiosError } from '../../../../lib/utils/hooks/error handling';
import RenewalPolicyFooter from '../../../../components/renewals/RenewPolicy/RenewPolicyFooterV2';

const PayPremium = ({ route, navigation }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    // const samplePaymentTerms = [
    //     {
    //         "payment_number": 1,
    //         "effective_date": "02/23/2022",
    //         "expiry_date": "03/23/2022",
    //         "period_covered": 1,
    //         "annual_premium_rate": 25,
    //         "annual_premium_rate_type": "PP",
    //         "service_charge_amount": 6,
    //         "service_charge_type": "PP",
    //         "percentage_of_premium_charge_applied_to": 100,
    //         "late_threshold": 0,
    //         "payment_term_premium": 13090.49,
    //         "payment_term_premium_with_tax": 15054.06,
    //         "penalty_fee_amount": 0,
    //         "penalty_fee_type": "VA",
    //         "on_time_action": "Full Premium Full Period",
    //         "late_action": "Full Premium Full Period Penalty",
    //         "title_for_certificate": "1 of 4",
    //         "transaction_id": ""
    //     },
    //     {
    //         "payment_number": 2,
    //         "effective_date": "03/23/2022",
    //         "expiry_date": "04/23/2022",
    //         "period_covered": 1,
    //         "annual_premium_rate": 25,
    //         "annual_premium_rate_type": "PP",
    //         "service_charge_amount": 0,
    //         "service_charge_type": "PP",
    //         "percentage_of_premium_charge_applied_to": 0,
    //         "late_threshold": 5,
    //         "payment_term_premium": 10556.85,
    //         "payment_term_premium_with_tax": 12140.38,
    //         "penalty_fee_amount": 1000,
    //         "penalty_fee_type": "VA",
    //         "on_time_action": "Full Premium Full Period",
    //         "late_action": "Prorated Premium Partial Period Penalty",
    //         "title_for_certificate": "2 of 4",
    //         "transaction_id": ""
    //     },
    //     {
    //         "payment_number": 3,
    //         "effective_date": "04/23/2022",
    //         "expiry_date": "05/23/2022",
    //         "period_covered": 1,
    //         "annual_premium_rate": 25,
    //         "annual_premium_rate_type": "PP",
    //         "service_charge_amount": 0,
    //         "service_charge_type": "PP",
    //         "percentage_of_premium_charge_applied_to": 0,
    //         "late_threshold": 5,
    //         "payment_term_premium": 10556.85,
    //         "payment_term_premium_with_tax": 12140.38,
    //         "penalty_fee_amount": 1000,
    //         "penalty_fee_type": "VA",
    //         "on_time_action": "Full Premium Full Period",
    //         "late_action": "Prorated Premium Partial Period Penalty",
    //         "title_for_certificate": "3 of 4",
    //         "transaction_id": ""
    //     },
    //     {
    //         "payment_number": 4,
    //         "effective_date": "05/23/2022",
    //         "expiry_date": "02/23/2023",
    //         "period_covered": 9,
    //         "annual_premium_rate": 25,
    //         "annual_premium_rate_type": "PP",
    //         "service_charge_amount": 0,
    //         "service_charge_type": "PP",
    //         "percentage_of_premium_charge_applied_to": 0,
    //         "late_threshold": 5,
    //         "payment_term_premium": 10556.85,
    //         "payment_term_premium_with_tax": 12140.38,
    //         "penalty_fee_amount": 1000,
    //         "penalty_fee_type": "VA",
    //         "on_time_action": "Full Premium Full Period",
    //         "late_action": "Prorated Premium Partial Period Penalty",
    //         "title_for_certificate": "4 of 4",
    //         "transaction_id": ""
    //     }
    // ]

    const { policy, premiumData, benefitsOptions, vehicleIdentity, prevPremium } = route.params;
    console.log("Data: ", premiumData)
    const [page, setPage] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(undefined);
    const [selectedTerms, setSelectedTerms] = useState([]);
    const [cancelRenewalModal, setCancelRenewalModal] = useState(false);
    const [paymentTerms, setPaymentTerms] = useState(premiumData);

    // const [chosenBenefits, setChosenBenefits] = useState([]);
    // const [chosenPaymentPlan, setChosenPaymentPlan] = useState(undefined);
    const [paymentScheduleOptions, setPaymentScheduleOptions] = useState(undefined);
    const [billingAddress, setBillingAddress] = useState(undefined);
    const [fullPaymentType, setFullPaymentType] = useState(false);
    const [termsLength, setTermsLength] = useState(0);

    const accessToken = useSelector(getAccess);

    const handleTopLevelAxiosError = useHandleTopLevelAxiosError()

    const { policy_id, policy_prefix, tax_percent, currency, risks, limits } = policy;

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
            width: 2 * width,
            flexDirection: "row",
            paddingVertical: 24 * ratioY,
            justifyContent: "space-around",
        },
        content: {
            height: "100%",
            width: width - 48 * ratioX,
        },
        footer: {
            paddingHorizontal: 24 * ratioX,
            marginTop: 18 * ratioY,
            width: "100%",
        }
    })



    /** Transition to the next page in the carousel */
    useEffect(() => {
        if (page == 0) {
            carouselSV.value = withTiming(0);
        } else if (page == 1) {
            carouselSV.value = withTiming(width);
        }
        getPaymentPlan();
        // getPlanOptions();
    }, [page])

    const getPaymentPlan = () => {
        getPolicyPaymentPlan(policy_id)
            .then(res => {
                console.log("Success: ", res);
                setPaymentTerms(res.data?.policy_payment_plan?.payment_terms);
                setTermsLength(res.data?.policy_payment_plan?.payment_terms.length);
            })
            .catch(err => console.log("Error: ", err))
    }

    const getPlanOptions = async () => {
        const paymentOptionsPayload = {
            policy_id,
            policy_prefix,
            tax_percent,
            currency,
            risks,
            limits,
            extensions: ''
            // extensions
        }


        let response = await getPaymentPlanOptions(accessToken, paymentOptionsPayload).catch(err => {
            handleTopLevelAxiosError(err, getPlanOptions)
        });
        if (response.success == false) {
            console.error(response.error_message)
        } else {
            setPaymentScheduleOptions(response);
        }
    }

    const cancelRenewal = () => {
        navigation.goBack()
    }

    const showCancelModal = () => {
        setCancelRenewalModal(true);
    }

    // const getRightButtonText = () => {
    //     return "Save & Continue"
    // }

    const isNextButtonEnabled = (page) => {
        if (page == 0) return true;
        if (page == 1) {
            if (paymentMethod && billingAddress) {
                return true
            } else {
                return false
            }
        }
    }

    const getNextButtonText = (page) => {
        if (page == 0) return "Next"
        if (page == 1) return "Save & Continue"
    }

    const onBackButtonPress = (page) => {
        if (page !== 0) {
            setPage(page - 1)
        } else {
            showCancelModal()
        }
    }

    const onNextButtonPress = (page) => {
        if (page == 0) setPage(1)
        if (page == 1) {
            navigation.navigate("PayBalance", {
                policy,
                chosenPaymentPlan: {
                    renewal_premium_with_gct: selectedTerms[0].payment_term_premium_with_tax,
                    payment_number: selectedTerms[0].payment_number,
                    payment_terms_number: termsLength,
                    payment_term_premium: selectedTerms[0].payment_term_premium

                },
                premiumData,
                prevPremium,
                paymentMethod,
                billingAddress,
                fullPaymentType,
                selectedTerms,
                premiumData
            })
        }
    }



    return (
        <AppLayout>
            <View style={styles.page}>
                <Header handleCancelPress={showCancelModal} page={page} steps={true} heading="Pay Premium" />
                {console.log("Selected Terms: ", selectedTerms)}
                {console.log("Payment Schedule: ", paymentScheduleOptions)}
                <Animated.View style={[styles.carousel, carouselStyles]}>
                    <View style={styles.content}>
                        <SelectPaymentTerms
                            page={page}
                            setPage={setPage}
                            paymentTerms={premiumData}
                            selectedTerms={selectedTerms}
                            setSelectedTerms={setSelectedTerms}
                            showCancelModal={showCancelModal}
                        />
                    </View>
                    {/* <View style={styles.content}>
                        <SelectPaymentSchedule
                            schedule={chosenPaymentPlan}
                            setSchedule={setChosenPaymentPlan}
                            paymentScheduleOptions={premiumData}
                            setFullPaymentType={setFullPaymentType}
                        />
                    </View> */}
                    <View style={styles.content}>
                        <SelectPaymentMethod
                            setPaymentMethodLocal={setPaymentMethod}
                            paymentMethodLocal={paymentMethod}
                            billingAddress={billingAddress}
                            setBillingAddress={setBillingAddress}
                        />
                    </View>
                </Animated.View>

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
                    modalText={"Are you sure you want to cancel paying your premium?"}
                    blueButtonText={"Cancel"}
                    greyButtonText={"Dismiss"}
                />
            </View>
        </AppLayout>
    );
}

export default PayPremium;


