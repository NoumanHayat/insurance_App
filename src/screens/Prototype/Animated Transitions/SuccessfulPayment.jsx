import React, { useEffect, useContext } from "react";
import { View, StyleSheet, useWindowDimensions, Pressable } from "react-native";
import { useToast } from 'react-native-toast-notifications';
import { CustomToast } from "../../../components/toast";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    withSequence,
    withDelay,
    interpolate,
    Easing,
} from "react-native-reanimated";

import { StackActions } from '@react-navigation/native';

import GreenCheck from "../../../../assets/animations/verifying/greenCheck.svg";
import UserContext from "../../../context/context";
import AppLayout from "../../../components/layouts/AppLayout";
import TextButton2 from "../../../components/buttons/TextButton2";

const SuccessfulPayment = ({ navigation, route }) => {

    const popAction = StackActions.pop(3);

    const toast = useToast();


    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const { receipt_number, toastNotif } = route.params;
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    // useEffect(() => {
    //     console.log("Toast me? ", toastNotif);
    //     if (toastNotif) {
    //         setTimeout(() => {
    //             toast.show("Please contact AGIC to have your policy updated, You can contact them using the test@advantagegeneral.com email or call (876) 456-9087",
    //                 { data: "Policy Update Failed", type: "error_type" },
    //             );
    //         }, 10000);

    //     }

    // }, [toastNotif]);

    const widthShared = useSharedValue(0);
    const checkShared = useSharedValue(-200);
    const youreCoveredSV = useSharedValue(0);
    const messageSV = useSharedValue(0);
    const messageSV2 = useSharedValue(0);
    const buttonSV = useSharedValue(0);
    const clearScreenShared = useSharedValue(1);

    // General styles
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        upperPlane: {
            height: 186,
            width: 360,
            justifyContent: "center",
            backgroundColor: "transparent",
            alignItems: "center",
            zIndex: 2,
        },
        lowerPlane: {
            height: 186,
            width: 360,
            backgroundColor: "transparent",
            position: "absolute",
            zIndex: 1,
        },
        lineContainer: {
            height: 96,
            justifyContent: "center",
            alignItems: "flex-end",
            right: 17.5,
        },
        line: {
            height: 4,
            width: 92,
            backgroundColor: "#fff",
            borderRadius: 4,
        },
        lineMargin: {
            marginBottom: 14,
        },
        check: {
            marginBottom: 20,
            left: 17.5,
        },
        checkLineContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 30,
            borderRadius: 150,
            overflow: "hidden",
            marginTop: -400 * ratioY,
        },
        block: {
            height: 186,
            width: 85,
            position: "absolute",
            left: 0,
            backgroundColor: "#f00",
            zIndex: 3,
        },
        youreCovered: {
            color: "#ffffff",
            fontWeight: "500",
            fontSize: 28 * ratioY,
            marginTop: -20,
        },
        message: {
            fontSize: 16,
            fontWeight: "400",
            color: "#FFFFFF",
            marginTop: 20,
            maxWidth: "90%",
            minHeight: 72,
            textAlign: "center",
            lineHeight: 24,
        },
        refNumber: {
            fontSize: 24,
            fontWeight: "400",
            color: "#FFD53D",
            marginTop: 20,
            maxWidth: "90%",
            minHeight: 72,
            textAlign: "center",
            lineHeight: 24,
        },
        button: {
            marginBottom: -520 * ratioY,
        }
    });

    // Opacity levels for lines
    const opLvlOne = 1;
    const opLvlTwo = 0.4;
    const opLvlThree = 0.2;
    const opLvlFour = 0.1;
    const opLvlFive = 0

    const _line0Opacity = useSharedValue(opLvlOne);
    const _line1Opacity = useSharedValue(opLvlTwo);
    const _line2Opacity = useSharedValue(opLvlThree);
    const _line3Opacity = useSharedValue(opLvlFive);

    // Lines animation styles
    const _line0Styles = useAnimatedStyle(() => {
        return {
            opacity: _line0Opacity.value,
            width: (92 - widthShared.value * 4) * ratioX,
        }
    })

    const _line1Styles = useAnimatedStyle(() => {
        return {
            opacity: _line1Opacity.value,
            width: (92 - widthShared.value * 3) * ratioX,
        }
    })

    const _line2Styles = useAnimatedStyle(() => {
        return {
            opacity: _line2Opacity.value,
            width: (92 - widthShared.value * 2) * ratioX,
        }
    })

    const _line3Styles = useAnimatedStyle(() => {
        return {
            opacity: _line3Opacity.value,
            width: (92 - widthShared.value) * ratioX,
        }
    })

    const _changeLineOpacity = (sharedValue, opacities) => {

        const options = {
            duration: 300
        }

        const options2 = {
            duration: 150
        }

        sharedValue.value = withSequence(
            withDelay(0, withTiming(opacities[0], options)),
            withDelay(0, withTiming(opacities[1], options)),
            withDelay(0, withTiming(opacities[2], options)),
            withDelay(0, withTiming(opacities[3], options2)),
            withDelay(0, withTiming(opacities[4], options2)),
            withDelay(0, withTiming(opacities[5], options2)),
        )
    }

    const checkLineContainerStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: messageSV2.value,
            }]
        }
    })

    // Check animation styles
    const checkStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: checkShared.value,
            }]
        };
    });

    // Text animation styles
    const clearScreenStyles = useAnimatedStyle(() => {
        return {
            opacity: clearScreenShared.value,
        };
    });

    const youreCoveredStyles = useAnimatedStyle(() => {
        return {
            opacity: youreCoveredSV.value,
            height: interpolate(youreCoveredSV.value, [0, 1], [0, 38 * ratioY]),
            transform: [{
                translateY: messageSV2.value,
            }]
        }
    })

    const messageStyles = useAnimatedStyle(() => {
        return {
            opacity: messageSV.value,
            height: interpolate(messageSV.value, [0, 1], [0, 38 * ratioY]),
            transform: [{
                translateY: messageSV2.value,
            }]
        }
    })

    const buttonStyles = useAnimatedStyle(() => {
        return {
            opacity: buttonSV.value
        }
    })

    const truncateLines = () => {
        widthShared.value = withDelay(
            1350,
            withTiming(14, {
                duration: 1000,
                easing: Easing.bezier(0.3, -0.05, 0.7, -0.5),
            })
        );
    };

    const translateCheck = () => {
        checkShared.value = withDelay(
            1350,
            withTiming(0, {
                duration: 1000, //keep at one
                easing: Easing.bezier(0.3, -0.05, 0.7, -0.5),
            }, youreCovered)
        );
    };

    const button = () => {
        "worklet"
        buttonSV.value = withTiming(1, {
            duration: 1000,
        })
    }

    const body = () => {
        "worklet"
        messageSV2.value = withTiming(-100, {
            duration: 500,
        }, button)
    }

    const message = () => {
        "worklet"
        messageSV.value = withTiming(1, {
            duration: 700,
        }, body)
    }

    const youreCovered = () => {
        "worklet"
        youreCoveredSV.value = withTiming(1, {
            duration: 700,
        }, message)
    }


    useEffect(() => {
        _changeLineOpacity(_line0Opacity, [opLvlTwo, opLvlThree, opLvlFour, opLvlThree, opLvlTwo, opLvlOne])
        _changeLineOpacity(_line1Opacity, [opLvlOne, opLvlTwo, opLvlThree, opLvlTwo, opLvlOne, opLvlOne])
        _changeLineOpacity(_line2Opacity, [opLvlTwo, opLvlOne, opLvlTwo, opLvlOne, opLvlOne, opLvlOne])
        _changeLineOpacity(_line3Opacity, [opLvlFour, opLvlTwo, opLvlOne, opLvlOne, opLvlOne, opLvlOne])

        truncateLines();
        translateCheck();
    }, []);

    return (
        <AppLayout>
            <View style={styles.container}>

                <View style={styles.upperPlane}>
                    <Animated.View style={[styles.checkLineContainer, checkLineContainerStyles]}>
                        <Animated.View style={[styles.check, checkStyles]}>
                            <GreenCheck />
                        </Animated.View>

                        <Animated.View style={[styles.lineContainer, clearScreenStyles]}>
                            <Animated.View style={[styles.line, styles.lineMargin, _line0Styles]} />
                            <Animated.View style={[styles.line, styles.lineMargin, _line1Styles]} />
                            <Animated.View style={[styles.line, styles.lineMargin, _line2Styles]} />
                            <Animated.View style={[styles.line, _line3Styles]} />
                        </Animated.View>
                    </Animated.View>

                    <Animated.Text style={[styles.youreCovered, youreCoveredStyles]}>
                        Payment Successful!
                    </Animated.Text>
                    <Animated.Text style={[styles.message, messageStyles]}>
                        Your policy is currently being updated.
                    </Animated.Text>
                    <Animated.Text style={[styles.message, messageStyles]}>
                        If your policy isn't updated within 2 business days please contact AGIC with the following reference number.
                    </Animated.Text>
                    <Animated.Text style={[styles.refNumber, messageStyles]}>
                        {receipt_number}
                    </Animated.Text>
                </View>
                <Animated.View style={[styles.button, buttonStyles]}>
                    <Pressable onPress={() => {
                        navigation.dispatch(popAction);
                    }}>
                        <TextButton2
                            text="Return To Policy Details"
                            textColor="#FFFFFF"
                            backgroundColor="#2565BF"
                            width={349 * ratioX}
                            height={48 * ratioX}
                            borderRadius={8}
                            fontSize={20}
                        />
                    </Pressable>
                </Animated.View>
            </View>
        </AppLayout>
    );
};

export default SuccessfulPayment;
