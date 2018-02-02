import React from 'react';
import { View,
  StyleSheet,
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
        <View style={styles.container}>
          <AddEntry/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    backgroundColor: '#E53224',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText : {
    color: '#fff'
  }
});
