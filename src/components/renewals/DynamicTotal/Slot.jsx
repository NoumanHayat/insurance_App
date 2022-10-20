import React, { useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withSequence, withDelay } from 'react-native-reanimated';

import UserContext from '../../../context/context';
import { usePrevious } from '../../../lib/utils/hooks/general';
import { fontWeight } from '../../../styles/global';

const Slot = ({ value, fontColorSV }) => {

    const { height } = useWindowDimensions();
    const { modelY } = useContext(UserContext);
    const ratioY = height / modelY;

    const firstRender = useRef(true);
    const previous = usePrevious(value);
    const slotHeight = 48 * ratioY;

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const slotPositionSV = useSharedValue(0);
    const fontSizeSV = useSharedValue(16);

    const slotAnimatedPositionStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: slotPositionSV.value }
            ]
        }
    })

    const fontSizeAnimatedStyle = useAnimatedStyle(() => {
        return {
            fontSize: fontSizeSV.value * ratioY,
            color: fontColorSV.value
        }
    })

    const styles = StyleSheet.create({
        container: {
            height: 48 * ratioY,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
        },
        innerContainer: {
            justifyContent: "flex-end",
        },
        number: {
            color: "#111827",
            fontSize: 16 * ratioY,
            fontWeight: fontWeight['font-weight-3'],
        }
    })

    const options = {
        duration: 500,
        easing: Easing.ease,
    };

    const moveToInitialPosition = (initial) => {
        setTimeout(() => {
            translateSlotUp(initial);
        }, 300)
    }

    const translateSlotUp = (moveUpBy) => {
            slotPositionSV.value = withDelay(500, withTiming(slotPositionSV.value + -moveUpBy * slotHeight, options))
    }

    const translateSlotDown = (moveDownBy) => {
            slotPositionSV.value = withDelay(500, withTiming(slotPositionSV.value + moveDownBy * slotHeight, options))
    }

    const zoomInAndOut = (fontSizeSV, maxFontSize) => {
        fontSizeSV.value = withSequence(withTiming(maxFontSize), withDelay(1500, withTiming(16)))
    }

    const animateSlot = (value, previous) => {
        zoomInAndOut(fontSizeSV, 24)
        if (value > previous) {
            translateSlotUp(value - previous)
        } else if (value < previous) {
            translateSlotDown(previous - value)
        }
    }

    useEffect(() => {
        if (!firstRender.current) {
            animateSlot(value, previous);
        }
    })

    useEffect(() => {
        zoomInAndOut(fontSizeSV, 24)
        moveToInitialPosition(value);
        firstRender.current = false;
    }, [])



    return (
        <Animated.View style={slotAnimatedPositionStyle}>
            {
                numbers.map(number => (
                    <View key={number} style={styles.container}>
                        <View style={styles.innerContainer}>
                            <Animated.Text style={[styles.number, fontSizeAnimatedStyle]}>{number}</Animated.Text>
                        </View>
                    </View>

                ))
            }
        </Animated.View>

    )
}

export default Slot;