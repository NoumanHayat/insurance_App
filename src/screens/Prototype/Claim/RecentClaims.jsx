import React from "react";
import {
    View,
    StyleSheet,
    Button,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const RecentClaims = () => {

    const styles = StyleSheet.create({
		screen: {
			flex: 1,
            justifyContent: "center",
            alignItems: "center",
		},
		
	});

    const navigation = useNavigation()
    return (
        <View style={styles.screen}>
            <Button
                onPress={() => navigation.goBack()}
                title="Go Back"
            />
        </View>
    )
}

export default RecentClaims;
