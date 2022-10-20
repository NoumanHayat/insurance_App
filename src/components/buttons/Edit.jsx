import React from 'react';
import { View, StyleSheet } from "react-native";
import Edit from "../../../assets/edit.svg";

const EditButton = () => {

    const styles = StyleSheet.create({
        container: {
            height: 32,
            width: 32,
            borderRadius: 16,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
        },
    })

    return(
        <View style={styles.container}>
            <Edit />
        </View>
    )
}

export default EditButton;