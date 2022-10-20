import React, { useContext } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Animated,
{
    useSharedValue, withSequence, withTiming,
    withDelay, useAnimatedStyle,
    useAnimatedReaction, interpolate,
} from 'react-native-reanimated';

import { usePrevious } from '../../../lib/utils/hooks/general';
import { fontWeight } from '../../../styles/global';
import UserContext from '../../../context/context';
import Slot from './Slot';
import UpArrow from "../../../../assets/animations/DynamicTotal/arrow-upward-24.svg";
import DownArrow from "../../../../assets/animations/DynamicTotal/arrow-downward-24.svg";

const SlotMachine = ({ value }) => {

    const { height, width } = useWindowDimensions();
    const { modelY, modelX } = useContext(UserContext);
    const ratioY = height / modelY;
    const ratioX = width / modelX;

    const previousValue = usePrevious(value);

    const valueString = value?.toFixed(2).toString();

    let [dollars, cents] = valueString.split(".")

    if (cents == undefined) {
        cents = "00";
    }
    const dollarsArray = Array.from(dollars);
    const centsArray = Array.from(cents)

    const originalFontSize = 16;
    const maxScale = 0.9
    const green = "#047857";
    const orange = "#EE7600"; 
    // color values also hardcoded in the .svg files for the arrows, so if these hex codes are changed then the
    // fill values in the .svg files should be changed as well.

    const scaleSV = useSharedValue(0);
    const fontColorSV = useSharedValue("#000");

    const styles = StyleSheet.create({
        container: {
            height: 48 * ratioY,
            overflow: "hidden",
            flexDirection: "row",
            borderRadius: 6 * ratioY,
            flex: 1,

        },
        valueContainer: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
        },
        static: {
            justifyContent: "center",
            height: 48 * ratioY,
            backgroundColor: "#fff",
        },
        text: {
            color: "#111827",
            fontSize: originalFontSize * ratioY,
            fontWeight: fontWeight['font-weight-3'],
        },
        arrow: {
            justifyContent: "center"
        }
    })
    const fontStyles = useAnimatedStyle(() => ({
        color: fontColorSV.value
    }))

    const valueContainerStyles = useAnimatedStyle(() => ({
        transform: [
            { scaleY: scaleSV.value },
            { scaleX: scaleSV.value }
        ],
        paddingRight: interpolate(scaleSV.value, [1, 1.1], [16, 32])
    })
    )

    const arrowContainerStyles = useAnimatedStyle(() => ({
        opacity: interpolate(scaleSV.value, [1, maxScale], [0, 1])
    })
    )

    const oscillate = (sharedValue, finalValue, initialValue) => {
        'worklet'
        sharedValue.value = withSequence(withTiming(finalValue), withDelay(1500, withTiming(initialValue)))
    }

    const animateValueContainer = (finalColour) => {
        'worklet'
        oscillate(scaleSV, maxScale, 1)
        oscillate(fontColorSV, finalColour, "#000")
    }

    useAnimatedReaction(() => {
        return value
    }, (current, previous) => {
        if (current > previous) animateValueContainer(green);
        if (current < previous) animateValueContainer(orange);
    })

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.valueContainer, valueContainerStyles]}>
                <Animated.View style={[styles.arrow, arrowContainerStyles]}>
                    {value > previousValue ? 
                    <UpArrow us height={24 * ratioY} width={24 * ratioX} /> : 
                    <DownArrow height={24 * ratioY} width={24 * ratioX} />}
                </Animated.View>
                <View style={styles.static}>
                    <Animated.Text style={[styles.text, fontStyles]}>$</Animated.Text>
                </View>
                {dollarsArray?.map((dollar, index) => (<Slot fontColorSV={fontColorSV} key={index} value={dollar} index={index} />))}
                <View style={styles.static}>
                    <Animated.Text style={[styles.text, fontStyles]}>.</Animated.Text>
                </View>
                {centsArray?.map((cent, index) => (<Slot fontColorSV={fontColorSV} key={index} value={cent} index={index} />))}
            </Animated.View>
        </View>
    )
}

export default SlotMachine;