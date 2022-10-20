import React from 'react';
import Animated, { useSharedValue, useAnimatedProps, useAnimatedReaction, useDerivedValue } from 'react-native-reanimated';
import { Line } from 'react-native-svg';

import { getAdjustment } from '../../../../lib/utils/indicator';
import interpolateColorBugFix from "../../../../lib/utils/interpolateColorBugFix";

const IndicatorSegment = ({ startColour, finishColour, initialX1, initialX2, strokeWidth, index, offsetSV, maxLength, minLength, pageWidthSV }) => {

    const AnimatedLine = Animated.createAnimatedComponent(Line);

    const x1 = useSharedValue(initialX1);
    const x2 = useSharedValue(initialX2);

    const lineLength = useDerivedValue(() => {
        return x2.value - x1.value;
    })

    const lineProps = useAnimatedProps(() => ({
        x1: `${x1.value}%`,
        x2: `${x2.value}%`,
        stroke: interpolateColorBugFix(lineLength.value, [minLength, maxLength],[startColour, finishColour])
    }))

    const animatePoints = (offset) => {
        'worklet';
        const pageWidth = pageWidthSV.value;
        const lengthDifference = maxLength - minLength;
        const adjustment = getAdjustment(offset, pageWidth, lengthDifference);
        /** If the user is on page [index] and is swiping towards page [index+1] then `x2` of segment [index+1] 
         *  should be translating to the left. If the user is on page [index] and is swiping towards
         *  page [index - 1] then the `x1` of segment [index - 1] should be translating to the right.
         */
        if (offset > index * pageWidth && offset < (index + 1) * pageWidth) {
            x2.value = Math.round(initialX2 - adjustment);
        } else if (offset > (index - 1) * pageWidth && offset < index * pageWidth) {
            x1.value = Math.round(initialX1 - adjustment);
        }
    }

    useAnimatedReaction(() => {
        return offsetSV.value
    }, (offset) => {
        animatePoints(offset)
    }, [offsetSV]);


    return (
        <AnimatedLine
            strokeWidth={strokeWidth}
            animatedProps={lineProps}
            strokeLinecap="round"
            y={strokeWidth/2}
        />
    )
}

export default IndicatorSegment;