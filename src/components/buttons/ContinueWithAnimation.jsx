import React, { useContext } from "react";
import { useWindowDimensions } from "react-native";
import CustomTouchableHighlight from "./CustomTouchableHighlight";
import { fontSize } from "../../styles/global";

import UserContext from "../../context/context";

const ContinueWithAnimation = ({ disabled, pressed, prelim, text, width, btnHeight }) => {

	const { height } = useWindowDimensions();
	const {  modelY } = useContext(UserContext);
	const ratioY = height / modelY;

	return (
		<CustomTouchableHighlight
			animation={true}
			disabled={disabled}
			pressed={pressed}
			colours={["#4D97FF", "#1865D2"]}
			text={text ?? "Continue"}
			textColor="#fff"
			fontSize={fontSize["font-size-5"] * ratioY}
			backgroundColor="#2565BF"
			borderRadius={6}
			height={btnHeight ?? 48 * ratioY}
			prelim={prelim}
			width={width}
		/>
	);
};

export default ContinueWithAnimation;
