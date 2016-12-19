import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Photographer extends Component {
  render() {
    console.log(this.props.photographer)
    return (
      <View style={styles.container}>
        <Text>Photographer: </Text>
        <Text>{this.props.photographer.name} </Text>
      </View>
    )
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

export default Photographer;
