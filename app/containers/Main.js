import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import photographers from '../reducers/photographers';
import profile from '../reducers/profile';
import App from '../components/App';

let combinedReducers = combineReducers({ photographers, profile });

const store = createStore(combinedReducers);

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
