import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import profileContainer from '../containers/profileContainer';
import Login from './Login';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    this.props.navigator.pop({
      component: Login
    });
  }

  render() {
    const { user } = this.props;
    if(user) {
      return (
        <View style={styles.container}>
          <Image style={styles.avatar} source={{uri: user.picture}} />
          <Text style={styles.title}>{user.name}</Text>
          <Text style={styles.info}>{user.email}</Text>
          <TouchableHighlight
            style={styles.logout}
            onPress={() => this.logout()}>
            <Text>Logout</Text>
          </TouchableHighlight>
        </View>
      )
    }
    return (null)
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 200,
  },
  title: {
    fontSize: 30,
    margin: 20,
    fontWeight: '300',
  },
  info: {
    fontSize: 18,
    margin: 20,
    fontWeight: '100',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  logout: {
    backgroundColor: 'blue',
    height: 20,
    width: 50,
  }
});

export default profileContainer(Profile)
