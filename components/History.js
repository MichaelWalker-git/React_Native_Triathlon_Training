import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {connect} from 'react-redux';
import {receiveEntries, addEntry} from "../actions";
import { timeToString, getDailyReminderValue} from "../utils/helpers";
import {FetchCalendarResults } from '../utils/api';
import UdaciFitnessCalendar from 'udacifitness-calendar';

class History extends Component {
	componentDidMount(){
		const {dispatch} = this.props;

		FetchCalendarResults()
			.then((entries) => dispatch(receiveEntries(entries)))
			.then(({entries}) => {
				if(!entries[timeToString()]){
					dispatch(addEntry({
						[timeToString()]: getDailyReminderValue()
					}))
				}
			})
			.then(() => this.setState(() => ({ready: true})))
	}

	renderItem = ({today, ...metrics}, formatted) => {

	};

	render() {
		const {entries} = this.props;

		return (
			<View>
				<UdaciFitnessCalendar
					items={entries}
					renderItem={this.renderItem}
					renderEmptyDate={this.renderEmptyDate}
				/>
			</View>
		)
	}
}

function mapStateToProps(entries){
	return {
		entries
	}
}

export default connect(mapStateToProps)(History);