import React from "react";
import { Svg, Line } from "react-native-svg";

const SpacerX = ({ width }) => {
	return (
		<Svg height={1} width={width}>
			<Line
				fill="none"
				stroke="#D3D9DE"
				y={0}
				x1={0}
				x2={width}
				strokeLinecap="round"
			/>
		</Svg>
	);
};

export default SpacerX;
