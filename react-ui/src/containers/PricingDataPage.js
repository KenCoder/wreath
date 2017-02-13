import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/appActions';
import PricingDataTable from '../components/PricingDataTable';

export const ScoutViewPage = (props) => {
  return (
    <div>
      <PricingDataTable
        appData={props.appData}
        changeExistingCost={props.actions.changeProductCost}
        remove={props.actions.removeProduct}
        changeNewName={props.actions.changeNewProductName}
        changeNewCost={props.actions.changeNewProductCost}
        pushNewProduct={props.actions.pushNewProduct}
      />
    </div>
  );
};

ScoutViewPage.propTypes = {
  actions: PropTypes.object.isRequired,
  appData: PropTypes.object.isRequired
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
)(ScoutViewPage);
