import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, useWindowDimensions, Pressable, Modal } from 'react-native'

import UserContext from '../../../context/context';
import Tier from './Tier';
import BenefitInfoModal from './BenefitInfoModal';

const BenefitCategory = ({ category, pageColour, setChosenBenefits }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    //eslint-disable-next-line
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const defaultTierStates = Array.from({ length: category.tiers.length }, () => false);

    const [tierIndex, setTierIndex] = useState(undefined);
    const [tierStates, setTierStates] = useState(defaultTierStates);
    const [modal, setModal] = useState(false);

    const styles = StyleSheet.create({
        option: {
            marginBottom: 5 * ratioY,
            width: "100%"
        }
    })

    /** Update benefits */
    useEffect(() => {
        if (tierIndex !== undefined) {
            updateBenefit();
        }
    },[tierStates])

    const updateBenefit = () => {
        const categoryName = category.name;
        const chosenTier = category.tiers[tierIndex];
        const chosenTierState = tierStates[tierIndex];
        let selectedBenefit;
        if (chosenTierState) {
            selectedBenefit = { name: categoryName, tier: chosenTier }
            setChosenBenefits(benefits => {
                const newBenefits = benefits.filter(benefit => benefit.name != categoryName);
                return [...newBenefits, selectedBenefit]
            })
        } else {
            setChosenBenefits(benefits => benefits.filter(benefit => benefit?.name != categoryName))
        }
    }

    const handleTierPress = (index) => {
        setTierIndex(index);
        setTierStates(states => {
            const newStates = [...states];
            const myNewState = !newStates[index];
            newStates.fill(false);
            newStates[index] = myNewState;
            return newStates;
        })
    }

    return (
        <View style={styles.category}>
            {category?.tiers.map((tier, index) => {
                return (
                    <Pressable onPress={() => handleTierPress(index)} style={styles.option} key={index}>
                        <Tier
                            active={tierIndex == index && tierStates[index]}
                            index={index}
                            title={category.name}
                            premium={tier.premium}
                            desc={tier.desc}
                            pageColour={pageColour}
                            setModal={setModal}
                        />
                    </Pressable>
                )
            })}
            <Modal animationType="slide" transparent={true} visible={modal}>
                <BenefitInfoModal
                    title={category.name}
                    message={category.message}
                    tiers={category.tiers}
                    setModal={setModal} />
            </Modal>
        </View>
    )
}

export default BenefitCategory;