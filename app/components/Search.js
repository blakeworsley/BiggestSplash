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
} from 'react-native';

import photographersContainer from '../containers/photographersContainer';
import profileContainer from '../containers/profileContainer';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      photographer: '',
      photos: '',
      likes: '',
      downloads: '',
      photographerPortfolio: '',
      photographers: ''
    };
  }

  fetchPhotographerInfo() {
    const { getPhotographers } = this.props;
    let arr = [];
    let url = `https://api.unsplash.com/search/photos?page=1&query=${this.state.search}&${secretkeyKirsten}`
    fetch(url, {method: 'GET'})
      .then((response) => response.json())
      .then((responseData) => {
        responseData.results.map((i) => {
          let downloads = i.downloads ? i.downloads : 0
          let score = (downloads + i.user.total_likes) / i.user.total_photos;          
          arr.push({
            score: score,
            name: i.user.name, 
            likes: i.user.total_likes, 
            photos: i.user.total_photos, 
            username: i.user.username, 
            downloads: downloads
          });
        });
        getPhotographers(arr);
        console.log(arr, getPhotographers);
        Alert.alert(
          'Request Successful',
          `There are ${arr.length} photos in ${this.state.search}`,
          [
            { text: 'OK' },
          ]
        );
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
    console.log(photographers, user);
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
                <View key={i}>
                  <Text>Photographer: {photographer.name}</Text>
                  <Text>Total Score: {photographer.score}</Text>
                  <Text>Total Likes: {photographer.likes}</Text>
                  <Text>Total Downloads: {photographer.downloads}</Text>
                  <Text>Username: {photographer.username}</Text>
                </View>
              }) 
              : <Text>No Photographers in this area</Text>
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
