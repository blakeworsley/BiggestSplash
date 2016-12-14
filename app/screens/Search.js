import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class Search extends Component {
  constructor(){
    super();
    this.state = {
      search: '',
    }
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 100,
    height: 20,
    textAlign: 'center',
    margin: 20,
    backgroundColor: '#555',
    padding: 5
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});