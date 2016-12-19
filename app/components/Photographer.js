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
              <Animated.View style={[styles.bar, styles.likes, {width: user.total_likes}]} />
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
