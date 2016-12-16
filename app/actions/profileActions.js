'use strict';
import { types } from './actionTypes';

export const actionCreators = {
  getProfile: (data) => {
    return {type: types.GET_PROFILE, data: data};
  }
};
