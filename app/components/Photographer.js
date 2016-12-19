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
    console.log(this.props.photographer)
    return (
      <View style={styles.container}>
        <Text>Photographer: </Text>
        <Text>{photographer.user.name} </Text>
        <View>
          <Image 
            style={{width: 100, height: 100, borderRadius: 50}}
            source={{uri: photographer.user.profile_image.large }}
          />
          <Text>Likes:
              {photographer.user.total_likes &&
                <Animated.View style={[styles.bar, styles.total_likes, {width: photographer.user.total_likes}]} />
              }
          </Text>
          <Text>Total Photos:
            {photographer.user.total_photos &&
              <Animated.View style={[styles.bar, styles.totalPhotos, {width: photographer.user.total_photos}]} />
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


      // .then((responseData) => {
      //   responseData.results.map((i) => {
      //     debugger;
          
      //     // let downloads = i.downloads ? i.downloads : 0
      //     let score = i.user.total_likes / i.user.total_photos;
      //     photographersArray.push({
      //       score: score,
      //       name: i.user.name,
      //       likes: i.user.total_likes,
      //       photos: i.user.total_photos,
      //       username: i.user.username,
      //       totalPhotos: i.user.total_photos,
      //       user: i
      //       // downloads: downloads
      //     });
      //   });