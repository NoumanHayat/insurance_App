import React from 'react';
import { View, Image, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';

import WalletLayout from '../../../components/layouts/WalletLayout';
import DriversLicense from '../../../components/wallet/License/DriversLicense';
import TextBlock from '../../../components/text/textBlock';

import Polygon2 from '../../../assets/Polygon 2.svg';
import Share from '../../../assets/share2.svg';
// import Polygon2 from '../../../assets/Polygon 2.svg';
// import Share from '../../../assets/Share2.svg';


const ViewLicense = ({ route, navigation }) => {

    const data = route.params;

    const { height, width } = useWindowDimensions();

    const styles = StyleSheet.create({
        nav: {
            marginTop: (24/812) * height,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        backContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: (87/375) * width
        },
        backChevron: {
            height: 15,
            width: 15 
        },
        heading: {
            fontSize: 18,
            lineHeight: 22,
            fontWeight: "600"
        },
        share: {
            height: 32,
            width: 32,
            borderRadius: 4,
            padding: 8
        },
        myWallet: {
            fontSize: 14,
            lineHeight: 22,
            fontWeight: "600",
            color: "#6E7B87"
        },
        license: {
            marginTop: (56/812) * height,
        },
        textBlock: {
            marginTop: (40/812) * height
        }
    })

    return (
        <WalletLayout>
            <View style={styles.nav}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backContainer}>
                    <Image source={Polygon2} style={styles.backChevron}/>
                    <Text style={styles.myWallet}>My Wallet</Text>
                </Pressable>
                <Text style={styles.heading}>Driver's License</Text>
                <Pressable>
                    <Image source={Share} style={styles.share}/>
                </Pressable>
            </View>
            <View style={styles.license}>
                <DriversLicense data={data}/>
            </View>
            <View style={styles.textBlock}>
                <TextBlock />
            </View>
        </WalletLayout>
    )
}

export default ViewLicense;