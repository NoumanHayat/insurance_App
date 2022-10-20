import React, { useState, useContext } from 'react';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import { CustomToast } from '../../../../components/toast';
import { View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import TextButton2 from '../../../../components/buttons/TextButton2';
import AppLayout from '../../../../components/layouts/AppLayout';
import RenewPolicyHeader from '../../../../components/renewals/RenewPolicy/RenewPolicyHeader';
import VehicleSummary from '../../../../components/renewals/VehicleSummary';
import ShortCancelModal from '../../../../components/modals/general/BlankCancelModal';
import PaymentFailed from '../../../../components/modals/renewals/PaymentFailed';
import RenewalSummaryV2 from '../../../../components/renewals/RenewalSummaryV2';
import PaymentDue from '../../../../components/card/PaymentDue';


import ScrollViewWithFade from '../../../../components/scrollviews/ScrollViewWithFade';

import UserContext from '../../../../context/context';

import { useNavigation, StackActions } from "@react-navigation/native";
import { agicPayment } from '../../../../../network/payments';
import { useSelector } from 'react-redux';
import { getUser } from '../../../../../store/v2/slices/userNotPersisted';
import { drawReceipt, getTransactionSchedule, getVehicleDocs, policyUpdate } from '../../../../../network/policy';
import { fetchTertiaryToken } from '../../../../lib/my files/getters';
import ContinueWithAnimation from '../../../../components/buttons/ContinueWithAnimation';
import { useDispatch } from 'react-redux';
import { getPolicies, rdxSetPolicies, rdxSetToastNotif } from '../../../../../store/v2/slices/policies';
import { sendEmail } from '../../../../../network/email';


const ConfirmRenewal = ({ route }) => {

    const popAction = StackActions.pop(2);
    const user = useSelector(getUser);
    const policies = useSelector(getPolicies);
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const [cancelRenewalModal, setCancelRenewalModal] = useState(false);
    const [failed, setFailed] = useState(false);
    const [pressed, setPressed] = useState(false);

    const toast = useToast();

    const navigation = useNavigation();

    const benefits = [0];

    const { policy, testBenefits, testPaymentScheduleOptions, chosenPaymentPlan, prevPremium, paymentMethod, fullPaymentType, billingAddress, manual_extension } = route.params;
    const { risks, policy_id, global_names, poca } = policy;
    const vehicleIdentity = `${risks[0].year} ${risks[0].make} ${risks[0].model}`;
    // const { cardNumber } = paymentMethod;

    // console.log("Card Number (CR):" + cardNumber)

    // console.log("CHOSEN (CR): ", chosenPaymentPlan);
    // console.log(`Discount(CR): ${Object.entries(risks[0]?.manual_rates)}`)
    // console.log(`Payment Premium: ${chosenPaymentPlan?.payment_terms[0]?.payment_term_premium_with_tax}`)

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 24 * ratioX,
        },
        continue: {
            color: "#FFFFFF",
            backgroundColor: "#2565BF",
            width: 342 * ratioX,
            height: 48,
            borderRadius: 8,
            fontSize: 30,
            marginBottom: 13 * ratioX,
        },
        body: {
            paddingHorizontal: 24 * ratioX,
            marginBottom: 250 * ratioY,
        },
        vehicleSummary: {
            marginBottom: 24 * ratioX,
        },
        footer: {
            width: "100%",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            paddingBottom: 36 * ratioX,
            paddingTop: 15 * ratioY,
            backgroundColor: "#1F2937",
        },
        paymentDueContainer: {
            marginTop: 24 * ratioX,
        }
    });

    const getBenefits = () => {
        benefits.length = 0;
        testBenefits?.map((benefit) => {
            // setBenefits(benefit?.tier.benefits)
            benefits.push(benefit?.tier.premium)
            console.log("Benefits: ", benefits)
        })
    }

    getBenefits();

    const benefitTotal = benefits.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    const showCancelModal = () => {
        setCancelRenewalModal(true);
    }

    const goBack = () => {
        navigation.goBack();
    }

    const cancelRenewal = () => {
        navigation.dispatch(popAction);
    }

    const showToast = () => {
        console.log("clciked")
        Toast.show({
            type: 'error',
            text1: 'Hello',
            text2: 'This is some something 👋',
            position: "top",
            bottomOffset: 10,
            visibilityTime: 10000
        });
        console.log("here")
    }

    const compareName = (cardHolder) => {
        const full_name = `${user?.first_name} ${user?.last_name}`
        if (full_name.toLowerCase() === cardHolder.toLowerCase()) {
            return true;
        }
    }

    const renewPolicy = async () => {
        if (`${user?.first_name} ${user?.last_name}` != paymentMethod?.cardHolder) {
            // if (user?.first_name != paymentMethod?.cardHolder) {
            setFailed(true);
        } else {
            try {
                setPressed(true)
                console.log('Clicked Renew Policy Button')
                agicPayment({
                    "apiOperation": "PAY",
                    "order": {
                        "amount": (chosenPaymentPlan.renewal_premium_with_gct + benefitTotal + prevPremium).toFixed(2),
                        "currency": "JMD",
                        "reference": "InvoiceNumber12890"
                    },
                    "customer": {
                        "firstName": user?.first_name,
                        "lastName": user?.last_name
                    },
                    "sourceOfFunds": {
                        "provided": {
                            "card": {
                                "number": cardNumber,
                                "securityCode": paymentMethod?.cvv,
                                "expiry": {
                                    "month": moment(paymentMethod?.expiryDate).format('MM'),
                                    "year": moment(paymentMethod?.expiryDate).format('YY')
                                }
                            }
                        },
                        "type": "CARD"
                    },
                    "transaction": {},
                    "other": {
                        "policyNumber": policy?.policy_number,
                        "billingAddress": billingAddress?.addressLine1,
                        "purpose": "renewal"
                    }
                }).then(async (res) => {

                    drawReceipt([{
                        auto_authorize: true,
                        branch: 'AGIC Online',
                        receipt_date: moment(new Date().toString()).format("MM/DD/YYYY"),
                        policy_id,
                        amount: chosenPaymentPlan.renewal_premium_with_gct + benefitTotal + prevPremium,
                        payment_type: "Advantage General On-line",
                        currency: 'JA',
                        is_tax_exempt: false
                    }]).then(res => {
                        setPressed(false)
                        navigation.navigate("SuccessfulPayment", {
                            receipt_number: res?.Sucess[0]?.receipt_number,
                            toastNotif: true
                        });
                        console.log("Receipt: ", res);

                        policyUpdate(policy_id, risks, manual_extension)
                            .then((res) => {
                                console.log("Payment Plan: ", res.data);
                                // dispatch(rdxSetToastNotif(true))
                                // failedAPI = { policyUpdate: true, schedule: true}


                                if (res.data.policy_id) {
                                    toast.show("Congrats! Your policy has been updated. You are offically covered. Have a great day!",
                                        { data: "Policy Updated", type: "success_type" },
                                    );
                                    getTransactionSchedule(res?.data.transaction_id)

                                    // console.log("Transaction data: ", res?.data)
                                    getVehicleDocs(poca, policy)
                                        .then(res => console.log("Vehicle docs: ", res.data))
                                        .catch(err => console.log(err))
                                } else {
                                    toast.show("Sorry about that! Your policy failed to update, please contact AGIC to update your policy.",
                                        { data: "Policy Update Failed", type: "error_type" },
                                    );
                                    sendEmail({
                                        to: 'akeim.sutherland@smsja.net',
                                        subject: 'Failed API',
                                        message: 'Policy Update and Renew endpoint failed'
                                    })
                                }


                            }).catch((err) => {
                                console.log(err)
                            })
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            } catch (error) {
                setFailed(true);
                console.log('Payment failed: ', error);
            }
        }
    }

    const cardNumber = paymentMethod?.cardNumber;

    const getCardType = (cardNumber) => {
        let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
        let mastercard = new RegExp('^5[1-5][0-9]{14}$');
        let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');

        if (visa.test(cardNumber)) {
            return 'Visa';
        }
        if (mastercard.test(cardNumber) || mastercard2.test(cardNumber)) {
            return 'Mastercard';
        }
    }



    const cardTypeCheck = getCardType(cardNumber);
    const cardType = typeof cardTypeCheck === 'string' ? cardTypeCheck : ""
    const cardLastFourDigits = cardNumber?.slice(12);
    const cardLastFourDigitsCheck = typeof cardLastFourDigits === 'string' ? cardLastFourDigits : '**';

    // console.log("billing: " + billingAddress?.addressLine1)
    // console.log("paymentMethod: " + paymentMethod?.cardNumber)

    return (
        <AppLayout>
            <View style={styles.container}>
                <RenewPolicyHeader
                    handleCancelPress={showCancelModal}
                    heading="Confirm Renewal"
                    vehicleIdentity={vehicleIdentity}
                />
                <ScrollViewWithFade fadeHeight={15 * ratioY} pageColor="#1F2937">
                    <View style={styles.body}>
                        <View style={styles.vehicleSummary}>
                            <VehicleSummary policy={policy} />
                        </View>
                        <RenewalSummaryV2
                            chosenBenefits={testBenefits}
                            paymentScheduleOptions={testPaymentScheduleOptions}
                            // cardNumber={cardNumber}
                            paymentMethod={paymentMethod}
                            chosenPaymentPlan={chosenPaymentPlan}
                            prevPremium={prevPremium}
                            risks={risks}
                            fullPaymentType={fullPaymentType}
                            cardType={cardType}
                            cardLastFourDigitsCheck={cardLastFourDigitsCheck}
                        />
                        <View style={styles.paymentDueContainer}>
                            <PaymentDue paymentDue={fullPaymentType ? chosenPaymentPlan?.renewal_premium_with_gct : chosenPaymentPlan?.payment_terms[0]?.payment_term_premium_with_tax} />
                        </View>
                    </View>
                </ScrollViewWithFade>

                <View style={styles.footer}>
                    {/* <Pressable onPress={renewPolicy}>
                        <TextButton2
                            text="Renew Policy"
                            textColor="#FFFFFF"
                            backgroundColor="#2565BF"
                            width={342 * ratioX}
                            height={48}
                            borderRadius={8}
                            fontSize={20}
                            marginBottom={13 * ratioX}
                        />
                    </Pressable> */}
                    <Pressable
                        // disabled={!isAllDataEntered}
                        style={styles.continue}
                        onPress={renewPolicy}>
                        <ContinueWithAnimation
                            text="Renew Policy"
                            // disabled={!isAllDataEntered}
                            pressed={pressed}
                        />
                    </Pressable>
                    <Pressable onPress={goBack}>
                        <TextButton2
                            text="Go Back"
                            textColor="#FFFFFF"
                            backgroundColor="#6B7280"
                            width={342 * ratioX}
                            height={48}
                            borderRadius={8}
                            fontSize={20}
                        />
                    </Pressable>
                </View>
                <PaymentFailed
                    isVisible={failed}
                    onPress={goBack}
                    onBackdropPress={() => setFailed(false)}
                />

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
    )
}

export default ConfirmRenewal;
