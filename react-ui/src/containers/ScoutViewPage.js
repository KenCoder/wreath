import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/appActions';
import ScoutViewForm from '../components/ScoutViewForm';
import LeadsList from '../components/LeadsList'

export const ScoutViewPage = (props) => {
  return (
    <div>
      <ScoutViewForm
        changeUsername={props.actions.changeUsername}
        changeYear={props.actions.changeYear}
        appData={props.appData}
      />
      <br/><br/>
      <LeadsList appData={props.appData} />
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
