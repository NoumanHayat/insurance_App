import React, { useContext } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, Pressable } from 'react-native';


import Currency from '../../misc/Currency';
import UserContext from '../../../context/context';
import { fontWeight } from '../../../styles/global';
import Icon from "../../../../assets/icons/Info-Icon-Grey.svg";


const BenefitCard = ({ title, premium, active, setModal }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;


    const styles = StyleSheet.create({
        container: {
            backgroundColor: active ? "#6B7280" : "#374151",
            borderRadius: 6 * ratioY,
            flex: 1,
            height: "100%",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        detailsGroup: {
            paddingLeft: 16 * ratioX,
            paddingVertical: 16 * ratioY,
        },
        iconContainer: {
            height: "100%",
            width: "20%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 16 * ratioY,
            flexDirection: "row"
        },
        icon: {
            height: 18 * ratioY,
            width: 18 * ratioY
        },
        title: {
            fontSize: 14 * ratioY,
            fontWeight: fontWeight['font-weight-3'],
            color: "#fff",
            marginBottom: 6 * ratioY
        },
        amount: {
            fontSize: 14 * ratioY,
            fontWeight: fontWeight['font-weight-1'],
            lineHeight: 14 * ratioY,
            color: active ? "#FEFEFE" : "#FEC900"
        },
        firstRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 7 * ratioY,
        }
    })
    return (
        <View style={styles.container}>
            <View style={styles.detailsGroup}>
                <Text style={styles.title}>{title}</Text>
                <Currency value={premium} styles={styles.amount} />
            </View>
            <Pressable style={styles.iconContainer} onPress={() => setModal(true)}>
                <Icon style={styles.icon} />
            </Pressable>
        </View>


    )
}

export default BenefitCard;