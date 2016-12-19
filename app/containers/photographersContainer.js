'use strict';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/photographersActions';

const mapStateToProps = (state) => {
  let photographersArray = [];
  let u = {};
  // let l = this.length;
  for(var i = 0; i < photographersArray.length; ++i) {
     if(u.hasOwnProperty(this[i])) {
        continue;
     }
     photographersArray.push(this[i]);
     u[this[i]] = 1;
  }
  state.photographers.map((i) => photographersArray.push(i));
  console.log(photographersArray);
  return { photographers: photographersArray };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPhotographers: (photographers) => {
       dispatch(actionCreators.getPhotographers(photographers));
     }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
