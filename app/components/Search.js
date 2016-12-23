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
      this.setState({
        search: ''
    });
  }

  render() {
    let photographers = this.props.photographers;
    let user = this.props.user;
    if(user) {
      return (
        <View style={styles.container}>
          <View style={styles.searchArea}>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              placeholder='Search by Location'
              onChangeText={search => this.setState({search})}
              value={this.state.search}
            />
            <TouchableHighlight
              style={styles.submit}
              underlayColor='#a4a2a2'
              onPress={() => {this.fetchPhotographerInfo()}}
            >
              <Text>Submit</Text>
            </TouchableHighlight>
          </View>

          <ScrollView style={styles.photographerList}>
            { photographers.length
              ? photographers.map((photographer, index) => {
                return (
                  <TouchableHighlight
                  underlayColor={photographer.color}
                  key={index}
                  id={index}
                  style={styles.photographersTouchable}
                  onPress={() => {
                    this.toPhotographerProfile(index);
                  }}>
                    <View style={styles.photographerCard}>
                      <View style={styles.photoView}>
                        <Image
                          style={styles.img}
                          source={{uri: photographer.user.profile_image.medium }}
                        />
                      </View>
                      <View style={styles.bio}>
                        <Text style={styles.boldText}>{photographer.user.name}</Text>
                        <Text style={styles.text}>Likes: {photographer.user.total_likes}</Text>
                      </View>
                      <View style={styles.rankView}>
                        <Text style={styles.rankText}>{index + 1}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                )
              })
              : <View style={styles.instructions}>
                  <Text style={styles.boldText}>
                  Please Enter a City to Search for a Photographer
                  </Text>
                </View>
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
    width: 50,
  },
  searchArea: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 80,
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
    height: 100,
  },
  photographersTouchable: {
    borderRadius: 10,
    marginBottom: 2,
    marginTop: 2,
  },
  bio: {
    flex: 2,
    justifyContent: 'center',
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
    flex: 1,
    justifyContent: 'center',
  },
  photoView: {
    alignItems: 'center',
    flex: 1,
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
  },
  photographerCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    flexDirection: 'row',
    height: 100,
  },
  instructions: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.6
  }
});

export default photographersContainer(
                profileContainer(Search)
              )
