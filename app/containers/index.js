import React, { Component } from 'react';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
import App from '../components/App';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers/photographers'

const store = createStore(reducers);


// const store = createStore();

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
