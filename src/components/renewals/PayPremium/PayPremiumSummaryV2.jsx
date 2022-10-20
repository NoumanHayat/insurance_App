import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
} from "react-native";

// import Card from "../../components/card/Card";
import UserContext from "../../../context/context";
import DataPoint from "../General/DataPoint";
import Currency from '../../misc/Currency';
import { useState } from "react";
import CardV2 from "../../card/CardV2";
import DashedLine from "../AddBenefits/DashedLine";


const PayPremiumSummaryV2 = ({ chosenBenefits, chosenPaymentPlan, prevPremium, risks, fullPaymentType, paymentMethod, cardType, cardLastFourDigitsCheck, selectedTerms, premiumData }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const [paymentTerms, setPaymentTerms] = useState([]);
    // const discount = risks[0]?.manual_rates;
    console.log(">>> CHOSEN PAYMENT PLAN <<<\n" + Object.entries(chosenPaymentPlan))
    console.log(">>> CHOSEN SELECTED TERMS <<<\n" + Object.entries(selectedTerms))
    // console.log("paymentTerms: " + paymentTerms)

    const styles = StyleSheet.create({
        data: {
            flex: 1,
        },
        paymentData: {
            marginTop: -10 * ratioY,
        },
        dataPoint: {
            marginVertical: 8,
        },
        marginBottom: {
            marginBottom: 15,
        }
    });

    return (
        <CardV2>
            <View style={styles.dataPoint}>
                {selectedTerms &&
                    selectedTerms?.map((paymentTerm, index) => (
                        <DataPoint
                            key={index}
                            label={`Payment ${paymentTerm?.payment_number} of ${premiumData?.length}`}
                            value={<Currency value={paymentTerm?.payment_term_premium} />}
                        />
                    ))
                }
            </View>
            <DashedLine RSCard={true} />
            <View style={[styles.dataPoint, styles.paymentData]}>
                <DataPoint
                    label="Payment Method"
                    value={`${cardType} **${cardLastFourDigitsCheck}`}
                />
            </View>
        </CardV2>
    );
}

export default PayPremiumSummaryV2;
