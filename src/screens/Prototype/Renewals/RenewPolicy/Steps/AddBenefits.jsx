import React, { useContext } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

import UserContext from '../../../../../context/context';

import DynamicTotal from '../../../../../components/renewals/DynamicTotal/DynamicTotal';
import BenefitCategory from '../../../../../components/renewals/AddBenefits/BenefitCategory';
import DashedLine from '../../../../../components/renewals/AddBenefits/DashedLine';
import ScrollViewWithFade from '../../../../../components/scrollviews/ScrollViewWithFade';

const AddBenefits = ({ pageColour, benefitsOptions, chosenBenefits, setChosenBenefits }) => {

    const { height } = useWindowDimensions();
    const { modelY } = useContext(UserContext);
    const ratioY = height / modelY;

    const initial = 0;
    let premiumTotal = 0;

    const premiums = chosenBenefits.map(benefit => {
        if (benefit?.tier) {
            return benefit.tier.premium
        } else {
            return 0;
        }
    })

    if (premiums.length > 0) {
        premiumTotal = premiums.reduce((previous, current) => {
            return previous + current;
        })
    } else {
        premiumTotal = 0;
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
        },
        scrollView: {
            marginBottom: 24 * ratioY,
            width: "100%"
        },
        footer: {
            marginTop: 18 * ratioY,
            width: "100%",
        },
        category: {
            marginBottom: 10 * ratioY
        }

    })

    return (
        <View style={styles.container}>
            {/* <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}> */}
                <ScrollViewWithFade fadeHeight={30 * ratioY} pageColor="#1F2937">
                    {benefitsOptions?.map((category, index) => {
                        return (
                            <View key={index}>
                                <View style={styles.category}>
                                    <BenefitCategory
                                        category={category}
                                        setChosenBenefits={setChosenBenefits}
                                        pageColour={pageColour}
                                    />
                                </View>
                                <DashedLine />
                            </View>
                        )
                    })}
                </ScrollViewWithFade>
            {/* </ScrollView> */}

            <DynamicTotal
                benefits={chosenBenefits}
                pageColour={pageColour}
                value={initial + premiumTotal} />

        </View>

    );
}

export default AddBenefits;
