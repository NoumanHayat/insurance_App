import React, { useContext } from "react";
import {
    Text,
    StyleSheet,
    useWindowDimensions,
    View,
    TouchableWithoutFeedback
} from "react-native";

import UserContext from "../../../context/context";
import {
    fontWeight,
} from "../../../styles/global";

const FeaturesX = ({ Image, heading, body }) => {
    const { height, width } = useWindowDimensions();
    const { modelX, modelY } = useContext(UserContext);
    const ratioX = width / modelX;
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        page: {
            width,
            alignItems: "center",
            paddingHorizontal: ((width - 326 * ratioY) / 2),
        },
        heading: {
            fontWeight: fontWeight["font-weight-2"],
            fontSize: 28 * ratioY,
            lineHeight: 32.81 * ratioY,
            color: "#fff",
            marginTop: 10 * ratioY,
        },
        body: {
            textAlign: "center",
            fontWeight: fontWeight["font-weight-1"],
            fontSize: 16 * ratioY,
            lineHeight: 24 * ratioY,
            color: "#fff",
            marginTop: 12 * ratioY,
        },
        imageContainer: {
            marginTop: ((width - 340 * ratioX) / 2),

            // borderWidth: 1,
            // borderColor: "red"
        },
    });

    return (
        <TouchableWithoutFeedback>
            <View style={styles.page}>
                <View style={styles.imageContainer}>
                    <Image width={340 * ratioX} height={382 * ratioY} />
                </View>
                <Text style={styles.heading}>{heading}</Text>
                <Text style={styles.body}>{body}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default FeaturesX;
