import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const CircleCheckbox = ({ isChecked, setIsChecked }) => {

	return (
			<BouncyCheckbox
            size={16}
            onPress={() => setIsChecked()}
            isChecked={isChecked}
            useNativeDriver={false}
            fillColor="#B3BDC6"
            disableBuiltInState
			/>
	);
};


export default CircleCheckbox;
