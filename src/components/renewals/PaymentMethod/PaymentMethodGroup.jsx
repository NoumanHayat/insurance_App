import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';

import UserContext from '../../../context/context';
import RadioButton from '../../buttons/RadioButtonV2';

import PaymentMethod from '../../../components/renewals/PaymentMethod/PaymentMethod';

const PaymentMethodGroup = ({ setPaymentMethod }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const cards = [
        {
            cardType: "visa",
            cardHolder: "Johnathan Doe",
            cardExpirationDate: "11/23",
        },
        {
            cardType: "mastercard",
            cardHolder: "Johnathan Doe",
            cardExpirationDate: "11/23",
        },
    ];

    const defaultStates = Array.from({ length: cards.length }, () => false);

    const [cardIndex, setCardIndex] = useState(undefined);
    const [cardStates, setCardStates] = useState(defaultStates)

    const styles = StyleSheet.create({
        partItem: {
            flexDirection: "row",
            marginBottom: 15 * ratioY,
        },
        radioButton: {
            alignSelf: "center",
            marginRight: 7 * ratioX,
        },
    })

    useEffect(() => {
        updatePaymentMethod()
    },[cardStates])

    const updatePaymentMethod = () => {
        const selectedMethod = cards[cardIndex];
        console.log("selectedMethod:: ", selectedMethod)
        if(cardStates[cardIndex]){
            console.log("Ping")
            setPaymentMethod(selectedMethod);
        } else {
            setPaymentMethod(undefined)
        }
    }

    const handleCardPress = (index) => {
        setCardIndex(index);
        setCardStates(states => {
            const newStates = [...states];
            const myNewState = !newStates[index];
            newStates.fill(false);
            newStates[index] = myNewState;
            return newStates;
        })
    }

    return (
        <View>
            {cards.map((card, index) => (
                <Pressable onPress={() => handleCardPress(index)} style={styles.partItem} key={index}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            selected={cardIndex == index && cardStates[cardIndex]}
                            pageColour="#1F2937"
                        />
                    </View>
                    <PaymentMethod
                        value={index}
                        cardType={card.cardType}
                        selected={cardIndex == index && cardStates[cardIndex]}
                    />
                </Pressable>
            ))}
        </View>
    )
}

export default PaymentMethodGroup;
