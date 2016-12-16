import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import profileContainer from '../containers/profileContainer';

const Profile = ({ user }) => {
  if(user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{user.name}</Text>
        <Text style={styles.info}>{user.email}</Text>
        <Image style={styles.avatar} source={{uri: user.picture}} />
      </View>
    )
  }
  return (null)
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
    fontSize: 42,
    margin: 20,
    fontWeight: '300',
  },
  info: {
    fontSize: 18,
    margin: 20,
    fontWeight: '100',
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 75,
  }
});

export default profileContainer(Profile)
