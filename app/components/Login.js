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
  Image,
  Dimensions
} from 'react-native';

const credentials = require('../../auth0-credentials');
const lock = new Auth0Lock(credentials);
let { height, width } = Dimensions.get('window');

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
        <Image
          style={styles.image}
          source={require('../../img/splash.png')}
        >
          <Text style={styles.title}>
            Biggest Splash
          </Text>
          <TouchableHighlight
            style={styles.loginButton}
            underlayColor='#3cd0bf'
            onPress={this.onLogin.bind(this)}
          >
            <Text>Login</Text>
          </TouchableHighlight>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#111',
    fontFamily: 'Helvetica-Bold',
    fontSize: 40,
    marginBottom: 30,
    marginTop: 190,
    textAlign: 'center',
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#30a194',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    width: 90,
  },
  image: {
    alignItems: 'center',
    flex: 1,
    height: height * 1,
    width: width * 1,
  }
});

export default profileContainer(Login);
