import * as types from '../actions/actionTypes';
import { Map } from 'immutable';

const initialState = Map({});

const profile = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case 'GET_PROFILE':
      return Map(data);
  }
  return state;
};

export default profile;
