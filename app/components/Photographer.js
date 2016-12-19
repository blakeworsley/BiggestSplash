import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image
} from 'react-native';

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
        <Text>Likes:
            {user.total_likes &&
              <Animated.View style={[styles.bar, styles.total_likes, {width: user.total_likes}]} />
            }
        </Text>
        <Text>Total Photos:
          {user.total_photos &&
            <Animated.View style={[styles.bar, styles.totalPhotos, {width: user.total_photos}]} />
          }
        </Text>
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
  },
});

export default Photographer;