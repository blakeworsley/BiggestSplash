'use strict';
import * as types from '../actions/actionTypes';
import { List } from 'immutable';

const initialState = List([]);

const photographers = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case 'GET_PHOTOGRAPHERS':
      const photographers = List.of(...data);
      return photographers;
  }
  return state;
};

export default photographers;
