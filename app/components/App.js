import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import Login from './Login';
import Search from './Search';

const routes = [
  { component: Login, title: 'Login to view photographers' },
  { component: Search, title: 'Search for most popular photo' },
  // { component: Profile, title: 'Profile' }
];

export default class App extends Component {
  constructor(props) {
    super(props);
  }

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
        />
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  navTitle: {
    marginTop:4,
    fontSize:16,
  },
  nav: {
    height: 50,
    backgroundColor: '#1E77E2',
  }
});
