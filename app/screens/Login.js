import React, { Component } from 'react';
import Auth0Lock from 'react-native-lock';
import Search from './Search';
import {
  StyleSheet,
  Text,
  View,
  Image,
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
       title: 'Search for books',
       passProps: {
         profile: profile,
         token: token
       }
     })
   })
 }

  render() {
    return (
      <View>
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
  loginButton: {
    width: 50,
    height: 20,
    backgroundColor: '#5156cc',
  }
});
