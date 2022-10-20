import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WalletLanding from "./Landing";
import ErrWalletLanding from "../Error/ErrWallet1";

const Wallet1 = ({ route }) => { 
	const Stack = createNativeStackNavigator();

	const { error } = route.params;

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{error ? (
				<Stack.Screen name="ErrWalletLanding" component={ErrWalletLanding} />
			) : (
				<Stack.Screen name="WalletLanding" component={WalletLanding} />
			)}
		</Stack.Navigator>
	);
};

export default Wallet1;
