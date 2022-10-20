import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const CustomBoxShadow = ({ children, pageColor }) => {

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
            flex: 1
        }
    })

    return (
        <>
            {Platform.OS == "android" ?
                <Shadow
                    startColor="rgba(0,0,0,0.12)"
                    finalColor={pageColor}
                    radius={15}
                    offset={[0, 10]}
                    viewStyle={{ flex: 1, width: "100%" }}
                    containerViewStyle={{ flex: 1, width: "100%" }}
                >
                    <Shadow
                        startColor="rgba(0,0,0,0.07)"
                        finalColor={pageColor}
                        radius={6}
                        offset={[0, 4]}
                        viewStyle={{ flex: 1, width: "100%" }}
                        containerViewStyle={{ flex: 1, width: "100%" }}
                    >
                        {children}
                    </Shadow>
                </Shadow>
                :
                <View style={[styles.shadow1, styles.container]}>
                    <View style={[styles.shadow2, styles.container]}>
                        {children}
                    </View>
                </View>
            }
        </>

    )
}

export default CustomBoxShadow;