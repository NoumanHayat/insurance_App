import React from "react";
import NumberFormat from "react-number-format";
import { Text } from "react-native";

const Currency = ({ value, styles }) => {
	return (
		<NumberFormat
			value={value}
			displayType="text"
			thousandSeparator={true}
			fixedDecimalScale={true}
			decimalScale={2}
			prefix="$ "
			renderText={(formatted) => <Text style={styles}>{formatted}</Text>}
		/>
	);
};

export default Currency;
