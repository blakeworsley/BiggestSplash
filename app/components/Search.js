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
  Image
} from 'react-native';
import Photographer from './Photographer';

import photographersContainer from '../containers/photographersContainer';
import profileContainer from '../containers/profileContainer';

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
  },
  img: {
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchArea: {  
    flexDirection: 'row',
    marginTop: 65,
    marginBottom: 20,
  },
  input: {
    flex: 2,
    height: 40,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 5,
    padding: 5,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
  },
  photographerList: {
    marginLeft: 10,
    marginRight: 10,
  },
  photographer: {
    backgroundColor: '#F9F9F9',    
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 2,
    borderRadius: 10,
  },
  bio: {
    margin: 10,
    padding: 10,
  },
  boldText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 16,
    color: '#707070',
    marginBottom: 5,
  },
  text: {
    fontFamily: 'Helvetica-Light',
    fontSize: 14,
    color: '#707070',
  },
  rankView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 30,
    color: '#888899',
  },
  submit: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 5,
    height: 40,
    padding: 5,
    backgroundColor: '#888',
    borderRadius: 10,
  }
});

export default photographersContainer(
                profileContainer(Search)
              )
