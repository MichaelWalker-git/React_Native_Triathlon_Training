import React from 'react';
import {
	View,
	StyleSheet, SafeAreaView,
} from 'react-native';
import AddEntry from "./components/AddEntry";
import { createStore } from 'redux';
import { Provider} from 'react-redux';
import reducer from './reducers'

export default class App extends React.Component {
  state = {
    value: 0,
  };
  render() {
    return (
      <Provider store={createStore(reducer)}>
				<SafeAreaView style={styles.safeArea}>
          <View style={styles.main}>
            <AddEntry/>
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