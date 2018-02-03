import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {getDailyReminderValue, getMetricMetaInfo, timeToString} from "../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";
import DateHeader from "./DateHeader";
import {Ionicons} from '@expo/vector-icons';
import TextButton from './TextButton';
import {removeEntry, submitEntry} from "../utils/api";
import {connect} from 'react-redux';
import {addEntry} from "../actions";
import {lightPurp, purple, white} from "../utils/colors";

function SubmitBtn ({onPress}) {
	return (
		<TouchableOpacity
			style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
			onPress={onPress}>
			<Text style={styles.submitBtnText}>Submit</Text>
		</TouchableOpacity>
	);
}

class AddEntry extends Component {
	state = {
		run: 0,
		bike: 0,
		swim: 0,
		sleep: 0,
		eat: 0
	};

	increment = (metric) => {
		const {max, step} = getMetricMetaInfo(metric);

		this.setState((state) => {
			const count = state[metric] + step;

			return {
				...state,
				[metric]: count > max ? max : count,
			}
		})
	};


	decrement = (metric) => {
		this.setState((state) => {
			const count = state[metric] - getMetricMetaInfo(metric).step;

			return {
				...state,
				[metric]: count < 0 ? 0 : count,
			}
		})
	};

	slide = (metric, value) => {
		this.setState(() => ({
			[metric]: value,
		}))
	};

	submit = () => {
		const key = timeToString();
		const entry = this.state;

		//Update redux
		this.props.dispatch(addEntry({
			[key]: entry
		}));

		this.setState(() => ({
			run: 0,
			bike: 0,
			swim: 0,
			sleep: 0,
			eat: 0
		}));
		// Navigate home

		// Save to DB
		submitEntry({entry, key});

		// Clear local notification
	};

	reset = () => {
		const key = timeToString();

		this.props.dispatch(addEntry({
			[key]: getDailyReminderValue()
		}));
	//	Update Redux

	//	Route to Home
		removeEntry(key);
	//	Update DB
	};

	render(){
		const metaInfo = getMetricMetaInfo();
		if(this.props.alreadyLogged){
			return (
				<View style={styles.center}>
					<Ionicons
					name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
					size={100}/>
					<Text>You already logged your information for today</Text>
					<TextButton style={{padding: 10, alignContent: 'center'}} onPress={this.reset}>
						Reset
					</TextButton>
				</View>
			)
		}

		return (
			<View style={styles.container}>
				<DateHeader
					date={(new Date()).toLocaleDateString()}
				/>
				{Object.keys(metaInfo).map((key ) => {
					const {getIcon, type, unit, ...rest} = metaInfo[key];
					const value = this.state[key];

					return (
						<View key={key} style={styles.row}>
							{getIcon()}
							{type === 'slider'
							? <UdaciSlider
									value={value}
									unit={unit}
									onChange={(value) => this.slide(key, value)}
									{...rest}
								/> : <UdaciSteppers
									value={value}
									unit={unit}
									onIncrement={() => this.increment(key)}
									onDecrement={() => this.decrement(key)}
								/>
							}
						</View>
					)
				})}
				<SubmitBtn onPress={this.submit}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: white,
		flex: 1
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	iosSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
	},
	androidSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 2,
		height: 45,
		marginLeft: 30,
		marginRight: 30,
		alignSelf: 'flex-end',
		alignItems: 'center',
		justifyContent: 'center'
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		marginLeft: 30,
		marginRight: 30,
	}
});

function mapStateToProps(state){
	const key = timeToString();
	return {
		alreadyLogged: state[key] && typeof state[key].today === 'undefined'
	}
}

export default connect(mapStateToProps)(AddEntry);
