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
      photographerPortfolio: ''
    };
  }

  fetchPhotographerInfo() {
    const { getPhotographers } = this.props;
    let url = `https://api.unsplash.com/search/photos?page=1&query=${this.state.search}&${secretkeyKirsten}`;
    fetch(url, {method: 'GET'})
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        getPhotographers(responseData.results);
        debugger
        Alert.alert(
          'Request Successful',
          `There are ${responseData.total} photos in ${this.state.search}`,
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
          {/* <View>
            <Text>Photographer: {this.state.photographer}</Text>
            <Text>Total Photos: {this.state.photos}</Text>
            <Text>Total Likes: {this.state.likes}</Text>
            <Text>Total Downloads: {this.state.downloads}</Text>
            <Text>Unsplash Portfolio: {this.state.photographerPortfolio}</Text>
          </View> */}
          {/* <View>{photographers}</View> */}
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
