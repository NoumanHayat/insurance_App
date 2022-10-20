import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg } from 'react-native-svg';
import { useSharedValue } from 'react-native-reanimated';

import IndicatorSegment from './IndicatorSegment';
import { getSegmentCoordinates, getMyCoordinates, getMaxAndMinSegmentLengths, getMyColours } from '../../../../lib/utils/indicator';

/** This is an animated indicator designed to work with a Carousel which indicates the currenly active page.
 * 	@param {Number} numberOfSegments  - This value should be equal to the number of pages in the carousel.
 *  @param {Number} gapPercentage - This is the value which determines the length of the white-space between
 * 	segments.
 * 	@param {AnimatedValue} offsetSV - This is the shared value which is equal to the `event.contentOffset.x`
 * 	value being returned by the Carousel's scroll handler.
 * 	@param {String[]} startColours - This is an array of hex code strings which will determine the start colour(s)
 * 	of the segments.
 * 	@param {String[]} finishColours - This is an array of hex code strings which will determine the finish
 * 	colour(s) of the segments.
 * 	@param {AnimatedValue} pageWidthSV - This is the shared value which is equal to width of the carousel
 */
const Indicator = ({ numberOfSegments, gapPercentage, offsetSV, pageWidthSV, startColours, finishColours }) => {

	const styles = StyleSheet.create({
		container: {
			width: "100%",
			alignItems: "center"
		},
		button: {
			marginBottom: 30
		},
		text: {
			color: "#fff",
			fontSize: 24,
			borderColor: "#fff",
			borderWidth: 2,
			padding: 10
		}
	})

	const mockArray = Array.from({ length: numberOfSegments }).fill(true);

	const segmentsPointsDefault = getSegmentCoordinates(numberOfSegments, gapPercentage);
	const segmentsPointsSV = useSharedValue(segmentsPointsDefault);

	const { maxLength, minLength } = getMaxAndMinSegmentLengths(numberOfSegments, gapPercentage);

	return (
		<View
			style={styles.container}
		>
			<Svg
				height="4"
				width="100%">
				{mockArray.map((_, index) => {
					const { x1, x2 } = getMyCoordinates(index, segmentsPointsSV.value, gapPercentage);
					const { startColour, finishColour } = getMyColours(startColours, finishColours, index);
					return (
						<IndicatorSegment
							pageWidthSV={pageWidthSV}
							index={index}
							offsetSV={offsetSV}
							strokeWidth="4"
							maxLength={maxLength}
							minLength={minLength}
							key={index}
							initialX1={x1}
							initialX2={x2}
							startColour={startColour}
							finishColour={finishColour}
						/>
					)
				})}
			</Svg>
		</View>

	)
}

export default Indicator;