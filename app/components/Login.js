import React, { Component } from 'react';
import Auth0Lock from 'react-native-lock';
import Search from './Search';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const credentials = require('../../auth0-credentials');
const lock = new Auth0Lock(credentials);

export default class Login extends Component{
  constructor () {
   super()
 }

 onLogin() {
   lock.show({
   }, (error, profile, token) => {
     if (error) {
       console.log(error);
       return;
     }
     this.props.navigator.push({
       component: Search,
       title: 'Search for photographers',
     })
   })
 }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Biggest Splash
        </Text>
        <TouchableHighlight
          style={styles.loginButton}
          underlayColor='#949494'
          onPress={this.onLogin.bind(this)}>
          <Text>Login</Text>
        </TouchableHighlight>
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
  loginButton: {
    width: 50,
    height: 20,
    backgroundColor: '#5156cc',
  }
});
