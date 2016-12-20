'use strict';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/photographersActions';

const mapStateToProps = (state) => {
  let photographersArray = [];
  let names = [];
  state.photographers.map((i) => {
    photographersArray.push(i)
    names.push(i.user.name)
  });
  // let uniquePhotographers = [...(new Set(photographersArray))]

  // let uniques = []
  // for (let i = 0; i < photographersArray.length; i++) {
  //   if (names.includes(photographersArray[i].user.name)) {
  //     uniques.push(photographersArray[i])
  //     debugger;
  //     names = [...(new Set(names))]
  //     debugger;      
  //   }
  // }
  // console.log(uniques);

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
