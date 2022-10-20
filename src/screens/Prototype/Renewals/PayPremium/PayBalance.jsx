import React, { useState, useContext } from 'react';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import { View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
// import TextButton1 from '../../../../components/buttons/TextButton1';
import TextButton2 from '../../../../components/buttons/TextButton2';
import AppLayout from '../../../../components/layouts/AppLayout';
import RenewPolicyHeader from '../../../../components/renewals/RenewPolicy/RenewPolicyHeader';
import VehicleSummary from '../../../../components/renewals/VehicleSummary';
import ShortCancelModal from '../../../../components/modals/general/BlankCancelModal';
import PaymentFailed from '../../../../components/modals/renewals/PaymentFailed';

import ScrollViewWithFade from '../../../../components/scrollviews/ScrollViewWithFade';

import UserContext from '../../../../context/context';

import { useNavigation, StackActions } from "@react-navigation/native";
import { agicPayment } from '../../../../../network/payments';
import { useSelector } from 'react-redux';
import { getUser } from '../../../../../store/v2/slices/userNotPersisted';
import { addPaymentPlan, drawReceipt, getTransactionSchedule, getVehicleDocs } from '../../../../../network/policy';
import { fetchTertiaryToken } from '../../../../lib/my files/getters';
import PayPremiumSummaryV2 from '../../../../components/renewals/PayPremium/PayPremiumSummaryV2';
import PaymentDue from '../../../../components/card/PaymentDue';
import ContinueWithAnimation from '../../../../components/buttons/ContinueWithAnimation';

const PayBalance = ({ route }) => {

    const popAction = StackActions.pop(2);
    const user = useSelector(getUser);

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const [cancelRenewalModal, setCancelRenewalModal] = useState(false);
    const [failed, setFailed] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [paymentTerms, setPaymentTerms] = useState([0]);

    const navigation = useNavigation();

    // const benefits = [0];

    const toast = useToast();
    const { policy, chosenPaymentPlan, paymentMethod, fullPaymentType, billingAddress, selectedTerms, premiumData } = route.params;

    const { risks, policy_id, poca } = policy;
    const vehicleIdentity = `${risks[0].year} ${risks[0].make} ${risks[0].model}`;
    const { cardNumber } = paymentMethod;

    // console.log("Card Number (CR):" + cardNumber)

    // console.log("Chosen 2: ", chosenPaymentPlan);
    // console.log(`Discount(CR): ${Object.entries(risks[0]?.manual_rates)}`)

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
            marginBottom: 16 * ratioX,
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

    const showCancelModal = () => {
        setCancelRenewalModal(true);
    }

    const goBack = () => {
        navigation.goBack();
    }

    const cancelRenewal = () => {
        navigation.dispatch(popAction);
    }


    const payBalance = async () => {
        if (`${user?.first_name} ${user?.last_name}` != paymentMethod?.cardHolder) {
            setFailed(true);
        } else {
            try {
                setPressed(true)
                console.log('Clicked Pay balance Button')
                agicPayment({
                    "apiOperation": "PAY",
                    "order": {
                        "amount": (chosenPaymentPlan.renewal_premium_with_gct).toFixed(2),
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
                    console.log("Payment: ", res)
                    drawReceipt(
                        [{
                            auto_authorize: true,
                            branch: 'AGIC Online',
                            receipt_date: moment(new Date().toString()).format("MM/DD/YYYY"),
                            policy_id,
                            amount: chosenPaymentPlan.renewal_premium_with_gct,
                            payment_type: "Advantage General On-line",
                            currency: 'JA',
                            is_tax_exempt: false
                        }]
                    ).then(res => {
                        console.log("Receipt: ", res);
                        setPressed(false)
                        navigation.navigate("SuccessfulPremiumPayment", {
                            paymentTerms: premiumData,
                            nextPayment: 9500,
                            policy: policy_id,
                            receipt_number: res?.Sucess[0]?.receipt_number,
                            payment_number: chosenPaymentPlan.payment_number,
                            payment_terms_number: chosenPaymentPlan.payment_terms_number
                        });
                        addPaymentPlan(policy_id, chosenPaymentPlan.renewal_premium)
                        .then((res) => {
                            toast.show("Congrats! Your payment plan has been updated. Have a great day!",
                            { data: "Payment Plan Updated", type: "success_type" },
                        );
                            console.log("Payment Plan",res.data);
                            getTransactionSchedule(res.data.transaction_id)
                            .then(res => {
                                getVehicleDocs(poca, policy)
                                .then(res => console.log("Vehicle docs: ", res))
                                .catch(err => console.log(err))
                            }).catch(err => console.log(err))
                        }).catch((err) => {
                            toast.show("Sorry about that! Your payment plan failed to update, please contact AGIC to update your payment plan.",
                            { data: "Payment Update Failed", type: "error_type" },
                        );
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

    // const cardNumber = paymentMethod?.cardNumber;

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

    const getPaymentTerms = () => {
        paymentTerms.length = 0;
        selectedTerms?.map((paymentTerm) => {
            paymentTerms.push(paymentTerm?.payment_term_premium)
        })
    }

    getPaymentTerms();

    const getPaymentDue = paymentTerms.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    // console.log(`PAYMENT DUE: ${getPaymentDue}`)

    const cardTypeCheck = getCardType(cardNumber);
    const cardType = typeof cardTypeCheck === 'string' ? cardTypeCheck : ""
    const cardLastFourDigits = cardNumber?.slice(12);
    const cardLastFourDigitsCheck = typeof cardLastFourDigits === 'string' ? cardLastFourDigits : '**';

    return (
        <AppLayout>
            <View style={styles.container}>
                <RenewPolicyHeader
                    handleCancelPress={showCancelModal}
                    heading="Confirm Payment"
                    vehicleIdentity={vehicleIdentity}
                />
                <ScrollViewWithFade fadeHeight={15 * ratioY} pageColor="#1F2937">
                    <View style={styles.body}>
                        <View style={styles.vehicleSummary}>
                            <VehicleSummary policy={policy} />
                        </View>
                        <PayPremiumSummaryV2
                            paymentMethod={paymentMethod}
                            chosenPaymentPlan={chosenPaymentPlan}
                            risks={risks}
                            fullPaymentType={fullPaymentType}
                            cardType={cardType}
                            cardLastFourDigitsCheck={cardLastFourDigitsCheck}
                            selectedTerms={selectedTerms}
                            premiumData={premiumData}
                        />
                        <View style={styles.paymentDueContainer}>
                            <PaymentDue paymentDue={getPaymentDue} />
                        </View>
                    </View>
                </ScrollViewWithFade>

                <View style={styles.footer}>
                    <Pressable
                        // disabled={!isAllDataEntered}
                        style={styles.continue}
                        onPress={payBalance}>
                        <ContinueWithAnimation
                            text="Pay Balance"
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

export default PayBalance;
