import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
} from "react-native";

// import Card from "../../components/card/Card";
import UserContext from "../../context/context";
import DataPoint from "./General/DataPoint";
import Currency from '../misc/Currency';
import { useState } from "react";
import CardV2 from "../card/CardV2";
import DashedLine from "./AddBenefits/DashedLine";


const RenewalSummaryV2 = ({ chosenBenefits, chosenPaymentPlan, prevPremium, risks, fullPaymentType, paymentMethod, cardType, cardLastFourDigitsCheck }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const [benefits, setBenefits] = useState([0]);
    const discount = risks[0]?.manual_rates;
    // const cardNumber = paymentMethod?.cardNumber;
    // console.log("card number(RS): " + cardNumber)
    console.log(">>> CHOSEN PAYMENT PLAN <<<\n" + Object.entries(chosenPaymentPlan))
    // console.log("Benefits: " + benefits)

    const styles = StyleSheet.create({
        data: {
            flex: 1,
        },
        paymentData: {
            marginTop: -10 * ratioY,
        },
        dataPoint: {
            marginVertical: 8,

            // borderWidth: 1,
            // borderColor: "red",
        },
        marginBottom: {
            marginBottom: 15,
        }
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

    const benefitTotal = benefits.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    return (
        <CardV2>
            <View style={styles.dataPoint}>
                <DataPoint
                    label="Starting Premium"
                    value={<Currency value={prevPremium} />}
                />
            </View>
            <View style={[styles.data, styles.dataPoint]}>
                {/* {chosenBenefits &&
                    chosenBenefits?.map((benefit, index) => (
                        <DataPoint
                            key={index}
                            label={benefit?.name}
                            value={<Currency value={benefit?.tier.premium} />}
                        />
                    ))
                } */}
                <DataPoint
                    label="Add-ons"
                    value={<Currency value={benefitTotal} />}
                />
            </View>
            <View style={[styles.dataPoint, styles.marginBottom]}>
                <DataPoint
                    label="Coverage Total"
                    value={<Currency value={benefitTotal + prevPremium} />}
                    textColor="#FEC900"
                />
            </View>
            <DashedLine RSCard={true} />
            <View style={[styles.dataPoint, styles.paymentData]}>
                <DataPoint
                    label="Payment Method"
                    value={`${cardType} **${cardLastFourDigitsCheck}`}
                />
            </View>
            <View style={styles.dataPoint}>
                {!fullPaymentType ?
                    <DataPoint
                        label={`Payment Plan`}
                        value={`${chosenPaymentPlan?.payment_terms?.length}-Part Plan`}
                    />
                    :
                    <DataPoint
                        label="Payment Plan"
                        value="1-Part Plan"
                        // value={`${chosenPaymentPlan?.renewal_premium}-Part Plan`}
                    />
                }
            </View>
            {/* <View style={[styles.cardSection, styles.paymentDueContainer]}>
                <Text style={styles.paymentLabel}>Payment Due</Text>
                {!fullPaymentType ?
                    <Text style={styles.paymentValue}>{<Currency value={chosenPaymentPlan.renewal_premium_with_gct + benefitTotal + prevPremium} />}</Text>
                    :
                    <Text style={styles.paymentValue}>{<Currency value={chosenPaymentPlan.renewal_premium_with_gct + benefitTotal + prevPremium} />}</Text>
                }
            </View> */}
        </CardV2>
    );
}

export default RenewalSummaryV2;
