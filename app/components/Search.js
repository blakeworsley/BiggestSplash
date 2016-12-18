import React, { Component } from 'react';
const { secretkeyBlake, secretkeyKirsten } = require('../../secretkey');
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  View,
  ScrollView,
} from 'react-native';

import photographersContainer from '../containers/photographersContainer';

class Search extends Component {
  constructor() {
    super();
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
      })
      .catch((error) => {
        console.log(error);
      })
    .done();
  }

  render() {
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
        <View>
          <Text>Photographer: {this.state.photographer}</Text>
          <Text>Total Photos: {this.state.photos}</Text>
          <Text>Total Likes: {this.state.likes}</Text>
          <Text>Total Downloads: {this.state.downloads}</Text>
          <Text>Unsplash Portfolio: {this.state.photographerPortfolio}</Text>
        </View>
      </View>
    );
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

export default photographersContainer(Search);
