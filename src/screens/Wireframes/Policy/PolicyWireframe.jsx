import React, { Component, Fragment, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity } from "react-native";
import LargeButton from "../../../components/buttons/LargeButton";
import WalletLayout from "../../../components/layouts/WalletLayout";
import Addons from "../../../components/policy/Addons";
import Coverage from "../../../components/policy/Coverage";
import Premium from "../../../components/policy/Premium";
import FooterText from "../../../components/text/FooterText";
import HeaderText from "../../../components/text/HeaderText";
import MediumText from "../../../components/text/MediumText";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Policy = ({ navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <View style={styles.justifyContent}>
                    <View style={styles.titleContainer}>
                        <Pressable style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
                            {/* <LargeButton text="Back" width={40} height={30} background="#D3D9DE" textColor="#000000" fontSize={10} /> */}
                            <Text>Back</Text>
                        </Pressable>
                        <HeaderText text="Policy 239875" />
                    </View>
                    <View style={styles.screenBodyContainer} >
                        <View style={styles.detailsContainer}>
                            <View style={styles.vehicleDetails}>
                                <View>
                                    <MediumText text="2018 BMW M5" fontSize={14} fontWeight="400" />
                                    <MediumText text="MPTCP-232832" fontSize={14} fontWeight="400" />
                                </View>
                                <View style={styles.textAlignRight}>
                                    <MediumText text="8765 ED" fontSize={14} fontWeight="400" />
                                    <FooterText text="Expires Feb 28, 2022" fontSize={12} color="#8D9AA5" lineHeight={14.06} />
                                </View>
                            </View>
                            <View
                                style={{
                                    borderBottomColor: "#D3D9DE",
                                    borderBottomWidth: 1,
                                    marginTop: 12,
                                    marginBottom: 8,
                                }}
                            />
                            <View style={styles.vehicleDetails}>
                                <View>
                                    <MediumText text="Colour:" fontSize={14} fontWeight="400" />
                                    <MediumText text="Chasis #:" fontSize={14} fontWeight="400" />
                                </View>
                                <View style={styles.textAlignRight}>
                                    <MediumText text="Green" fontSize={14} fontWeight="400" />
                                    <MediumText text="DB6783473" fontSize={14} fontWeight="400" />
                                </View>
                            </View>
                        </View>
                        <View style={styles.accordionContainer} >
                            <Premium />
                            <View
                                style={{
                                    borderBottomColor: "#D3D9DE",
                                    borderBottomWidth: 1,
                                    marginTop: 12,
                                    marginBottom: 8,
                                }}
                            />
                            <Text style={styles.accordionTitle}>Your Coverage</Text>
                            <Coverage />
                            <Text style={styles.accordionTitle}>Add-ons</Text>
                            <Addons />
                            <Addons />
                            <View
                                style={{
                                    borderBottomColor: "#D3D9DE",
                                    borderBottomWidth: 1,
                                    marginTop: 12,
                                    marginBottom: 8,
                                }}
                            />
                            <Text style={styles.accordionTitle}>My Documents</Text>
                            <TouchableOpacity style={styles.policyDocuments}>
                                <Text style={styles.fontSize}>Certificate_of_Insurance.pdf</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.policyDocuments}>
                                <Text style={styles.fontSize}>Policy_Schedule.pdf</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.policyDocuments}>
                                <Text style={styles.fontSize}>Certificate_of_Insurance.pdf</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <LargeButton text="Renew Policy" width={300} height={50} borderRadius={8} fontSize={18} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        marginTop: 25,
    },
    justifyContent: {
        justifyContent: "space-between",
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
    },
    screenBodyContainer: {
        height: "100%",
        padding: 20,
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 95,
        backgroundColor: "#FFFFFF",
        elevation: 1,

    },
    backButtonContainer: {
        backgroundColor: "pink",
    },
    detailsContainer: {
        borderWidth: 1,
        borderColor: "#D3D9DE",
        borderRadius: 8,
        padding: 10,
    },
    vehicleDetails: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textAlignRight: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    accordionContainer: {
    },
    policyDocuments: {
        marginTop: 20,
        marginBottom: 20,
        padding: 15,
        borderColor: "#6E7B87",
        borderWidth: 1,
        borderRadius: 4,
    },
    fontSize: {
        fontSize: 12,
    },
});

export default Policy
