import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions
} from 'react-native';
let { height, width } = Dimensions.get('window');

import photographersContainer from '../containers/photographersContainer';
import DataVisuals from './DataVisuals';

class Photographer extends Component {
  render() {
    const { photographer } = this.props;
    const { user } = photographer;
    return (
      <View style={styles.container}>
        <Image
          style={{width: 100, height: 100, borderRadius: 50}}
          source={{uri: user.profile_image.large }}
        />
        <Text>{user.name} </Text>
        <Text>{user.bio} </Text>
        <Text>Location: {user.location}</Text>
        <Text>Portfolio: {user.portfolio_url}</Text>
        <DataVisuals photographer={photographer} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    margin: 20,
  }
});

export default photographersContainer(Photographer);
