import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';

import photographersContainer from '../containers/photographersContainer';

class DataVisuals extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { photographer } = this.props;
    const { user } = photographer;
    return (
      <View style={styles.container}>
        <Text>Likes:
          <Animated.View style={[styles.bar, styles.likes, { width: user.total_likes }]} />
          <Text>{user.total_likes}</Text>
        </Text>
        <Text>Total Photos:
          <Animated.View style={[styles.bar, styles.totalPhotos, { width: user.total_photos }]} />
          <Text>{user.total_photos}</Text>
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50,
  },
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 8,
    marginRight: 5
  },
  likes: {
    backgroundColor: '#6743f5'
  },
  totalPhotos: {
    backgroundColor: '#26996c'
  }
});

export default photographersContainer(DataVisuals);
