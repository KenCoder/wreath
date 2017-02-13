/**
 * Created by Duncan on 7/20/2016.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/appActions';
import CustomerViewTable from '../components/CustomerViewTable'

export const CustomerViewPage = (props) => {
  return (
    <div>
      <CustomerViewTable appData={props.appData} changeStaticCustomerData={props.actions.changeStaticCustomerData} addNewStaticCustomer={props.actions.addNewStaticCustomer} addNewStaticCustomerLead={props.actions.addNewStaticCustomerLead} deleteCustomer={props.actions.deleteCustomer}/>
    </div>
  )
}

CustomerViewPage.propTypes = {
  appData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
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
)(CustomerViewPage)
