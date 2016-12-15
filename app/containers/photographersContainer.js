import { connect } from 'react-redux';
import { actionCreators } from '../actions/photographersActions';

const mapStateToProps = (state) => {
  return { photographers: state.photographers }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPhotographers: (photographers) => {
       dispatch(actionCreators.getPhotographers(photographers));
     }
  }
}

export default connect(mapStateToProps, mapDispatchToProps);