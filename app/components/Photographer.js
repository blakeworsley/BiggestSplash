'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableHighlight,
  Linking,
  Dimensions
} from 'react-native';
import photographersContainer from '../containers/photographersContainer';
import DataVisuals from './DataVisuals';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

let { height, width } = Dimensions.get('window');

const link = (url) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) { Linking.openURL(url); }
    else {
      console.log('Don\'t know how to open URI: ' + url);
    }
  });
};

class Photographer extends Component {
  render() {
    const { photographer } = this.props;
    const { user } = photographer;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.centered}>
            <AnimatedCircularProgress
              size={220}
              width={10}
              fill={user.total_likes}
              style={styles.circle}
              tintColor="#00e0ff"
              backgroundColor="#3d5875">
              {
                (fill) => (
                  <Image
                    style={styles.img}
                    source={{uri: user.profile_image.large }}
                  />
                )
              }
            </AnimatedCircularProgress>
            <View style={styles.visualView}>
              <Text style={styles.boldText}>{user.name}</Text>
              <Text style={styles.text}>{user.bio}</Text>
              <Text style={styles.textBio}>Location: {user.location}</Text>
              <TouchableHighlight
                onPress={() => link(user.portfolio_url)}
              >
                <Text style={styles.textBio}>Portfolio: {user.portfolio_url}</Text>
              </TouchableHighlight>
              <Text style={styles.text}>Primary Photo Color: </Text>
              <View style={{
                backgroundColor: photographer.color,
                height: 100,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: width *0.8,
                alignSelf: 'center',
              }}>
                <Text style={{alignSelf: 'center', justifyContent: 'center', height: 100}}>{photographer.color}</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={styles.text}>Rated Photo:</Text>
                <Image
                  style={styles.thumbnail}
                  source={{uri:`${photographer.urls.thumb}`}}
                />
              </View>
            <DataVisuals photographer={photographer} />
            </View>
            <View style={styles.circularProgressView}>
              <View style={styles.circle}>
                <Text style={styles.text}>Likes</Text>
                <AnimatedCircularProgress
                  size={75}
                  width={10}
                  fill={user.total_likes}
                  style={styles.circle}
                  tintColor="#00e0ff"
                  backgroundColor="#3d5875">
                  {
                    (fill) => (
                      <Text style={styles.points}>
                        { user.total_likes }
                      </Text>
                    )
                  }
                </AnimatedCircularProgress>
                </View>
                <View style={styles.circle}>
                  <Text style={styles.text}>Total Photos</Text>
                  <AnimatedCircularProgress
                    size={75}
                    width={10}
                    fill={user.total_photos}
                    style={styles.circle}
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                      (fill) => (
                        <Text style={styles.points}>
                          { user.total_photos }
                        </Text>
                      )
                    }
                  </AnimatedCircularProgress>
                </View>
              </View>
           </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 60
  },
  points: {
    backgroundColor: 'transparent',
    color: '#888',
    color: '#7591af',
    fontFamily: 'HelveticaNeue-LightItalic',
    fontSize: 20,
    left: 3,
    position: 'absolute',
    textAlign: 'center',
    top: 25,
    width: 70,
  },
  scrollView: {
    width: width * 1,
  },
  circularProgressView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    top: -160,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  img: {
    borderRadius: 100,
    top: -210,
    height: 200,
    width: 200,
  },
  visualView: {
    flexWrap: 'wrap',
    padding: 10,
    top: -170,
    width: width * 0.8,
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    margin: 20,
  },
  boldText: {
    color: '#707070',
    fontFamily: 'Helvetica-Bold',
    fontSize: 30,
    marginBottom: 5,
    paddingBottom: 10,
  },
  text: {
    color: '#707070',
    fontFamily: 'HelveticaNeue-LightItalic',
    fontSize: 16,
    paddingBottom: 10,
    paddingTop: 10,
  },
  centered: {
    alignItems: 'center',
  },
  textBio: {
    color: '#707070',
    fontFamily: 'Helvetica-Light',
    fontSize: 16,
    paddingBottom: 10,
    paddingTop: 10,
  },
  thumbnail: {
    height: 200,
    width: 300,
    marginLeft: -10,
  }
});

export default photographersContainer(Photographer);
