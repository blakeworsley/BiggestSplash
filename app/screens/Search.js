import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  View,
} from 'react-native';

export default class Search extends Component {
  constructor(){
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

  fetchPhotographerInfo () {
    let url = `https://api.unsplash.com/photos/random?query=${this.state.search}&client_id=f3ff11ed9e9a4de213e05ff00fa5e4f503cdf0b595de8dfd2d59cad26f7efb3f`
    fetch(url, {method: 'GET'})
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          photographer: responseData.user.name,
          photos: responseData.user.total_photos,
          likes: responseData.user.total_likes,
          downloads: responseData.downloads,
          photographerPortfolio: responseData.links.html
        })
      })
      .catch((error) => {
        console.log(erros);
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
