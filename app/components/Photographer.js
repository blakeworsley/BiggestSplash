import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';

class Photographer extends Component {
  render() {
    const { photographer } = this.props;
    console.log(this.props.photographer)
    return (
      <View style={styles.container}>
        <Text>Photographer: </Text>
        <Text>{photographer.name} </Text>
        <View>
            <Text>Likes:
               {photographer.likes &&
                  <Animated.View style={[styles.bar, styles.likes, {width: photographer.likes}]} />
                }
            </Text>
            <Text>Total Photos:
              {photographer.photos &&
                <Animated.View style={[styles.bar, styles.totalPhotos, {width: photographer.photos}]} />
              }
            </Text>
          </View>
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
