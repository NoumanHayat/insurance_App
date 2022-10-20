import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
} from "react-native";

import CartIcon from "../../../assets/icons/cart-icon.svg";
import DollarIcon from "../../../assets/icons/dollar-icon.svg";

import Card from "../../components/card/Card";
import UserContext from "../../context/context";
import DataPoint from "./General/DataPoint";
import Currency from '../misc/Currency';
import { useState } from "react";


const RenewalSummary = ({ chosenBenefits, chosenPaymentPlan, prevPremium, risks, fullPaymentType, paymentMethod, cardType, cardLastFourDigitsCheck }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const [benefits, setBenefits] = useState([0]);
    const discount = risks[0]?.manual_rates;
    // const cardNumber = paymentMethod?.cardNumber;
    // console.log("card number(RS): " + cardNumber)
    // console.log(">>> CHOSEN PAYMENT PLAN <<<\n" + Object.entries(chosenPaymentPlan))
    // console.log("Benefits: " + benefits)

    const styles = StyleSheet.create({
        cardTitleContainer: {
            marginBottom: 4 * ratioY,
        },
        cardTitle: {
            color: "#2565BF",
            fontSize: 10,
            letterSpacing: 0.5,
            fontWeight: "500",
        },
        lineBar: {
            height: 1,
            width: "100%",
            backgroundColor: "#D3D9DE",
        },
        data: {
            flex: 1,
        },
        benefitData: {
            minHeight: 90 * ratioY,
        },
        paymentData: {
            minHeight: 130 * ratioY,
        },
        flexDirection: {
            flexDirection: "row",
        },
        iconBackground: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F3F4F6",
            borderRadius: 6,
            minWidth: 32 * ratioY,
            height: 32 * ratioY,
            marginRight: 8 * ratioX,
        },
        cardSection: {
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 12 * ratioY,
        },
        paymentDueContainer: {
            marginTop: 20,
            marginBottom: 5,
        },
        paymentLabel: {
            fontSize: 16,
            fontWeight: "600",
        },
        paymentValue: {
            fontSize: 20,
            fontWeight: "600",
            color: "#2565BF"
        },
    });

    //Premium Total

    const getBenefits = () => {
        benefits.length = 0;
        chosenBenefits?.map((benefit) => {
            // setBenefits(benefit?.tier.benefits)
            benefits.push(benefit?.tier.premium)
        })
    }

    getBenefits();

    const benefitTotal = benefits.length === 0 ? 0 : benefits.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    //Card Type

    // const getCardType = (cardNumber) => {
    //     let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
    //     let mastercard = new RegExp('^5[1-5][0-9]{14}$');
    //     let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');

    //     if (visa.test(cardNumber)) {
    //         return 'Visa';
    //     }
    //     if (mastercard.test(cardNumber) || mastercard2.test(cardNumber)) {
    //         return 'Mastercard';
    //     }
    // }

    // // const cardTypeCheck = '';
    // const cardTypeCheck = getCardType(cardNumber);
    // const cardType = typeof cardTypeCheck === 'string' ? cardTypeCheck : ""
    // const cardLastFourDigits = cardNumber?.slice(12);
    // const cardLastFourDigitsCheck = typeof cardLastFourDigits === 'string' ? cardLastFourDigits : '**';

    // useEffect(() => {
    //     // cardTypeCheck();
    //     cardTypeCheck = getCardType(cardNumber);
    // },[cardNumber])

    // console.log("Chosen 3: ", chosenPaymentPlan, " keys:: ", Object.keys(chosenPaymentPlan))

    return (
        <Card>
            <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>RENEWAL SUMMARY</Text>
            </View>
            <View style={styles.lineBar} />
            <View style={styles.cardSection}>
                <View style={styles.flexDirection}>
                    <View style={styles.iconBackground}>
                        <CartIcon />
                    </View>
                </View>
                <View style={[styles.data, styles.benefitData]}>
                    {chosenBenefits &&
                        chosenBenefits?.map((benefit, index) => (
                            <DataPoint
                                key={index}
                                label={benefit?.name}
                                value={<Currency value={benefit?.tier.premium} />}
                            />
                        ))
                    }
                    <DataPoint
                        //previous premium + benefits
                        label="Premium Total"
                        value={<Currency value={benefitTotal + prevPremium} />}
                    />
                </View>
            </View>
            <View style={styles.lineBar} />
            <View style={styles.cardSection}>
                <View style={styles.flexDirection}>
                    <View style={styles.iconBackground}>
                        <DollarIcon />
                    </View>
                </View>
                <View style={[styles.data, styles.paymentData]}>
                    <DataPoint
                        label="Method"
                        value={`${cardType} **${cardLastFourDigitsCheck}`}
                    />
                    {!fullPaymentType ?
                        <DataPoint
                            label={`Payment ${chosenPaymentPlan?.payment_terms[0]?.payment_number} of ${chosenPaymentPlan?.payment_terms?.length}`}
                            value={<Currency value={chosenPaymentPlan?.payment_terms[0]?.payment_term_premium} />}
                        />
                        :
                        <DataPoint
                            label={`Payment 1 of 1`}
                            value={<Currency value={chosenPaymentPlan?.renewal_premium} />}
                        />
                    }
                    <DataPoint
                        label="Discount"
                        value={<Currency value={discount !== null || discount !== undefined ? 0 : discount.toString()} />}
                    />
                    <DataPoint
                        label="Taxes"
                        value={<Currency value={fullPaymentType ? chosenPaymentPlan.gct : chosenPaymentPlan.GCT} />}
                    />
                </View>
            </View>
            <View style={styles.lineBar} />
            <View style={[styles.cardSection, styles.paymentDueContainer]}>
                <Text style={styles.paymentLabel}>Payment Due</Text>
                {/* Plan total + benefitTotal */}
                {!fullPaymentType ?
                    <Text style={styles.paymentValue}>{<Currency value={chosenPaymentPlan.renewal_premium_with_gct + benefitTotal + prevPremium} />}</Text>
                    :
                    <Text style={styles.paymentValue}>{<Currency value={chosenPaymentPlan.renewal_premium_with_gct + benefitTotal + prevPremium} />}</Text>
                }
            </View>
        </Card>
    );
}

export default RenewalSummary;
