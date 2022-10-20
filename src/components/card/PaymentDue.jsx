import React, { useContext, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
} from "react-native";

import Card from "../../components/card/Card";
import UserContext from "../../context/context";
import DataPoint from "../renewals/General/DataPoint";
import Currency from '../misc/Currency';


const PaymentDue = ({ paymentDue }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        paymentValue: {

        }
    })

    return (
        <Card>
            {/* <Text style={styles.paymentValue}>{<Currency value={chosenPaymentPlan.renewal_premium_with_gct} />}</Text> */}
            <DataPoint
                label="Payment Due"
                value={<Currency value={paymentDue} />}
                textColor="#2565BF"
                valueColor="#047857"
                fontWeight="700"
            />
        </Card>
    );
}

export default PaymentDue;