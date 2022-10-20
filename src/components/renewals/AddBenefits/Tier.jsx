import React, { useContext } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native'

import UserContext from '../../../context/context';
import CustomCheckbox from '../../checkboxes/CustomCheckboxV2';
import BenefitCard from './BenefitCard';

const Tier = ({ index, title, premium, pageColour, active, setModal }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        option: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            marginBottom: 8 * ratioY
        },
        lastInGroup: {
            // marginBottom: 32 * ratioY,
        },
        checkboxContainer: {
            marginRight: 20 * ratioX
        },
    })

    return (
        <View
            style={styles.option}
        >
            <View
                style={styles.checkboxContainer}>
                <CustomCheckbox
                    active={active}
                    pageColour={pageColour}
                />
            </View>
            <BenefitCard
                active={active}
                title={`${title} ${index + 1}`}
                premium={premium}
                setModal={setModal}
            />
        </View>
    )
}

export default Tier;