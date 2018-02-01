import React from 'react';
import {Slider, Text, View} from 'react-native';

export default function UdaciSlider({max, unit, step, value, onChange}) {
	return (
		<View>
			<Slider
				maximumValue={max}
				minimumValue={0}
				step={step}
				unit={unit}
				onValueChange={onChange}
				value={value}
			/>
			<View>
				<Text>{unit}</Text>
				<Text>{value}</Text>
			</View>
		</View>
	)
}