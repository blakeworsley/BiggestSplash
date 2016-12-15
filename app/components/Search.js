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
      photographerPortfolio: ''
    }
  }

  fetchPhotographerInfo() {
    let url = `https://api.unsplash.com/photos/random?query=${this.state.search}&${secretkeyKirsten}`
    fetch(url, {method: 'GET'})
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          photographer: responseData.user.name,
          photos: responseData.user.total_photos,
          likes: responseData.user.total_likes,
          downloads: responseData.downloads,
          photographerPortfolio: responseData.links.html
        })
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