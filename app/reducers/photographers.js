'use strict';
import * as types from '../actions/actionTypes';

const initialState = [];

const photographers = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case 'GET_PHOTOGRAPHERS':
      return data;
  }
  return state;
};

export default photographers;
