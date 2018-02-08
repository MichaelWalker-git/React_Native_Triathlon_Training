import React from 'react';
import {
	View,
	StyleSheet, SafeAreaView, Platform, StatusBar
} from 'react-native';
import AddEntry from "./components/AddEntry";
import { createStore } from 'redux';
import { Provider} from 'react-redux';
import reducer from './reducers'
import History from "./components/History";
import {StackNavigator, TabNavigator} from 'react-navigation';
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {Constants} from 'expo';
import EntryDetail from "./components/EntryDetail";
import Live from "./components/Live";
import {setLocalNotification} from "./utils/helpers";

function UdacisStatusBar({backgroundColor, ...props}){
	return (
		<View style={{backgroundColor, height: Constants.statusBarHeight}}>
			<StatusBar translucent backgroundColor={backgroundColor}
								 {...props}/>
		</View>
	)
}

const Tabs = TabNavigator({
	History: {
		screen: History,
		navigationOptions : {
			tabBarLabel: 'History',
			tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks'
																						 color={tintColor}
																						 size={30}/>
		}
	},
	AddEntry: {
		screen: AddEntry,
		navigationOptions: {
			tabBarLabel: 'Add Entry',
			tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square'
																						 color={tintColor}
																						 size={30}/>
		}
	},
	Live: {
		screen: Live,
		navigationOptions: {
			tabBarLabel: 'Live',
			tabBarIcon: ({tintColor}) => <Ionicons name='ios-speedometer'
																								color={tintColor}
																								size={30}/>
		}
	}
}, {
	navigationOptions: {
		headers: null
	}
	},
	{
	tabBarOptions:{
		activeTintColor: Platform.OS === 'ios' ? purple : white,
		style: {
			height: 56,
			backgroundColor: Platform.OS === 'ios' ? white: purple,
			shadowColor: 'rgba(0,0,0,0.24)',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1,
		}
	}
});

const MainNavigator = StackNavigator({
	Home: {
		screen: Tabs,
	},
	EntryDetail: {
		screen: EntryDetail,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			}
		}
	}
});

export default class App extends React.Component {
  state = {
    value: 0,
  };
  componentDidMount(){
  	setLocalNotification();
	}

  render() {
    return (
      <Provider store={createStore(reducer)}>
				<SafeAreaView style={styles.safeArea}>
          <View style={styles.main}>
						<UdacisStatusBar backgroundColor={purple} barStyle='light-content'/>
						<MainNavigator/>
          </View>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
  main: {
	  flex: 1,
  }
});