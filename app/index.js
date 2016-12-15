import React, { Component } from 'react';
import Search from './screens/Search';
import Login from './screens/Login';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class BiggestSplash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Biggest Splash
        </Text>
        <Text style={styles.text}>
          An app to rate photographers in Unsplash.
        </Text>
        <Search
        />
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
