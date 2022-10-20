import React from 'react';
import { View, StyleSheet } from 'react-native';

const Stepper = ({ numberOfSteps, currentStep }) => {

    const gap = 1.16; // 4px / 343px
    const array = Array(numberOfSteps).fill(0);

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: 2,
            flexDirection: "row",
            justifyContent: "space-between",
        },
        slot: {
            height: "100%",
            width: `${((100 - ((numberOfSteps - 1) * gap))/ numberOfSteps)}%`,
            borderRadius: 1
        }
    })

    const getColor = (index, currentStep) => {
        if(index == currentStep){
            return { backgroundColor: "#FFD53D" }
        } else if(index < currentStep){
            return { backgroundColor: "#D1D5DB" }
        } else {
            return { backgroundColor: "#4B5563"}
        }
    }

    return (
        <View style={styles.container}>
            {array.map((_, index) => (
                <View key={index} style={[styles.slot, getColor(index, currentStep )]} />
            ))}
        </View>
    )
    
}

export default Stepper;