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
let { height, width } = Dimensions.get('window');

class Photographer extends Component {
  render() {
    const { photographer } = this.props;
    const { user } = photographer;
    return (
      <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.centered}>
          <Image
            style={styles.img}
            source={{uri: user.profile_image.large }}
          />
          <View style={styles.visualView}>
            <Text style={styles.boldText}>{user.name}</Text>
            <Text style={styles.text}>{user.bio}</Text>
            <Text style={styles.textBio}>Location: {user.location}</Text>
            <TouchableHighlight 
              onPress={() => link(user.portfolio_url)}
            >
              <Text style={styles.textBio}>Portfolio: {user.portfolio_url}</Text>
            </TouchableHighlight>
            <Text style={styles.textBio}>Likes:
                {user.total_likes &&
                  <Animated.View style={[styles.bar, styles.likes, {width: user.total_likes}]} />
                }
            </Text>
            <Text style={styles.textBio}>Total Photos:
              {user.total_photos &&
                <Animated.View style={[styles.bar, styles.totalPhotos, {width: user.total_photos}]} />
              }
            </Text>
            <Text style={styles.text}>Color: </Text>
            <View style={{
              backgroundColor: photographer.color,
              height: 100,
              width: width *0.8,
              alignSelf: 'center',
            }}>
              <Text style={{alignSelf: 'center', justifyContent: 'center', height: 100}}>{photographer.color}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      </View>
    )
  }
}

const link = (url) => { 
  Linking.canOpenURL(url).then(supported => {
    if (supported) { Linking.openURL(url); } 
    else {
      console.log('Don\'t know how to open URI: ' + url);
    }
  });
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 60
  },
  scrollView: {
    width: width * 1,
  },
  img: {
    borderRadius: 100,
    height: 200,
    margin: 50,
    width: 200,
  },
  visualView: {
    flexWrap: 'wrap',
    padding: 10,
    width: width * 0.8,    
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
  },
  likes: {
    backgroundColor: '#6743f5'
  },
  totalPhotos: {
    backgroundColor: '#26996c'
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
});

export default Photographer;
