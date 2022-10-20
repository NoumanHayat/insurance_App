import React, { useContext } from "react";
import {
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { Svg, Circle } from "react-native-svg";

import CustomBoxShadow from "../shadows/CustomBoxShadow";
import UserContext from "../../context/context";
import {
    borderRadius,
    colour,
    fontSize,
    fontWeight,
} from "../../styles/global";


const InputWithCustomPicker = ({ pageColour, value, placeholder, children }) => {

    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioY = height / modelY;
    // eslint-disable-next-line
    const ratioX = width / modelX;

    const styles = StyleSheet.create({
        shadow1: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowRadius: 15,
            shadowOpacity: 0.12,
            width: "100%"
        },
        shadow2: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowRadius: 6,
            shadowOpacity: 0.07,
        },
        container: {
            height: 48 * ratioY,
            width: "100%"
        }
    });

    return (
            <View style={styles.container}>
                <CustomBoxShadow pageColor={pageColour}>
                    <Content
                        value={value}
                        placeholder={placeholder}
                    >
                        {children}
                    </Content>
                </CustomBoxShadow>
            </View>
    );
};

export default InputWithCustomPicker;

const Content = ({ value, placeholder, children }) => {
    const { height, width } = useWindowDimensions();
    const { modelX, modelY, platform } = useContext(UserContext);
    const ratioY = height / modelY;
    const ratioX = width / modelX;

    const styles = StyleSheet.create({
        container: {
            height: "100%",
            justifyContent: "center",
            width: "100%",
        },
        input: {
            position: "absolute",
            height: "100%",
            width: "100%",
            borderWidth: 1,
            borderColor: colour["colour-border-input-default"],
            backgroundColor: colour["colour-background-input"],
            borderRadius: borderRadius["border-radius-3"],
            justifyContent: "center",
        },
        placeholder: {
            fontWeight: platform == "android" ? fontWeight["font-weight-4"] : fontWeight["font-weight-3"],
            fontSize: fontSize["font-size-3"] * ratioY,
            color: colour["colour-text-input-placeholder"],
            lineHeight: 18.75,
            position: "absolute",
            left: 11,

        },
        children: {
            opacity: 0,
        },
        entered: {
            fontWeight: fontWeight["font-weight-3"],
            fontSize: fontSize["font-size-3"] * ratioY,
            lineHeight: 18,
            backgroundColor: "#525B64",
            color: "#fff",
            padding: 4,
            borderRadius: borderRadius["border-radius-2"],
        },
        enteredContainer: {
            alignItems: "flex-start",
            position: "absolute",
            left: 11,
        },
        circle: {
            alignSelf: "flex-end",
            zIndex: 3,
            marginRight: 18 * ratioX,
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.input}>
                {value?.length > 0 ? (
                    <View style={styles.enteredContainer}>
                        <Text style={styles.entered}>{value}</Text>
                    </View>
                ) : (
                    <Text style={styles.placeholder}>{placeholder}</Text>
                )}
                <View style={styles.children}>
                    {children}
                </View>
            </View>
            <View style={styles.circle}>
                <Svg height={12} width={12}>
                    <Circle
                        r={6}
                        cx={6}
                        cy={6}
                        fill={value?.length > 0 ? "#68D391" : "#6E7B87"}
                    />
                </Svg>
            </View>
        </View>
    )
}