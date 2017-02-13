/**
 * Created by Duncan on 7/17/2016.
 */
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/appActions'
import AuthService from '../utils/AuthService'
import AddPageWrapper from './AddPageWrapper'


const AddPage = (props) => {
  return (
    <AddPageWrapper appData={props.appData} actions={props.actions} auth={props.auth} />
  );
};

AddPage.propTypes = {
  appData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  auth: PropTypes.instanceOf(AuthService)
};

function mapStateToProps(state) {
  return {
    appData: state.appData
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPage);
