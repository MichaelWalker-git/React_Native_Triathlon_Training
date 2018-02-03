import React from 'react';
import {Slider, StyleSheet, Text, View} from 'react-native';
import {gray} from "../utils/colors";

export default function UdaciSlider({max, unit, step, value, onChange}) {
	return (
		<View style={styles.row}>
			<Slider
				style={{flex: 1}}
				maximumValue={max}
				minimumValue={0}
				step={step}
				unit={unit}
				onValueChange={onChange}
				value={value}
			/>
			<View style={styles.metricCounter}>
				<Text style={{fontSize: 24, textAlign: 'center'}}>{unit}</Text>
				<Text style={{fontSize: 18, color: gray }}>{value}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
	},
	metricCounter: {
		width: 85,
		justifyContent: 'center',
		alignItems: 'center',
	}
});