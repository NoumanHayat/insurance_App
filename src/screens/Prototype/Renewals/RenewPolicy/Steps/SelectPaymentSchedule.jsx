import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';

import UserContext from '../../../../../context/context';
import PaymentPlanOption from '../../../../../components/renewals/PaymentPlanOption';

import testPaymentPlans from "../../../../../sample-data/full-payment.json";
import ScrollViewWithFade from '../../../../../components/scrollviews/ScrollViewWithFade';

const SelectPaymentSchedule = ({ setSchedule, paymentScheduleOptions, setFullPaymentType }) => {

    const { width, height } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    // eslint-disable-next-line
    const ratioY = height / modelY;

    let full_payment;
    let payment_plans;

    if (paymentScheduleOptions) {
        ({ full_payment, payment_plans } = paymentScheduleOptions);
    } 
    else {
        // For testing only
        ({ full_payment, payment_plans } = testPaymentPlans);
    }

    const paymentPlansCopy = [...payment_plans];
    const reversedPlans = paymentPlansCopy.reverse();
    const allPaymentSchedules = [...reversedPlans, full_payment]

    const defaultStates = Array.from({ length: allPaymentSchedules.length }, () => false);

    const [optionIndex, setOptionIndex] = useState(undefined);
    const [optionsStates, setOptionsStates] = useState(defaultStates);

    const styles = StyleSheet.create({
        scrollview: {
            height: "90%",
            justifyContent: "flex-start"
        },
        modalView: {
            justifyContent: "flex-end",
        },
        partItem: {
            flexDirection: "row",
            marginVertical: 10,
        },
        radioButton: {
            alignSelf: "center",
            marginRight: 7 * ratioX,
        },
    });

    useEffect(() => {
        setPaymentSchedule();
    }, [optionsStates])

    const handleOptionPress = (index) => {
        setOptionIndex(index)
        setOptionsStates(states => {
            const newStates = [...states];
            const myNewState = !newStates[index];
            newStates.fill(false);
            newStates[index] = myNewState;
            return newStates;
        })
    }

    const setPaymentSchedule = () => {
        const selectedSchedule = allPaymentSchedules[optionIndex];
        if (selectedSchedule) {
            const numOfKeys = Object.keys(selectedSchedule).length
            if (numOfKeys === 3) {
                setFullPaymentType(true)
            }

            // console.log(`Selected Schedule SelectPaymentSchedule): ${Object.entries(selectedSchedule)}`)
            // console.log(`Selected Schedule Keys (SelectPaymentSchedule): ${Object.keys(selectedSchedule)}`)
            // console.log(`Selected Schedule Keys (SelectPaymentSchedule): ${numOfKeys}`)
            // console.log(">>>> ", Object.keys(selectedSchedule?.payment_terms), " <<<<<")
        }
        if (optionsStates[optionIndex]) {
            setSchedule(selectedSchedule)
        } else {
            setSchedule(undefined);
        }
    }

    return (
        <View style={styles.scrollview}>
            <ScrollViewWithFade fadeHeight={15 * ratioY} pageColor="#1F2937">
                {allPaymentSchedules && allPaymentSchedules.map((plan, index) => {
                    if (plan.payment_terms) {
                        const paymentTerms = plan.payment_terms;
                        const numberOfParts = plan.payment_terms.length;
                        const firstPayment = plan.payment_terms[0].payment_term_premium_with_tax;
                        const secondPayment = plan.payment_terms[1].payment_term_premium_with_tax;
                        const scheduledDate = paymentTerms.map((item) => item.expiry_date);

                        return (
                            <Pressable key={index} onPress={() => handleOptionPress(index)}>
                                <PaymentPlanOption
                                    active={index == optionIndex && optionsStates[index]}
                                    setOptionsStates={setOptionsStates}
                                    paymentTerms={paymentTerms}
                                    numParts={numberOfParts}
                                    downpayment={firstPayment}
                                    secondPayment={secondPayment}
                                    partNumber={numberOfParts}
                                    dueNow={firstPayment}
                                    scheduledAmount={secondPayment}
                                    scheduledDate={scheduledDate}
                                />
                            </Pressable>
                        )
                    } else {
                        return (
                            <Pressable onPress={() => handleOptionPress(index)} key={index}>
                                <PaymentPlanOption
                                    active={index == optionIndex && optionsStates[index]}
                                    numParts="full"
                                    downpayment={plan.renewal_premium}
                                    parts="full"
                                />
                            </Pressable>
                        )
                    }
                })}
            </ScrollViewWithFade>
        </View>
    )
}

export default SelectPaymentSchedule
