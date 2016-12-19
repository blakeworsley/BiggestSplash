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
  Image,
  Dimensions
} from 'react-native';
import Photographer from './Photographer';

import photographersContainer from '../containers/photographersContainer';
import profileContainer from '../containers/profileContainer';

let { height, width } = Dimensions.get('window');

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
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
    let url = `https://api.unsplash.com/search/photos?page=1&query=${this.state.search}&${secretkeyKirsten}`;
    fetch(url, {method: 'GET'})
      .then((response) => response.json())
      .then((responseData) => {
        getPhotographers(responseData.results);
        if(responseData.results.length > 0) {
          Alert.alert(
            'Request Successful',
            `There are ${responseData.results.length} photos in ${this.state.search}`,
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
          <View style={styles.searchArea}>
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
          </View>

      <ScrollView style={styles.photographerList}>
            { photographers
              ? photographers.map((photographer, index) => {
                return (
                  <TouchableHighlight
                  key={index}
                  id={index}
                  onPress={() => {
                    this.toPhotographerProfile(index);
                  }}>
                    <View style={styles.photographer}>
                      <Image
                        style={styles.img}
                        source={{uri: photographer.user.profile_image.medium }}
                      />
                      <View style={styles.bio}>
                        <Text style={styles.boldText}>{photographer.user.name}</Text>
                        <Text style={styles.text}>Likes: {photographer.user.total_likes}</Text>
                      </View>
                      <View style={styles.rankView}>
                        <Text style={styles.rankText}>1</Text>
                      </View>
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
  container: {
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    borderRadius: 25,
    height: 50,
    margin: 20,
    width: 50,
  },
  searchArea: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 65,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    flex: 2,
    height: 40,
    marginLeft: 10,
    marginRight: 5,
    padding: 5,
    textAlign: 'center',
  },
  photographerList: {
    marginLeft: 10,
    marginRight: 10,
    width: width * 0.9,
  },
  photographer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 2,
  },
  bio: {
    margin: 10,
    padding: 10,
  },
  boldText: {
    color: '#707070',
    fontFamily: 'Helvetica-Bold',
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    color: '#707070',
    fontFamily: 'Helvetica-Light',
    fontSize: 14,
  },
  rankView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    color: '#888899',
    fontFamily: 'Helvetica-Bold',
    fontSize: 30,
  },
  submit: {
    alignItems: 'center',
    backgroundColor: '#888',
    borderRadius: 10,
    flex: 1,
    height: 40,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 10,
  }
});

export default photographersContainer(
                profileContainer(Search)
              )
