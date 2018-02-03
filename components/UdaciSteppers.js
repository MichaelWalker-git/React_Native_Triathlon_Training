import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import {gray, purple, white} from "../utils/colors";

export default function UdaciSteppers({max, unit, step, value,  onIncrement, onDecrement}) {
	return (
		<View style={[styles.RightStepper, {justifyContent: 'space-between'}]}>
			{Platform.OS === 'ios' ? 		<View style={{flexDirection: 'row'}}>
				<TouchableOpacity
					style={[styles.iosBtn, {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}
					onPress={onDecrement}>
					<FontAwesome name='minus' size={30} color={purple}/>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.iosBtn, {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}
					onPress={onIncrement}>
					<FontAwesome name='plus' size={30} color={purple}/>
				</TouchableOpacity>
			</View> :
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity
						style={[styles.androidBtn, {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}
						onPress={onDecrement}>
						<FontAwesome name='minus' size={30} color={purple}/>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.androidBtn, {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}
						onPress={onIncrement}>
						<FontAwesome name='plus' size={30} color={purple}/>
					</TouchableOpacity>
				</View>
			}
			<View style={styles.metricCounter}>
				<Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
				<Text style={{fontSize: 18, color: gray}}>{unit}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	RightStepper: {
		flexDirection: 'row',
		alignContent: 'center',
		flex: 1,
	},
	metricCounter: {
		width: 85,
		justifyContent: 'center',
		alignContent: 'center'
	},
	iosBtn: {
		backgroundColor: white,
		borderColor: purple,
		borderWidth: 1,
		borderRadius: 3,
		padding: 5,
		paddingLeft: 25,
		paddingRight: 25,
	},
	androidBtn: {
		margin: 5,
		backgroundColor: purple,
		padding: 10,
		borderRadius: 2,
	}
});
