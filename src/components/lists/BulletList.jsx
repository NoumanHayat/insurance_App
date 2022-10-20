import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
} from "react-native";

import UserContext from "../../context/context";

const BulletList = ({ desc }) => {

    const { height } = useWindowDimensions();
    const { modelY } = useContext(UserContext);
    const ratioY = height / modelY;

    const styles = StyleSheet.create({
        container: {

        },
        bullet: {
            width: 5 * ratioY,
            height: 5 * ratioY,
            backgroundColor: "#000000",
            borderRadius: 5 * ratioY,
            marginRight: 10 * ratioY,
        },
        listItem: {
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 5 * ratioY,
            marginBottom: 10 * ratioY,
        },
        listText: {
            fontSize: 16 * ratioY,
            fontWeight: "600",
        },
        rowDirection: {
            flexDirection: "row",
        }
    });

    return (
        <View style={styles.container}>
            {desc.map((desc, index) => {
                return (
                    <View key={index} style={styles.listItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.listText}>{desc}</Text>
                    </View>
                )
            })}
        </View>
    );
}

export default BulletList;