import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, ScrollView, Pressable } from 'react-native';

import UserContext from '../../../../../context/context';

import PaymentTermCard from '../../../../../components/renewals/PayPremium/PaymentTermCard';
import CustomCheckbox from '../../../../../components/checkboxes/CustomCheckboxV2';

const SelectPaymentTerms = ({ paymentTerms, setSelectedTerms }) => {

    const { height, width } = useWindowDimensions();
    const { modelY, modelX } = useContext(UserContext);
    const ratioY = height / modelY;
    const ratioX = width / modelX;

    const defaultTermsStates = Array.from({ length: paymentTerms.length }, () => false);

    const [termsStates, setTermsStates] = useState(defaultTermsStates);



    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
        },
        scrollView: {
            marginBottom: 24 * ratioY,
            width: "100%"
        },
        category: {
            marginBottom: 10 * ratioY
        },
        paymentTermOption: {
            flexDirection: "row",
            alignItems: "center"
        },
        checkbox: {
            marginRight: 20 * ratioX,
            justifyContent: "center",
            alignItems: "center"
        }

    })

    useEffect(() => {
        const selectedTerms = getSelectedTerms();
        setSelectedTerms(selectedTerms)
    }, [termsStates])



    const getSelectedTerms = () => {
        return paymentTerms.map((term, index) => {
            if (termsStates[index]) {
                return term;
            }
        }).filter(Boolean);
    }

    const updateTermsStates = (index) => {
        setTermsStates(states => {
            const newStates = [...states];
            const myNewState = !newStates[index];
            newStates[index] = myNewState;
            return newStates;
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {paymentTerms?.map((item, index) => {
                    return (
                        item.transaction_id === "" &&

                        <Pressable
                            key={index}
                            style={styles.paymentTermOption}
                            onPress={() => updateTermsStates(index)}
                        >
                            <View style={styles.checkbox}>
                                <CustomCheckbox
                                    pageColour="#1F2937"
                                    active={termsStates[index]}
                                />
                            </View>
                            <PaymentTermCard
                                active={termsStates[index]}
                                totalSteps={paymentTerms.length}
                                step={index + 1}
                                payment={item.payment_term_premium}
                                dueDate={item.effective_date}
                            />
                        </Pressable>
                    )
                })}
            </ScrollView>
        </View>

    );
}

export default SelectPaymentTerms;
