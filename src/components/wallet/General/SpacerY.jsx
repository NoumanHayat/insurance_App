import React from "react";
import { Svg, Line } from "react-native-svg";

const SpacerY = ({ height }) => {
	return (
		<Svg height={height} width={1}>
			<Line
				fill="none"
				stroke="#D3D9DE"
				y1={0}
				x={0}
				y2={height}
				strokeLinecap="round"
			/>
		</Svg>
	);
};

export default SpacerY;
