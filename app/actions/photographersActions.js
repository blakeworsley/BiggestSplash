import { types } from './actionTypes';

export const actionCreators = {
  getPhotographers: (data) => {
    return {type: types.GET_PHOTOGRAPHERS, data: data}
  }
}
