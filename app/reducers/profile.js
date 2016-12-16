import * as types from '../actions/actionTypes';

const initialState = {};

const profile = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case 'GET_PROFILE':
      return data;
  }
  return state;
};

export default profile;
