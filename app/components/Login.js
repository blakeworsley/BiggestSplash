import React, { Component } from 'react';
import Auth0Lock from 'react-native-lock';
import Search from './Search';
import Profile from './Profile';
import profileContainer from '../containers/profileContainer';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const credentials = require('../../auth0-credentials');
const lock = new Auth0Lock(credentials);

class Login extends Component{
  constructor (props) {
    super(props);
  }

  onLogin() {
    const { getProfile } = this.props;

    lock.show({}, (error, profile, token) => {
        if (error) {
          console.log(error);
          return;
        }
        getProfile(profile);
        this.props.navigator.push({
          component: Search,
          title: 'Search for photographers',
          token: token
        });
      });
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

export default profileContainer(Login);
