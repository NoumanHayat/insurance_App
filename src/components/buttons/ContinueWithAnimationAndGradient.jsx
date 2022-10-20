import React, { useContext } from "react";
import { useWindowDimensions } from "react-native";

import CustomTouchableHighlight from "./CustomTouchableHighlight";
import { fontSize } from "../../styles/global";
import UserContext from "../../context/context";
import FadedButtonContainer from "./FadedButtonContainer";

const ContinueWithAnimationAndGradient = ({ disabled, pressed, pageColor }) => {

	const { height } = useWindowDimensions();
	const { modelY } = useContext(UserContext);
	const ratioY = height / modelY;

	return (
		<FadedButtonContainer pageColor={pageColor}>
			<CustomTouchableHighlight
				animation={true}
				disabled={disabled}
				pressed={pressed}
				colours={["#4D97FF", "#1865D2"]}
				text="Continue"
				textColor="#fff"
				fontSize={fontSize["font-size-5"] * ratioY}
				backgroundColor="#2565BF"
				borderRadius={6}
				height={48 * ratioY}
			/>
		</FadedButtonContainer>
	);
};

export default ContinueWithAnimationAndGradient;
