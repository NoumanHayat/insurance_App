import React from "react";
import CustomTouchableHighlight from "./CustomTouchableHighlight";
import { fontSize } from "../../styles/global";

const SignInButton = ({ disabled, pressed }) => {
	return (
		<CustomTouchableHighlight
			disabled={disabled}
			pressed={pressed}
			colours={["#FFF0BC", "#FFD84D"]}
			text="Sign in"
			textColor="#222426"
			fontSize={fontSize["font-size-5"]}
			backgroundColor="#FFD53D"
			borderRadius={6}
			height={48}
		/>
	);
};

export default SignInButton;
