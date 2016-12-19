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
  Image
} from 'react-native';
import Photographer from './Photographer';

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

  toPhotographerProfile(index) {
    const photographer = this.props.photographers[index];
    this.props.navigator.push({
       component: Photographer, title: 'Photographer', photographer: photographer
    });
  }

  fetchPhotographerInfo() {
    const { getPhotographers } = this.props;
    let photographersArray = [];
    let url = `https://api.unsplash.com/search/photos?page=1&query=${this.state.search}&${secretkeyKirsten}`;
    fetch(url, {method: 'GET'})
      .then((response) => response.json())
      .then((responseData) => {
        responseData.results.map((i) => photographersArray.push(i));
        getPhotographers(photographersArray);
        if(photographersArray.length > 0) {
          Alert.alert(
            'Request Successful',
            `There are ${photographersArray.length} photos in ${this.state.search}`,
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
    const { photographers, user } = this.props;
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
              ? photographers.map((photographer, index) => {
                return (
                  <TouchableHighlight key={index} id={index} onPress={() => {
                    this.toPhotographerProfile(index);
                  }}>
                    <View >
                      <Image 
                        style={{width: 50, height: 50, borderRadius: 25}}
                        source={{uri: photographer.user.profile_image.medium }}
                      />
                      <Text>Photographer: {photographer.user.name}</Text>
                      <Text>Total Likes: {photographer.user.total_likes}</Text>
                      <Text>Username: {photographer.user.username}</Text>
                    </View>
                  </TouchableHighlight>
                )
              }) 
              : <View><Text>No Photographers in this area</Text></View>
            }
           </ScrollView>
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
  }
});

export default photographersContainer(
                profileContainer(Search)
              )
