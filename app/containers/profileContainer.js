'use strict';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/profileActions';

const mapStateToProps = (state) => {
  return { user: state.profile };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (user) => {
       dispatch(actionCreators.getProfile(user));
     }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
