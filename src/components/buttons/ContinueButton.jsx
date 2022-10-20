import React from "react";
import CustomTouchableHighlight from "./CustomTouchableHighlight";
import { fontSize } from "../../styles/global";

const ContinueButton = ({ disabled, pressed }) => {
	return (
		<CustomTouchableHighlight
			disabled={disabled}
			pressed={pressed}
			colours={["#4D97FF", "#1865D2"]}
			text="Continue"
			textColor="#fff"
			fontSize={fontSize["font-size-5"]}
			backgroundColor="#2565BF"
			borderRadius={6}
			height={48}
		/>
	);
};

export default ContinueButton;
