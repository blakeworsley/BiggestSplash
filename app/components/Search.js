import React, { Component } from 'react';
const { secretkeyBlake, secretkeyKirsten } = require('../../secretkey');
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  View,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';

import photographersContainer from '../containers/photographersContainer';
import profileContainer from '../containers/profileContainer';

class Search extends Component {
  constructor(props) {
    super(props);
    const width = {likes: 0, totalPhotos: 0};
    this.state = {
      search: '',
      photographer: '',
      photos: '',
      photographerPortfolio: '',
      photographers: '',
      likes: new Animated.Value(width.likes),
      totalPhotos: new Animated.Value(width.totalPhotos)
    };
  }

  fetchPhotographerInfo() {
    const { getPhotographers } = this.props;
    let arr = [];
    let url = `https://api.unsplash.com/search/photos?page=1&query=${this.state.search}&${secretkeyKirsten}`;
    fetch(url, {method: 'GET'})
      .then((response) => response.json())
      .then((responseData) => {
        responseData.results.map((i) => {
          // let downloads = i.downloads ? i.downloads : 0
          let score = i.user.total_likes / i.user.total_photos;
          arr.push({
            score: score,
            name: i.user.name,
            likes: i.user.total_likes,
            photos: i.user.total_photos,
            username: i.user.username,
            totalPhotos: i.user.total_photos,
            // downloads: downloads
          });
        });
        getPhotographers(arr);
        this.setState({
          likes: arr[1].likes,
          totalPhotos: arr[1].totalPhotos
        });
        if(arr.length > 0) {
          Alert.alert(
            'Request Successful',
            `There are ${arr.length} photos in ${this.state.search}`,
            [
              { text: 'OK' },
            ]
          );
        }
      })
      .catch((error) => {
        getPhotographers([]);
          Alert.alert(
            'Request Failed',
            'Please try another location',
            [
              { text: 'OK' },
            ]
          );
          console.log(error);
        })
    .done();
  }

  render() {
    const { likes, totalPhotos } = this.state;
    const { photographers, user } = this.props;
    console.log(photographers);
    if(user) {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            placeholder='Search by Location'
            onChangeText={ search => this.setState({search}) }
            value={ this.state.search }
          />
          <TouchableHighlight
            style={styles.submit}
            onPress={() => {this.fetchPhotographerInfo()}}
          >
            <Text>Submit</Text>
          </TouchableHighlight>

          <ScrollView>
             { photographers
               ? photographers.map((photographer, i) => {
                 return (
                   <View key={i}>
                     <Text>Photographer: {photographer.name}</Text>
                     <Text>Total Score: {photographer.score}</Text>
                     <Text>Total Likes: {photographer.likes}</Text>
                     <Text>Total Downloads: {photographer.downloads}</Text>
                     <Text>Username: {photographer.username}</Text>
                   </View>
                 )
               })
               : <View><Text>No Photographers in this area</Text></View>
             }
           </ScrollView>

          <View>
            <Text>Likes:
               {likes &&
                  <Animated.View style={[styles.bar, styles.likes, {width: likes}]} />
                }
            </Text>
            <Text>Total Photos:
              {totalPhotos &&
                <Animated.View style={[styles.bar, styles.totalPhotos, {width: totalPhotos}]} />
              }
            </Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 30,
    textAlign: 'center',
    margin: 20,
    marginTop: 80,
    backgroundColor: '#eee',
    padding: 5
  },
  text: {
    textAlign: 'center',
    color: '#111',
    marginBottom: 5
  },
  submit: {
    backgroundColor: 'green',
    height: 20,
    width: 50
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

export default photographersContainer(
                profileContainer(Search)
              )
