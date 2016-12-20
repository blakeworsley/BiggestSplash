import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  Text,
  TouchableHighlight
} from 'react-native';

import Login from './Login';
import Search from './Search';
import Profile from './Profile';
import Photographer from './Photographer';

const routes = [
  { component: Login, title: 'Login to view photographers' },
  { component: Search, title: 'Search for most popular photo' },
  { component: Profile, title: 'Profile' }
];

export default class App extends Component {
  render() {
    return (
      <Navigator style={styles.navigator}
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => {
          let RouteComponent = route.component;
          return (
            <RouteComponent {...route} navigator={navigator} />
          )
        }}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={
              {
                LeftButton(route, navigator, index, navState) {
                  if(index === 2) {
                    return (
                      <TouchableHighlight underlayColor='#707070' onPress={() => navigator.pop()}>
                        <Text style={styles.prevButton}>Back</Text>
                      </TouchableHighlight>
                    )
                  }
                  if(index === 1) {
                    return (
                      <TouchableHighlight underlayColor='#707070' onPress={() => navigator.pop()}>
                        <Text style={styles.prevButton}>Logout</Text>
                      </TouchableHighlight>
                    )
                  }
                },

                RightButton(route, navigator, index, navState) {
                  if(index === 1) {
                    return (
                      <TouchableHighlight underlayColor='#707070' onPress={() => navigator.push(routes[index + 1])}>
                        <Text style={styles.nextButton}>Profile</Text>
                      </TouchableHighlight>
                    )
                  }
                  else { return null }
                },
                Title(route, navigator, index, navState) {
                }
              }
            }
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  navTitle: {
    fontSize: 16,
    padding: 10,
    marginTop: 4,
  },
  nav: {
    height: 60,
  },
  nextButton: {
    color: '#3d5875',
    fontFamily: 'Helvetica',
    margin: 15,
  },
  prevButton: {
    color: '#3d5875',
    fontFamily: 'Helvetica',
    margin: 15,
  }
});
