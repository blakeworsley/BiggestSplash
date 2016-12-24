'use strict';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/photographersActions';

const mapStateToProps = (state) => {

let photosArray = [];
let names = [];
let photographers = state.photographers.toJS();
photographers.map((picture) => {
  photosArray.push(picture);
  names.push(picture.user.name);
});

let uniqueNames = [ ];
let uniquePhotos = [ ];

for (let i = 0; i < photosArray.length; i++) {
  if (!uniqueNames.includes(photosArray[i].user.name)) {
    uniqueNames.push(photosArray[i].user.name);
    uniquePhotos.push(photosArray[i]);
  }
}

const sortedPhotos = uniquePhotos.sort((a,b) => b.user.total_likes - a.user.total_likes);
return { photographers: sortedPhotos };

};

const mapDispatchToProps = (dispatch) => {
  return {
    getPhotographers: (photographers) => {
       dispatch(actionCreators.getPhotographers(photographers));
     }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
