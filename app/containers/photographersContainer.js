'use strict';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/photographersActions';

const mapStateToProps = (state) => {
  let photographersArray = [];
  state.photographers.map((i) => photographersArray.push(i));
  // let uniquePhotographers = [...(new Set(photographersArray))]

              // let unique = []
              // for (let i = 0; i < photographersArray.length; i++) {
              //   if (!this.uniques.includes(photographersArray[i].user.name)) {
              //   this.uniques.push(photographersArray[i])
              //   }
              // }

  // let arr = [];

  // for (let i = 0; i < photographersArray.length; i++) {
  //   if (arr.includes(photographersArray[i].user.username)) arr.push(photographersArray[i])
  // }
  // let arr = []
  // for(let i=0; i < photographersArray.length; i++){
  //   if (photographersArray[i] === photographersArray[0]){
  //     arr.push(photographers[i])
  //   }
  //   for(let j=0; j < photographersArray.length; j++){
  //     if(arr[j].user.username !== photographersArray[i].user.username){
        
  //     }
  //   }
  // }

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
