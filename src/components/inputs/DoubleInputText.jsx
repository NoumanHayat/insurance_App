import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, useWindowDimensions } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

import CustomBoxShadow from '../shadows/CustomBoxShadow';
import UserContext from '../../context/context';

import { colour, fontWeight, fontSize } from '../../styles/global';

const DoubleTextInput = ({
    editable,
    setValueTop,
    setValueBottom,
    placeholderTop,
    placeholderBottom,
    topValid,
    bottomValid,
    setTopValid,
    setBottomValid,
    topFilters,
    bottomFilters,
    topMinLength,
    topMaxLength,
    bottomMinLength,
    bottomMaxLength,
}) => {

    editable = true

    const [topSubmitted, setTopSubmitted] = useState(false);
    const [bottomSubmitted, setBottomSubmitted] = useState(false);

    const { height, width } = useWindowDimensions();
    const { modelX, modelY, platform } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {
            height: 96 * ratioY,
            width: "100%",
        },
        inputs: {
            flex: 1,
            width: "100%",
            borderRadius: 8 * ratioY,
        },
        inputContainer: {
            height: "50%",
            justifyContent: "center"
        },
        input: {
            position: "absolute",
            height: "100%",
            width: "100%",
            borderWidth: 1,
            borderColor: colour["colour-border-input-default"],
            backgroundColor: colour["colour-background-input"],
            fontWeight:
                platform == "android"
                    ? fontWeight["font-weight-4"]
                    : fontWeight["font-weight-3"],
            fontSize: fontSize["font-size-3"],
            color: colour["colour-text-input-default"],
            lineHeight: 18.75,
            paddingLeft: 14 * ratioX,
        },
        inputTop: {
            borderTopLeftRadius: 6 * ratioY,
            borderTopRightRadius: 6 * ratioY
        },
        inputBottom: {
            borderBottomLeftRadius: 6 * ratioY,
            borderBottomRightRadius: 6 * ratioY
        },
        placeholder: {
            color: "#9CA3AF"
        },
        circle: {
            alignSelf: "flex-end",
            marginRight: 18 * ratioX
        }
    })

    const onChangeTextTop = (text) => {
        if((topMinLength && text.length < topMinLength) || text.length == 0 || text.startsWith(' ')){
            setTopValid(undefined);
            setTopSubmitted(false);
            return;
        }
        const results = topFilters.map(filter => filter(text));
        if(results.every(item => item == true)){
            setValueTop(text);
            setTopValid(true)
        } else {
            setValueTop("");
            setTopValid(false)
        }
        // setTopSubmitted(true);
        if (text.length == topMaxLength || text.length >= topMinLength) {
			setTopSubmitted(true)
		} else {
			setTopSubmitted(false);
		}
    };
    const onChangeTextBottom = (text) => {
        if((bottomMinLength && text.length < bottomMinLength) || text.length == 0 || text.startsWith(' ')){
			setBottomValid(undefined);
			setBottomSubmitted(false);
			return;
		}
        const results = bottomFilters.map(filter => filter(text));
        if(results.every(item => item == true)){
            setValueBottom(text);
            setBottomValid(true)
        } else {
            setValueBottom("");
            setBottomValid(false)
        }
        // setBottomSubmitted(true);
        if (text.length > bottomMaxLength) {
			setBottomSubmitted(false)
		} else {
			setBottomSubmitted(true);
		}
    };


    return (
        <View style={styles.container}>
            <CustomBoxShadow>
                <View style={styles.inputs}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, styles.inputTop]}
                            placeholder={placeholderTop}
                            placeholderTextColor={styles.placeholder.color}
                            onChangeText={onChangeTextTop}
                            maxLength={topMaxLength}
                        />
                        {
                            editable && (
                                <Svg style={styles.circle} height={12} width={12}>
                                    <Circle
                                        r={6}
                                        cx={6}
                                        cy={6}
                                        fill={
                                            !topSubmitted
                                                ? "#6E7B87"
                                                : topValid
                                                    ? "#68D391"
                                                    : colour["colour-input-invalid"]
                                        }
                                    />
                                </Svg>
                            )
                        }
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, styles.inputBottom]}
                            placeholder={placeholderBottom}
                            placeholderTextColor={styles.placeholder.color}
                            onChangeText={onChangeTextBottom}
                            maxLength={bottomMaxLength}
                        />
                        {
                            editable && (
                                <Svg style={styles.circle} height={12} width={12}>
                                    <Circle
                                        r={6}
                                        cx={6}
                                        cy={6}
                                        fill={
                                            !bottomSubmitted
                                                ? "#6E7B87"
                                                : bottomValid
                                                    ? "#68D391"
                                                    : colour["colour-input-invalid"]
                                        }
                                    />
                                </Svg>
                            )
                        }
                    </View>
                </View>
            </CustomBoxShadow>
        </View>
    )
}

export default DoubleTextInput;
