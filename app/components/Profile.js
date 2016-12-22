import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import profileContainer from '../containers/profileContainer';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user.toJS()
    if(user) {
      return (
        <View style={styles.container}>
          <Image style={styles.avatar} source={{uri: user.picture}} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      )
    }
    return (null)
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
  name: {
    fontSize: 30,
    fontWeight: '300',
  },
  email: {
    fontSize: 18,
    fontWeight: '100',
    margin: 20,
  },
  avatar: {
    borderRadius: 75,
    height: 150,
    margin: 25,
    width: 150,
  }
});

export default profileContainer(Profile)
