import React, { useContext } from 'react';
import { View, StyleSheet, useWindowDimensions, Text } from 'react-native';

import Currency from '../misc/Currency';
import UserContext from '../../../src/context/context';
import { fontWeight } from '../../../src/styles/global';

const PremiumAmountCard = ({amount, policy, date}) => {

    const { height, width } = useWindowDimensions();
	const { modelX, modelY } = useContext(UserContext);
	const ratioX = width / modelX;
	const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 16 * ratioX,
            paddingTop: 16 * ratioY,
            paddingBottom: 18 * ratioY,
            backgroundColor: "#fff",
            borderRadius: 6 * ratioY
        },
        row: {
            flexDirection: "row",
            justifyContent: "space-between"
        },
        firstRow: {
            marginBottom: 14 * ratioY
        },
        title: {
            fontSize: 16 * ratioY,
            fontWeight: fontWeight['font-weight-3'],
            lineHeight: 16 * ratioY,
            color: "#2565BF"
        },
        amount: {
            fontSize: 16 * ratioY,
            fontWeight: fontWeight['font-weight-3'],
            lineHeight: 16 * ratioY,
            color: "#111827"
        },
        secondRowText: {
            fontSize: 12 * ratioY,
            fontWeight: fontWeight['font-weight-3'],
            lineHeight: 12 * ratioY,
            color: "#4B5563"
        },
    })

    return (
            <View style={styles.container}>
                <View style={[styles.row, styles.firstRow]}>
                    <Text style={styles.title}>Premium Amount</Text>
                    <Currency value={amount} styles={styles.amount} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.secondRowText}>{policy}</Text>
                    <Text style={styles.secondRowText}>{date}</Text>
                </View>
            </View>
    )
}

export default PremiumAmountCard;